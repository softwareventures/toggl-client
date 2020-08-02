import {resolve} from "url";

/**
 * @file Common Toggl API Client components
 * @see https://github.com/toggl/toggl_api_docs/blob/master/toggl_api.md
 */

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
