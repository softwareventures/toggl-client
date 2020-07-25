import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

/**
 * @file Projects
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md
 */

export interface Project extends UpdateProjectOptions {
    /** False if the Project is archived. */
    readonly active: boolean;
    /** If true, the Project is only visible to Project users. */
    readonly is_private: boolean;
    /** Whether the Project is billable. */
    readonly billable: boolean;
    /** Timestamp indicating when the Project was last updated. */
    readonly at: string;
    /** ID of the color selected for the Project. */
    readonly color: string;
    /** Timestamp indicating when the Project was created. */
    readonly created_at: string;
}

export interface CreateProjectOptions extends ProjectBase {
    /** ID of the Project to use as a template. */
    readonly template_id?: number;
}

export interface UpdateProjectOptions extends ProjectBase {
    readonly id: number;
}

export interface ProjectBase {
    /** The name of the project. Unique for Client and Workspace. */
    readonly name: string;
    /** Workspace ID, where the Project will be saved. */
    readonly wid: number;
    /** Client ID. */
    readonly cid?: number;
    /** False if the Project is archived. */
    readonly active?: boolean;
    /** If true, the Project is only visible to Project users. */
    readonly is_private?: boolean;
    /** True if the Project can be used as a template. */
    readonly template?: boolean;
    /** Whether the Project is billable. */
    readonly billable?: boolean;
    /**
     * True if estimated hours are automatically calculated based on task estimations.
     * False if estimated hours are based on the value of estimated_hours.
     */
    readonly estimated_hours?: boolean;
    /** ID of the color selected for the Project. */
    readonly color?: string;
    /** Hourly rate of the Project. */
    readonly rate?: number;
}

export async function createProject(
    client: AuthenticatedApiClient,
    project: CreateProjectOptions
): Promise<Response<Project>> {
    return request(client, {method: "POST", path: "projects", body: {project}}).then(
        response => response as Response<Project>
    );
}

export async function getProject(
    client: AuthenticatedApiClient,
    projectId: number
): Promise<Response<Project>> {
    return request(client, {method: "GET", path: `projects/${projectId}`}).then(
        response => response as Response<Project>
    );
}

export async function updateProject(
    client: AuthenticatedApiClient,
    project: UpdateProjectOptions
): Promise<Response<Project>> {
    return request(client, {
        method: "PUT",
        path: `projects/${project.id}`,
        body: {project}
    }).then(response => response as Response<Project>);
}

export async function deleteProject(
    client: AuthenticatedApiClient,
    projectId: number
): Promise<Response<object>> {
    return request(client, {method: "DELETE", path: `projects/${projectId}`}).then(
        response => response as Response<object>
    );
}

export async function deleteProjects(
    client: AuthenticatedApiClient,
    projectIds: readonly number[]
): Promise<Response<object>> {
    return request(client, {method: "DELETE", path: "projects/" + projectIds.join(",")}).then(
        response => response as Response<object>
    );
}
