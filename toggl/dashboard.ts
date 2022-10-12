import type {Response} from "../api-client/request-response";
import {request} from "../api-client/request-response";
import type {AuthenticatedApiClient} from "./authentication";

export interface Dashboard {
    /** Information about the 20 most recent TimeEntries recorded in
     * the Workspace. */
    readonly activity: readonly DashboardActivity[];
    /** Information about the 5 most active users during the last 7
     * days. */
    readonly most_active_user: readonly DashboardActiveUser[];
}

/** Information about a TimeEntry recently recorded in the Workspace. */
export interface DashboardActivity {
    /** The ID of the User who recorded the TimeEntry. */
    readonly user_id: number;
    /** The ID of the Project associated with the TimeEntry, or 0 if
     * there is no associated Project. */
    readonly project_id: number;
    /** If the TimeEntry is stopped, a positive value specifying the
     * duration of the TimeEntry in seconds.
     *
     * If the TimeEntry is running, a negative value specifying the
     * start of the TimeEntry as the number of seconds since Jan 1,
     * 1970, negated. The correct duration can be calculated as
     * `current_time + duration`, where `current_time` is the current
     * time in seconds since Jan 1, 1970. */
    readonly duration: number;
    /** Description of work done during the TimeEntry. */
    readonly description?: string;
    /** The end time, as an ISO 8601 date and time, or undefined if the
     * TimeEntry is running. */
    readonly stop?: string;
    /** The ID of the Task associated with the TimeEntry. */
    readonly tid?: number;
}

/** Information a User's activity in the Workspace during the last 7 days. */
export interface DashboardActiveUser {
    /** The ID of the User. */
    readonly user_id: number;
    /** The sum of TimeEntry durations that the User has created during the last 7 days. */
    readonly duration: number;
}

/** Fetches Dashboard data for the specified Workspace ID. */
export async function fetchDashboard(
    client: AuthenticatedApiClient,
    workspaceId: number
): Promise<Response<Dashboard>> {
    return request(client, {
        method: "GET",
        path: `dashboard/${workspaceId}`
    }).then(response => response as Response<Dashboard>);
}
