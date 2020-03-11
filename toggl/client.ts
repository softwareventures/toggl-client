import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

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

export function createClient(apiClient: AuthenticatedApiClient, client: CreateClientOptions): Promise<Response<Client>> {
    return request(apiClient, {method: "POST", path: "clients", body: {client}})
        .then(response => response as Response<Client>);
}

export function getClient(apiClient: AuthenticatedApiClient, clientId: number): Promise<Response<Client>> {
    return request(apiClient, {method: "GET", path: "clients/" + clientId})
        .then(response => response as Response<Client>);
}

export function updateClient(apiClient: AuthenticatedApiClient, client: UpdateClientOptions): Promise<Response<Client>> {
    return request(apiClient, {method: "PUT", path: "clients/" + client.id, body: {client}})
        .then(response => response as Response<Client>);
}

export function deleteClient(apiClient: AuthenticatedApiClient, clientId: number): Promise<Response<{}>> {
    return request(apiClient, {method: "DELETE", path: "clients/" + clientId})
        .then(response => response as Response<{}>);
}

export function getClients(apiClient: AuthenticatedApiClient): Promise<Response<ReadonlyArray<Client>>> {
    return request(apiClient, {method: "GET", path: "clients"})
        .then(response => response as Response<ReadonlyArray<Client>>);
}