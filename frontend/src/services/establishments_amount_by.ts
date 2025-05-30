import { BASE_URL } from "./api";

export type EstablishmentsAmountByParams = {
    column: "state" | "city";
    min_schedules?: number;
};

export type EstablishmentsAmountBy = {
    locations: Array<{ name: string; amount: number }>;
    total: number;
};

export async function getEstablishmentsAmountBy({
    column,
    min_schedules = 0,
}: EstablishmentsAmountByParams): Promise<EstablishmentsAmountBy> {
    try {
        let response = await fetch(
            `${BASE_URL}/establishments/amount-by?field=${column}&min_schedules=${min_schedules}`
        );

        let data: EstablishmentsAmountBy = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
