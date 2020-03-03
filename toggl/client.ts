import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

export interface Client {
    readonly name: string;
    readonly workspaceId: number;
    readonly notes?: string;
    readonly at: string;
}

export interface ClientOptions {
    readonly name: string;
    readonly workspaceId: number;
    readonly notes?: string;
}

export function createClient(apiClient: AuthenticatedApiClient, client: ClientOptions): Promise<Response<Client>> {
    return request(apiClient, {method: "POST", path: "clients", body: client})
        .then(response => response as Response<Client>);
}