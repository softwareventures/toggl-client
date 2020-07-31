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
