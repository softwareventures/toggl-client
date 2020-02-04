import {resolve} from "url";

export interface Client {
    readonly mainEndpoint: string;
    readonly reportsEndpoint: string;
}

export interface ClientOptions {
    readonly endpoint?: string;
    readonly mainEndpoint?: string;
    readonly reportsEndpoint?: string;
}

export function createClient(options?: ClientOptions): Client {
    const endpoint = options?.endpoint || "https://toggl.com/";
    const mainEndpoint = resolve(endpoint, options?.mainEndpoint || "api/v8");
    const reportsEndpoint = resolve(endpoint, options?.reportsEndpoint || "reports/api/v2");

    return {mainEndpoint, reportsEndpoint};
}