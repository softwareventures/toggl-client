import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

export interface ProjectUser extends CreateProjectUserOptions {
    readonly id: number;
    readonly wid: number;
    readonly manager: boolean;
    readonly rate?: number;
    readonly at: string;
}

export interface CreateProjectUserOptions {
    readonly pid: number;
    readonly uid: number;
    readonly wid?: number;
    readonly manager?: boolean;
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
