import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

/** @file Workspace Users
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspace_users.md */

export interface WorkspaceUser {
    /** WorkspaceUser ID. */
    readonly id: number;
    /** User ID. */
    readonly uid: number;
    /** True if the User is an administrator of the Workspace. */
    readonly admin: boolean;
    /** True if the User has accepted the invitation to join this
     * Workspace. */
    readonly active: boolean;
    /** The URL the User should visit to accept the invitation to join
     * this Workspace. */
    readonly invite_url?: string;
}

export interface InviteWorkspaceUsersOptions {
    /** The Workspace ID. */
    readonly workspaceId: number;
    /** Email addresses of users to invite to the Workspace. */
    readonly emails: readonly string[];
}

export interface UpdateWorkspaceUserOptions {
    /** WorkspaceUser ID. */
    readonly id: number;
    /** True if the User is an administrator of the Workspace. */
    readonly admin: boolean;
}

/** Invites Users to join a Workspace.
 *
 * Toggl sends an invitation email to each User's email address. */
export async function inviteWorkspaceUsers(
    client: AuthenticatedApiClient,
    options: InviteWorkspaceUsersOptions
): Promise<Response<WorkspaceUser[]>> {
    return request(client, {
        method: "POST",
        path: `workspaces/${options.workspaceId}/invite`,
        body: {emails: options.emails}
    }).then(response => response as Response<WorkspaceUser[]>);
}

export async function updateWorkspaceUser(
    client: AuthenticatedApiClient,
    options: UpdateWorkspaceUserOptions
): Promise<Response<WorkspaceUser>> {
    return request(client, {
        method: "PUT",
        path: `workspace_users/${options.id}`,
        body: {workspace_user: {admin: options.admin}}
    }).then(response => response as Response<WorkspaceUser>);
}

export async function deleteWorkspaceUser(
    client: AuthenticatedApiClient,
    workspaceUserId: number
): Promise<Response<object>> {
    return request(client, {
        method: "DELETE",
        path: `workspace_users/${workspaceUserId}`
    }).then(response => response as Response<object>);
}

export async function fetchWorkspaceUsers(
    client: AuthenticatedApiClient,
    workspaceId: number
): Promise<Response<WorkspaceUser[]>> {
    return request(client, {
        method: "GET",
        path: `workspaces/${workspaceId}/workspace_users`
    }).then(response => response as Response<WorkspaceUser[]>);
}
