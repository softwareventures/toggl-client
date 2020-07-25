import {ApiClient, mapResponse} from "../index";
import {request, Response} from "./request-response";
import {User} from "./user";

/**
 * @file Authentication
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/authentication.md
 */

export type Authorization = UsernamePassword | ApiToken;

export interface UsernamePassword {
    readonly username: string;
    readonly password: string;
}

export interface ApiToken {
    readonly apiToken: string;
}

export interface Authentication {
    readonly client: AuthenticatedApiClient;
    readonly user: User;
}

export interface AuthenticatedApiClient extends ApiClient {
    readonly authorization: ApiToken;
}

export async function authenticate(
    client: ApiClient,
    authorization: Authorization
): Promise<Response<Authentication>> {
    return request({...client, authorization}, {method: "GET", path: "me"})
        .then(response => response as Response<User>)
        .then(
            mapResponse(user => ({
                client: {...client, authorization: {apiToken: user.api_token}},
                user
            }))
        );
}
