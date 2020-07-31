import {AuthenticatedApiClient} from "../index";
import {request, Response} from "./request-response";

/**
 * @file Users
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/users.md
 */

export interface User {
    readonly api_token: string;
    /** ID of default Workspace. */
    readonly default_wid: number;
    readonly email: string;
    readonly fullname: string;
    readonly jquery_timeofday_format: string;
    readonly jquery_date_format: string;
    readonly timeofday_format: string;
    readonly date_format: string;
    /** Whether start and stop time are saved on time entry. */
    readonly store_start_and_stop_time: boolean;
    /** The first day of the week for this User, 0-6, Sunday=0. */
    readonly beginning_of_week: number;
    /** A modified BCP 47 language code specifying the User's language.
     *
     * The language codes differ from those specified by BCP 47 because
     * hyphens (`-`) are replaced by underscores (`_`).
     *
     * For example, `en_US`. */
    readonly language: string;
    /** URL of the User's profile picture. */
    readonly image_url: string;
    /** Should a pie chart be shown on the sidebar. */
    readonly sidebar_piechart: boolean;
    /** When the User was last updated, as an ISO 8601 date and time. */
    readonly at: string;
    /** A recent Toggl blog post that Toggl will show to the User. */
    readonly new_blog_post?: {
        /** The title of the blog post. */
        readonly title: string;
        /** The URL of the blog post. */
        readonly url: string;
    };
    /** Toggl can send newsletters over e-mail to the User. */
    readonly send_product_emails: boolean;
    /** If User receives weekly report. */
    readonly send_weekly_report: boolean;
    /** E-mail User about long-running (more than 8 hours) tasks. */
    readonly send_timer_notifications: boolean;
    /** Google sign-in enabled. */
    readonly openid_enabled: boolean;
    /** IANA-TZ timezone User has set on the "My profile" page. */
    readonly timezone: string;
}

export interface UpdateUserOptions {
    readonly fullname?: string;
    readonly email?: string;
    /** Toggl can send newsletters over e-mail to the User. */
    readonly send_product_emails?: boolean;
    /** If User receives weekly report. */
    readonly send_weekly_report?: boolean;
    /** E-mail User about long-running (more than 8 hours) tasks. */
    readonly send_timer_notifications?: boolean;
    /** Whether start and stop time are saved on time entry. */
    readonly store_start_and_stop_time?: boolean;
    /** The first day of the week for this User, 0-6, Sunday=0. */
    readonly beginning_of_week?: number;
    /** IANA TZ timezone specifying the User's timezone. */
    readonly timezone?: string;
    readonly timeofday_format?: "H:mm" | "h:mm A";
    readonly date_format?:
        | "YYYY-MM-DD"
        | "DD.MM.YYYY"
        | "DD-MM-YYYY"
        | "MM/DD/YYYY"
        | "DD/MM/YYYY"
        | "MM-DD-YYYY";
    /** The User's current password. Must be set if `password` is also
     * set. */
    readonly current_password?: string;
    /** The User's new password. If this is set then `current_password`
     * must also be set. */
    readonly password?: string;
}

export async function fetchCurrentUser(client: AuthenticatedApiClient): Promise<Response<User>> {
    return request(client, {method: "GET", path: "me"}).then(
        response => response as Response<User>
    );
}

export async function updateCurrentUser(
    client: AuthenticatedApiClient,
    user: UpdateUserOptions
): Promise<Response<User>> {
    return request(client, {method: "PUT", path: "me", body: {user}}).then(
        response => response as Response<User>
    );
}
