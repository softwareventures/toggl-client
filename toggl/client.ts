import {request, Response} from "../api-client/request-response";
import {AuthenticatedApiClient} from "./authentication";

/**
 * @file Clients
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md
 */

export interface Client extends CreateClientOptions, UpdateClientOptions {
    /** Timestamp indicating when the client was last updated. */
    readonly at: string;
}

export interface CreateClientOptions extends ClientBase {
    /** The Workspace ID of the Workspace that contains the Client. */
    readonly wid: number;
}

export interface UpdateClientOptions extends ClientBase {
    readonly id: number;
}

export interface ClientBase {
    /** The name of the Client. Must be unique in Workspace. */
    readonly name: string;
    /** Notes for the client. */
    readonly notes?: string;
}

export async function createClient(
    apiClient: AuthenticatedApiClient,
    client: CreateClientOptions
): Promise<Response<Client>> {
    return request(apiClient, {method: "POST", path: "clients", body: {client}}).then(
        response => response as Response<Client>
    );
}

export async function fetchClient(
    apiClient: AuthenticatedApiClient,
    clientId: number
): Promise<Response<Client>> {
    return request(apiClient, {method: "GET", path: `clients/${clientId}`}).then(
        response => response as Response<Client>
    );
}

export async function updateClient(
    apiClient: AuthenticatedApiClient,
    client: UpdateClientOptions
): Promise<Response<Client>> {
    return request(apiClient, {
        method: "PUT",
        path: `clients/${client.id}`,
        body: {client}
    }).then(response => response as Response<Client>);
}

export async function deleteClient(
    apiClient: AuthenticatedApiClient,
    clientId: number
): Promise<Response<object>> {
    return request(apiClient, {method: "DELETE", path: `clients/${clientId}`}).then(
        response => response as Response<object>
    );
}

export async function fetchClients(
    apiClient: AuthenticatedApiClient
): Promise<Response<readonly Client[]>> {
    return request(apiClient, {method: "GET", path: "clients"}).then(
        response => response as Response<readonly Client[]>
    );
}
