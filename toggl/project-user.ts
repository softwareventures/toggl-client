import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

export interface ProjectUser extends CreateProjectUserOptions, UpdateProjectUserOptions {
    readonly wid: number;
    readonly manager: boolean;
    readonly at: string;
}

export interface CreateProjectUserOptions extends CreateProjectUserBaseOptions {
    readonly uid: number;
}

export interface CreateProjectUsersOptions extends CreateProjectUserBaseOptions {
    readonly uids: readonly number[];
}

export interface CreateProjectUserBaseOptions extends ProjectUserBase {
    readonly pid: number;
    readonly wid?: number;
}

export interface UpdateProjectUserOptions extends ProjectUserBase {
    readonly id: number;
}

export interface ProjectUserBase {
    readonly manager?: boolean;
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

export async function getProjectUser(
    client: AuthenticatedApiClient,
    projectUserId: number
): Promise<Response<ProjectUser>> {
    return request(client, {
        method: "GET",
        path: "project_users/" + projectUserId.toString(10)
    }).then(response => response as Response<ProjectUser>);
}

export async function updateProjectUser(
    client: AuthenticatedApiClient,
    user: UpdateProjectUserOptions
): Promise<Response<ProjectUser>> {
    return request(client, {
        method: "PUT",
        path: "project_users/" + user.id.toString(10),
        body: {project_user: user}
    }).then(response => response as Response<ProjectUser>);
}

export async function deleteProjectUser(
    client: AuthenticatedApiClient,
    projectUserId: number
): Promise<Response<object>> {
    return request(client, {
        method: "DELETE",
        path: "project_users/" + projectUserId.toString(10)
    }).then(response => response as Response<object>);
}

export async function getProjectUsers(
    client: AuthenticatedApiClient,
    workspaceId: number
): Promise<Response<ProjectUser[]>> {
    return request(client, {
        method: "GET",
        path: "workspaces/" + workspaceId.toString(10) + "/project_users"
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
                wid: options.wid,
                manager: options.manager,
                rate: options.rate
            }
        }
    }).then(response => response as Response<ProjectUser[]>);
}
