export interface Report<T> {
    readonly total_grand: number;
    readonly total_billable: number;
    readonly total_currencies: readonly Money[];
    readonly data: readonly T[];
}

export interface Money {
    readonly currency: string;
    readonly amount: number;
}
