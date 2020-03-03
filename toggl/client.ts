import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

export interface Client extends ClientOptions {
    /** Timestamp indicating when the client was last updated. */
    readonly at: string;
}

export interface ClientOptions {
    /** The name of the Client. Must be unique in Workspace. */
    readonly name: string;
    /** The Workspace ID of the Workspace that contains the Client. */
    readonly wid: number;
    /** Notes for the client. */
    readonly notes?: string;
}

export function createClient(apiClient: AuthenticatedApiClient, client: ClientOptions): Promise<Response<Client>> {
    return request(apiClient, {method: "POST", path: "clients", body: client})
        .then(response => response as Response<Client>);
}

export function getClient(apiClient: AuthenticatedApiClient, clientId: number): Promise<Response<Client>> {
    return request(apiClient, {method: "GET", path: "clients/" + clientId})
        .then(response => response as Response<Client>);
}