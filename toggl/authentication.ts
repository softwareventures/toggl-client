import {Client, mapResponse} from "../index";
import {request, Response} from "./request-response";
import {User} from "./user";

export type Authorization = UsernamePassword | ApiToken;

export interface UsernamePassword {
    readonly username: string;
    readonly password: string;
}

export interface ApiToken {
    readonly apiToken: string;
}

export interface Authentication {
    readonly client: AuthenticatedClient;
    readonly user: User;
}

export interface AuthenticatedClient extends Client {
    readonly authorization: ApiToken;
}

export function authenticate(client: Client, authorization: Authorization): Promise<Response<Authentication>> {
    return request({...client, authorization}, {method: "GET", path: "me"})
        .then(response => response as Response<User>)
        .then(mapResponse(user => ({
            client: {...client, authorization: {apiToken: user.api_token}},
            user
        })));
}