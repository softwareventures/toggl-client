import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

export interface TimeEntry extends UpdateTimeEntryOptions {
    /** ID of the Workspace that this TimeEntry belongs to. */
    readonly wid: number;
    /** True if this TimeEntry is billable. */
    readonly billable: boolean;
    /** If the TimeEntry is stopped, a positive value specifying the
     * duration of the TimeEntry in seconds.
     *
     * If the TimeEntry is running, a negative value specifying the
     * start of the TimeEntry as the number of seconds since Jan 1,
     * 1970, negated. The correct duration can be calculated as
     * `current_time + duration`, where `current_time` is the current
     * time in seconds since Jan 1, 1970. */
    readonly duration: number;
    /** A list of Tag names associated with this TimeEntry. */
    readonly tags: readonly string[];
    /** If true, Toggl will hide the start and stop time of this
     * TimeEntry. */
    readonly duronly: boolean;
    /** Timestamp indicating when the TimeEntry was last updated. */
    readonly at: string;
}

export interface UpdateTimeEntryOptions extends CreateTimeEntryOptions {
    /** Time Entry ID. */
    readonly id: number;
}

export interface CreateTimeEntryOptions extends StartTimeEntryOptions {
    /** The start time, as an ISO 8601 date and time. */
    readonly start: string;
    /** The end time, as an ISO 8601 date and time, or undefined if the
     * TimeEntry is running. */
    readonly stop?: string;
    /** If the TimeEntry is stopped, a positive value specifying the
     * duration of the TimeEntry in seconds. */
    readonly duration?: number;
}

export interface StartTimeEntryOptions {
    /** Description of work done during this TimeEntry. */
    readonly description: string;
    /** ID of the Workspace that this TimeEntry belongs to.
     * Required unless pid or tid are supplied. */
    readonly wid?: number;
    /** ID of the Project associated with this TimeEntry. */
    readonly pid?: number;
    /** ID of the Task associated with this TimeEntry. */
    readonly tid?: number;
    /** True if this TimeEntry is billable. */
    readonly billable?: boolean;
    /** The name of the client app that created this TimeEntry. */
    readonly created_with: string;
    /** A list of Tag names associated with this TimeEntry. */
    readonly tags?: readonly string[];
    /** If true, Toggl will hide the start and stop time of this
     * TimeEntry. */
    readonly duronly?: boolean;
}

export interface TimeEntriesTagsOptions {
    /** Time Entry IDs. */
    readonly ids: readonly number[];
    /** A list of Tag names. */
    readonly tags: readonly string[];
}

export async function createTimeEntry(
    client: AuthenticatedApiClient,
    timeEntry: CreateTimeEntryOptions
): Promise<Response<TimeEntry>> {
    return request(client, {
        method: "POST",
        path: "time_entries",
        body: {time_entry: timeEntry}
    }).then(response => response as Response<TimeEntry>);
}

export async function startTimeEntry(
    client: AuthenticatedApiClient,
    options: StartTimeEntryOptions
): Promise<Response<TimeEntry>> {
    return request(client, {
        method: "POST",
        path: "time_entries/start",
        body: {time_entry: options}
    }).then(response => response as Response<TimeEntry>);
}

export async function stopTimeEntry(
    client: AuthenticatedApiClient,
    id: number
): Promise<Response<TimeEntry>> {
    return request(client, {
        method: "PUT",
        path: `time_entries/${id}/stop`
    }).then(response => response as Response<TimeEntry>);
}

export async function getTimeEntry(
    client: AuthenticatedApiClient,
    id: number
): Promise<Response<TimeEntry>> {
    return request(client, {
        method: "GET",
        path: `time_entries/${id}`
    }).then(response => response as Response<TimeEntry>);
}

export async function getRunningTimeEntry(
    client: AuthenticatedApiClient
): Promise<Response<TimeEntry>> {
    return request(client, {
        method: "GET",
        path: "time_entries/current"
    }).then(response => response as Response<TimeEntry>);
}

export async function updateTimeEntry(
    client: AuthenticatedApiClient,
    options: UpdateTimeEntryOptions
): Promise<Response<TimeEntry>> {
    return request(client, {
        method: "PUT",
        path: `time_entries/${options.id}`,
        body: {
            time_entry: {
                description: options.description,
                wid: options.wid,
                pid: options.pid,
                tid: options.tid,
                billable: options.billable,
                start: options.start,
                stop: options.stop,
                duration: options.duration,
                created_with: options.created_with,
                tags: options.tags,
                duronly: options.duronly
            }
        }
    }).then(response => response as Response<TimeEntry>);
}

export async function deleteTimeEntry(
    client: AuthenticatedApiClient,
    id: number
): Promise<Response<object>> {
    return request(client, {
        method: "DELETE",
        path: `time_entries/${id}`
    }).then(response => response as Response<object>);
}

export async function getTimeEntriesInRange(
    client: AuthenticatedApiClient,
    start: string,
    end: string
): Promise<Response<TimeEntry[]>> {
    return request(client, {
        method: "GET",
        path: `time_entries?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(
            end
        )}`
    }).then(response => response as Response<TimeEntry[]>);
}

export async function replaceTagsOfTimeEntries(
    client: AuthenticatedApiClient,
    options: TimeEntriesTagsOptions
): Promise<Response<TimeEntry[]>> {
    return request(client, {
        method: "PUT",
        path: `time_entries/${options.ids.join(",")}`,
        body: {time_entry: {tags: options.tags}}
    }).then(response => response as Response<TimeEntry[]>);
}

export async function addTagsToTimeEntries(
    client: AuthenticatedApiClient,
    options: TimeEntriesTagsOptions
): Promise<Response<TimeEntry[]>> {
    return request(client, {
        method: "PUT",
        path: `time_entries/${options.ids.join(",")}`,
        body: {time_entry: {tag_action: "add", tags: options.tags}}
    }).then(response => response as Response<TimeEntry[]>);
}
