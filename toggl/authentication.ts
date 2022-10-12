import type {ApiClient} from "../api-client/api-client";
import {mapResponse} from "../index";
import type {Response} from "../api-client/request-response";
import {request} from "../api-client/request-response";
import type {User} from "./user";

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

export interface SignUpUserOptions {
    /** A valid email address for the User. */
    readonly email: string;
    /** The User's password, at least six characters. */
    readonly password: string;
    /** IANA TZ timezone specifying the User's timezone. */
    readonly timezone: string;
    /** The name of the app used to sign the user up. */
    readonly created_with: string;
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

export async function resetApiToken(
    client: AuthenticatedApiClient
): Promise<Response<AuthenticatedApiClient>> {
    return request(client, {method: "POST", path: "reset_token"})
        .then(response => response as Response<string>)
        .then(mapResponse(apiToken => ({...client, authorization: {apiToken}})));
}

export async function signUpNewUser(
    client: ApiClient,
    options: SignUpUserOptions
): Promise<Response<Authentication>> {
    return request(client, {method: "POST", path: "signups", body: options})
        .then(response => response as Response<User>)
        .then(
            mapResponse(user => ({
                client: {...client, authorization: {apiToken: user.api_token}},
                user
            }))
        );
}
