import {resolve} from "url";
import {ApiClient} from "../index";
import {Authorization} from "./authentication";

/** @internal */
export interface Request<T> {
    readonly method: Method;
    readonly path: string;
    readonly body?: T;
}

/** @internal */
export type Method = "GET" | "POST" | "PUT";

export type Response<T> = SuccessResponse<T> | ErrorResponse | UnauthenticatedResponse;

export interface SuccessResponse<T> {
    readonly type: "SuccessResponse";
    readonly data: T;
}

export interface ErrorResponse {
    readonly type: "ErrorResponse";
    readonly code: number;
    readonly messages: ReadonlyArray<string>;
}

export interface UnauthenticatedResponse {
    readonly type: "UnauthenticatedResponse";
    readonly code: 403;
}

/** @internal */
export interface ApiClientWithAuthorization extends ApiClient {
    readonly authorization: Authorization;
}

/** @internal */
export function request(client: ApiClient | ApiClientWithAuthorization, request: Request<unknown>): Promise<Response<unknown>> {
    const body = request.method === "POST"
        ? JSON.stringify(request.body)
        : void 0;

    return client.fetch(resolve(client.mainEndpoint + "/", request.path), {
        method: request.method,
        headers: authorizationHeaders(client),
        body,
        mode: "cors",
        redirect: "follow"
    })
        .then((response): Promise<Response<unknown>> | Response<unknown> => {
            if (response.ok) {
                return response.json()
                    .then((json: any) => {
                        if ("data" in json) {
                            return {type: "SuccessResponse", data: json.data};
                        } else {
                            throw new Error("Invalid response");
                        }
                    });
            } else if (response.status === 403) {
                return {type: "UnauthenticatedResponse", code: 403};
            } else {
                return response.json()
                    .then((json: any) => {
                        if (Array.isArray(json)) {
                            return {
                                type: "ErrorResponse",
                                code: response.status,
                                messages: json
                            };
                        } else {
                            throw new Error("Invalid response");
                        }
                    });
            }
        });
}

/** @internal */
export function mapResponse<T, U>(f: (data: T) => U): (response: Response<T>) => Response<U> {
    return response => {
        if ("data" in response) {
            return {...response, data: f(response.data)};
        } else {
            return response;
        }
    }
}

function authorizationHeaders(client: ApiClient | ApiClientWithAuthorization): Record<string, string> {
    if ("authorization" in client) {
        const credentials = "apiToken" in client.authorization
            ? client.authorization.apiToken + ":api_token"
            : client.authorization.username + ":" + client.authorization.password;

        return {
            Authorization: "Basic " + btoa(credentials)
        };
    } else {
        return {};
    }
}