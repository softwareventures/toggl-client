import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

export interface ProjectUser extends CreateProjectUserOptions, UpdateProjectUserOptions {
    readonly wid: number;
    readonly manager: boolean;
    readonly at: string;
}

export interface CreateProjectUserOptions extends ProjectUserBase {
    readonly pid: number;
    readonly uid: number;
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