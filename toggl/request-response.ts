import {resolve} from "url";
import {Client} from "../index";

export interface Request<T> {
    readonly method: Method;
    readonly path: string;
    readonly body?: T;
}

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

type Method = "GET" | "POST";

export function request(client: Client, request: Request<unknown>): Promise<Response<unknown>> {
    const body = request.method === "POST"
        ? JSON.stringify(request.body)
        : void 0;

    return client.fetch(resolve(client.mainEndpoint + "/", request.path), {
        method: request.method,
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