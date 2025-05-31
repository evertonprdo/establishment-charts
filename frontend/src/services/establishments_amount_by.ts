import { api } from "./api";

export const LocationColumns = {
    state: "State",
    city: "City",
    macro_region: "Macro Region",
    immediate_region: "Immediate Region",
    intermediate_region: "Intermediate Region",
} as const;

export type LocationColumnsKeys = keyof typeof LocationColumns;

export type EstablishmentsAmountByParams = {
    column: LocationColumnsKeys;
    min_schedules?: number;
    limit?: number;
};

export type EstablishmentsAmountBy = {
    locations: Array<{ name: string; amount: number; schedules_amount: number }>;
    total: number;
};

export async function getEstablishmentsAmountBy(
    params: EstablishmentsAmountByParams
): Promise<EstablishmentsAmountBy> {
    const response = await api.get<EstablishmentsAmountBy>("/establishments/amount-by", {
        params,
    });

    return response.data;
}
