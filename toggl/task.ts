import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

/**
 * @file Tasks
 *
 * Available only for paid workspaces.
 */

export interface Task extends CreateTaskOptions {
    /** Task ID. */
    readonly id: number;
    /** ID of the Workspace that this Task belongs to. */
    readonly wid: number;
    /** True if the Task is in progress, false if it is done. */
    readonly active: boolean;
    /** ISO 8601 date and time indicating when the Task was last updated. */
    readonly at: string;
    /** Total time tracked (in seconds) for the task. */
    readonly tracked_seconds: number;
}

export interface CreateTaskOptions {
    /** Name of the Task. Must be unique within the associated Project. */
    readonly name: string;
    /** ID of the Project that this Task belongs to. */
    readonly pid: number;
    /** ID of the Workspace that this Task belongs to. */
    readonly wid?: number;
    /** ID of the User this Task is assigned to. */
    readonly uid?: number;
    /** Estimated duration of the Task in seconds. */
    readonly estimated_seconds?: number;
    /** True if the Task is in progress, false if it is done.
     *
     * @default true */
    readonly active?: boolean;
}

export async function createTask(client: AuthenticatedApiClient, options: CreateTaskOptions): Promise<Response<Task>> {
    return request(client, {
        method: "POST",
        path: "tasks",
        body: {task: options}
    }).then(response => response as Response<Task>);
}

export async function getTask(client: AuthenticatedApiClient, taskId: number): Promise<Response<Task>> {
    return request(client, {
        method: "GET",
        path: `tasks/${taskId}`
    }).then(response => response as Response<Task>);
}