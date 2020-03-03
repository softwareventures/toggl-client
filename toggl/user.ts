import {AuthenticatedClient} from "../index";
import {request, Response} from "./request-response";

/**
 * @file Authentication and user data
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/authentication.md
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/users.md
 */

export interface User {
    readonly api_token: string;
    readonly default_wid: number;
    readonly email: string;
    readonly fullname: string;
    readonly jquery_timeofday_format: string;
    readonly jquery_date_format: string;
    readonly timeofday_format: string;
    readonly date_format: string;
    /** Whether start and stop time are saved on time entry. */
    readonly store_start_and_stop_time: boolean;
    readonly beginning_of_week: number;
    readonly language: string;
    readonly image_url: string;
    /** Should a pie chart be shown on the sidebar. */
    readonly sidebar_piechart: boolean;
    /** Unix timestamp of last changes (seconds since 1 January 1970). */
    readonly at: number;
    readonly new_blog_post?: {
        readonly title: string;
        readonly url: string;
    };
    /** Toggl can send newsletters over e-mail to the user. */
    readonly send_product_emails: boolean;
    /** If user receives weekly report. */
    readonly send_weekly_report: boolean;
    /** E-mail user about long-running (more than 8 hours) tasks. */
    readonly send_timer_notifications: boolean;
    /** Google sign-in enabled. */
    readonly openid_enabled: boolean;
    /** IANA-TZ timezone user has set on the "My profile" page. */
    readonly timezone: string;
}

export function getCurrentUser(client: AuthenticatedClient): Promise<Response<User>> {
    return request(client, {method: "GET", path: "me"})
        .then(response => response as Response<User>);
}