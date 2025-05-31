import { BASE_URL } from "./api";

export type EstablishmentsAmountByParams = {
    column: "state" | "city";
    min_schedules?: number;
    limit?: number;
};

export type EstablishmentsAmountBy = {
    locations: Array<{ name: string; amount: number }>;
    total: number;
};

export async function getEstablishmentsAmountBy({
    column,
    min_schedules = 0,
    limit,
}: EstablishmentsAmountByParams): Promise<EstablishmentsAmountBy> {
    try {
        let response = await fetch(
            `${BASE_URL}/establishments/amount-by?column=${column}&min_schedules=${min_schedules}${
                limit ? `&limit=${limit}` : ""
            }`
        );

        let data: EstablishmentsAmountBy = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
