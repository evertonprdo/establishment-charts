import { api } from "./api";

export type EstablishmentsSummary = {
    establishments: number;
    total_schedules: number;
    max_schedule: number;
    schedules_avg: number;
};

export async function getEstablishmentsSummary(): Promise<EstablishmentsSummary> {
    const response = await api.get<EstablishmentsSummary>("/establishments/summary");
    return response.data;
}
