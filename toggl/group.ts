import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

/** @file Groups
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/groups.md */

export interface Group extends CreateGroupOptions {
    /** Group ID. */
    readonly id: number;
    /** ISO 8601 date and time indicating when the Group was last updated. */
    readonly at: string;
}

export interface CreateGroupOptions {
    /** The name of the Group. */
    readonly name: string;
    /** ID of the Workspace to which the Group belongs. */
    readonly wid: number;
}

export async function createGroup(
    client: AuthenticatedApiClient,
    options: CreateGroupOptions
): Promise<Response<Group>> {
    return request(client, {
        method: "POST",
        path: "groups",
        body: {group: options}
    }).then(response => response as Response<Group>);
}
