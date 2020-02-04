import {resolve} from "url";

export interface Client {
    readonly fetch: typeof fetch;
    readonly mainEndpoint: string;
    readonly reportsEndpoint: string;
}

export interface ClientOptions {
    readonly fetch: typeof fetch;
    readonly endpoint?: string;
    readonly mainEndpoint?: string;
    readonly reportsEndpoint?: string;
}

export function createClient(options: ClientOptions): Client {
    const fetch = options.fetch;
    const endpoint = options?.endpoint || "https://toggl.com/";
    const mainEndpoint = resolve(endpoint, options?.mainEndpoint || "api/v8");
    const reportsEndpoint = resolve(endpoint, options?.reportsEndpoint || "reports/api/v2");

    return {fetch, mainEndpoint, reportsEndpoint};
}