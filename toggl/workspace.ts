import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";
import {User} from "./user";

/**
 * @file Workspaces
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md
 */

export enum RoundingType {
    Down = -1,
    Nearest = 0,
    Up = 1
}

export interface Workspace extends UpdateWorkspaceOptions {
    /** The name of the Workspace. */
    readonly name: string;
    /** True if this is a premium (paid) Workspace. */
    readonly premium: boolean;
    /** True if the current User has admin access to the Workspace. */
    readonly admin: boolean;
    /** Default currency for Workspace. */
    readonly default_currency: string;
    /** True if only admins can create Projects within this Workspace. */
    readonly only_admins_may_create_projects: boolean;
    /** True if only admins can see billable rates within this Workspace. */
    readonly only_admins_see_billable_rates: boolean;
    /** Type of rounding. */
    readonly rounding: RoundingType;
    /** ISO 8601 date and time indicating when the Workspace was last updated. */
    readonly at: string;
    /** URL of the logo of this Workspace. */
    readonly logo_url?: string;
}

export interface UpdateWorkspaceOptions {
    /** The Workspace ID. */
    readonly id: number;
    /** The name of the Workspace. */
    readonly name?: string;
    /** Default hourly rate for the Workspace.
     *
     * Hidden for non-admins if `only_admins_see_billable_rates` is true. */
    readonly default_hourly_rate?: number;
    /** Default currency for Workspace. */
    readonly default_currency?: string;
    /** True if only admins can create Projects within this Workspace. */
    readonly only_admins_may_create_projects?: boolean;
    /** True if only admins can see billable rates within this Workspace. */
    readonly only_admins_see_billable_rates?: boolean;
    /** Type of rounding. */
    readonly rounding?: RoundingType;
    /** Number of minutes to round to. */
    readonly rounding_minutes?: number;
}

export async function getWorkspaces(
    client: AuthenticatedApiClient
): Promise<Response<Workspace[]>> {
    return request(client, {
        method: "GET",
        path: "workspaces"
    }).then(response => response as Response<Workspace[]>);
}

export async function getWorkspace(
    client: AuthenticatedApiClient,
    id: number
): Promise<Response<Workspace>> {
    return request(client, {
        method: "GET",
        path: `workspaces/${id}`
    }).then(response => response as Response<Workspace>);
}

export async function updateWorkspace(
    client: AuthenticatedApiClient,
    options: UpdateWorkspaceOptions
): Promise<Response<Workspace>> {
    return request(client, {
        method: "PUT",
        path: `workspaces/${options.id}`,
        body: {
            workspace: {
                name: options.name,
                default_hourly_rate: options.default_hourly_rate,
                default_currency: options.default_currency,
                only_admins_may_create_projects: options.only_admins_may_create_projects,
                only_admins_see_billable_rates: options.only_admins_see_billable_rates,
                rounding: options.rounding,
                rounding_minutes: options.rounding_minutes
            }
        }
    }).then(response => response as Response<Workspace>);
}

export async function getWorkspaceUsers(
    client: AuthenticatedApiClient,
    workspaceId: number
): Promise<Response<User[]>> {
    return request(client, {
        method: "GET",
        path: `workspaces/${workspaceId}/users`
    }).then(response => response as Response<User[]>);
}