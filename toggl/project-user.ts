import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

/**
 * @file Project Users
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/project_users.md
 */

export interface ProjectUser extends CreateProjectUserOptions, UpdateProjectUserOptions {
    /** ID of the Workspace that the project belongs to. */
    readonly wid: number;
    /** If true, the user has admin rights for this Project. */
    readonly manager: boolean;
    /** Timestamp indicating when the Project User was last updated. */
    readonly at: string;
}

export interface CreateProjectUserOptions extends CreateProjectUserBaseOptions {
    /** ID of the User who is a member of the Project. */
    readonly uid: number;
}

export interface CreateProjectUsersOptions extends CreateProjectUserBaseOptions {
    /** IDs of the Users who are members of the Project. */
    readonly uids: readonly number[];
}

export interface CreateProjectUserBaseOptions extends ProjectUserBase {
    /** ID of the Project this User is a member of. */
    readonly pid: number;
}

export interface UpdateProjectUserOptions extends ProjectUserBase {
    /** Project User ID. */
    readonly id: number;
}

export interface UpdateProjectUsersOptions extends ProjectUserBase {
    /** Project User IDs. */
    readonly ids: readonly number[];
}

export interface ProjectUserBase {
    /** If true, the user has admin rights for this Project. */
    readonly manager?: boolean;
    /** Hourly rate for the Project User, in the currency of the Project's
     * Client, or in the default currency of the Workspace. */
    readonly rate?: number;
}

export async function createProjectUser(
    client: AuthenticatedApiClient,
    user: CreateProjectUserOptions
): Promise<Response<ProjectUser>> {
    return request(client, {
        method: "POST",
        path: "project_users",
        body: {project_user: user}
    }).then(response => response as Response<ProjectUser>);
}

export async function fetchProjectUser(
    client: AuthenticatedApiClient,
    projectUserId: number
): Promise<Response<ProjectUser>> {
    return request(client, {
        method: "GET",
        path: `project_users/${projectUserId}`
    }).then(response => response as Response<ProjectUser>);
}

export async function updateProjectUser(
    client: AuthenticatedApiClient,
    user: UpdateProjectUserOptions
): Promise<Response<ProjectUser>> {
    return request(client, {
        method: "PUT",
        path: `project_users/${user.id}`,
        body: {project_user: user}
    }).then(response => response as Response<ProjectUser>);
}

export async function deleteProjectUser(
    client: AuthenticatedApiClient,
    projectUserId: number
): Promise<Response<object>> {
    return request(client, {
        method: "DELETE",
        path: `project_users/${projectUserId}`
    }).then(response => response as Response<object>);
}

export async function getProjectUsers(
    client: AuthenticatedApiClient,
    workspaceId: number
): Promise<Response<ProjectUser[]>> {
    return request(client, {
        method: "GET",
        path: `workspaces/${workspaceId}/project_users`
    }).then(response => response as Response<ProjectUser[]>);
}

export async function createProjectUsers(
    client: AuthenticatedApiClient,
    options: CreateProjectUsersOptions
): Promise<Response<ProjectUser[]>> {
    return request(client, {
        method: "POST",
        path: "project_users",
        body: {
            project_user: {
                uid: options.uids.join(","),
                pid: options.pid,
                manager: options.manager,
                rate: options.rate
            }
        }
    }).then(response => response as Response<ProjectUser[]>);
}

export async function updateProjectUsers(
    client: AuthenticatedApiClient,
    options: UpdateProjectUsersOptions
): Promise<Response<ProjectUser[]>> {
    return request(client, {
        method: "PUT",
        path: "project_users/" + options.ids.join(","),
        body: {project_user: {manager: options.manager, rate: options.rate}}
    }).then(response => response as Response<ProjectUser[]>);
}

export async function deleteProjectUsers(
    client: AuthenticatedApiClient,
    ids: readonly number[]
): Promise<Response<object>> {
    return request(client, {
        method: "DELETE",
        path: "project_users/" + ids.join(",")
    }).then(response => response as Response<object>);
}
