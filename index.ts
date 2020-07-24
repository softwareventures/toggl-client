import {resolve} from "url";
export * from "./toggl/authentication";
export * from "./toggl/client";
export * from "./toggl/project";
export * from "./toggl/request-response";
export * from "./toggl/user";
export * from "./toggl/project-user";

export interface ApiClient {
    readonly fetch: typeof fetch;
    readonly mainEndpoint: string;
    readonly reportsEndpoint: string;
}

export interface ApiClientOptions {
    readonly fetch: typeof fetch;
    readonly endpoint?: string;
    readonly mainEndpoint?: string;
    readonly reportsEndpoint?: string;
}

export function createApiClient(options: ApiClientOptions): ApiClient {
    const fetch = options.fetch;
    const endpoint = options?.endpoint || "https://toggl.com/";
    const mainEndpoint = resolve(endpoint, options?.mainEndpoint || "api/v8");
    const reportsEndpoint = resolve(endpoint, options?.reportsEndpoint || "reports/api/v2");

    return {fetch, mainEndpoint, reportsEndpoint};
}
