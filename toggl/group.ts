import type {Response} from "../api-client/request-response";
import {request} from "../api-client/request-response";
import type {AuthenticatedApiClient} from "./authentication";

/** @file Groups
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/groups.md */

export interface Group extends CreateGroupOptions {
    /** Group ID. */
    readonly id: number;
    /** ISO 8601 date and time indicating when the Group was last updated. */
    readonly at: string;
}

export interface CreateGroupOptions extends GroupBase {
    /** ID of the Workspace to which the Group belongs. */
    readonly wid: number;
}

export interface UpdateGroupOptions extends GroupBase {
    /** Group ID. */
    readonly id: number;
}

export interface GroupBase {
    /** The name of the Group. */
    readonly name: string;
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

export async function updateGroup(
    client: AuthenticatedApiClient,
    options: UpdateGroupOptions
): Promise<Response<Group>> {
    return request(client, {
        method: "PUT",
        path: `groups/${options.id}`,
        body: {group: {name: options.name}}
    }).then(response => response as Response<Group>);
}

export async function deleteGroup(
    client: AuthenticatedApiClient,
    groupId: number
): Promise<Response<object>> {
    return request(client, {
        method: "DELETE",
        path: `groups/${groupId}`
    }).then(response => response as Response<Group>);
}
