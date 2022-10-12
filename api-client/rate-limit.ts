import type {Response} from "./request-response";

export interface RateLimiterOptions {
    readonly baseIntervalMs?: number;
    readonly maxIntervalMs?: number;
    readonly maxRetries?: number;
}

/** @internal */
export class RateLimiter {
    public readonly retryIntervalMs: number;
    public readonly maxIntervalMs: number;
    public readonly maxRetries: number;

    private readonly queue: Array<() => void> = [];
    private retryCount = 0;

    public constructor(options?: RateLimiterOptions) {
        this.retryIntervalMs = options?.baseIntervalMs ?? 1000;
        this.maxIntervalMs = options?.maxIntervalMs ?? 60000;
        this.maxRetries = options?.maxRetries ?? 10;
    }

    public async rateLimit<T>(action: () => Promise<Response<T>>): Promise<Response<T>> {
        return new Promise<Response<T>>((resolve, reject) => {
            const tryAction = (): void => {
                action().then(this.onResponse(resolve, tryAction), reject);
            };

            if (this.queue.length === 0) {
                tryAction();
            } else {
                this.queue.push(tryAction);
            }
        });
    }

    private readonly onInterval = (): void => {
        const action = this.queue.shift();
        if (action != null) {
            action();
        }
    };

    private onResponse<T>(
        resolve: (response: Response<T>) => void,
        retry: () => void
    ): (response: Response<T>) => void {
        return response => {
            if (
                response.type === "ErrorResponse" &&
                response.code === 429 &&
                this.retryCount < this.maxRetries
            ) {
                this.queue.unshift(retry);
                this.retryCount++;
            } else {
                resolve(response);
                this.retryCount = 0;
            }

            if (this.queue.length > 0) {
                setTimeout(this.onInterval, this.calculateIntervalMs());
            }
        };
    }

    private calculateIntervalMs(): number {
        return Math.min(this.retryIntervalMs << this.retryCount, this.maxIntervalMs);
    }
}
