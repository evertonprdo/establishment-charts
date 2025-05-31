import { useEffect, useState } from "react";

import type { ChartConfig } from "@/components/ui/chart";
import { ChartWithSettingsLayout } from "@/layout/chart-with-settings";
import {
    type EstablishmentsAmountBy,
    getEstablishmentsAmountBy,
    LocationColumns,
    type LocationColumnsKeys,
} from "@/services/establishments_amount_by";
import {
    type EstablishmentsSummary,
    getEstablishmentsSummary,
} from "@/services/establishments_summary";

import { Chart } from "./chart";
import { Settings } from "./settings";

const chartConfig = {
    amount: {
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

const defaultSettings = {
    column: "state",
    limit: "10",
    minSchedules: "",
};
const defaultSummary: EstablishmentsSummary = {
    establishments: 0,
    max_schedule: 0,
    schedules_avg: 0,
    total_schedules: 0,
};

export function EstablishmentsBy() {
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const [summary, setSummary] = useState<EstablishmentsSummary>(defaultSummary);
    const [total, setTotal] = useState(0);

    const [data, setData] = useState<EstablishmentsAmountBy>();
    const chartData = data?.locations ?? [];

    function handleOnReset() {
        setSettings(defaultSettings);
        fetchData(defaultSettings);
    }

    function handleOnSettingsChange(set: Settings) {
        if (set.column !== settings.column) {
            fetchData(set);
        }

        setSettings(set);
    }

    async function fetchData({ column, limit, minSchedules }: Settings) {
        try {
            const data = await getEstablishmentsAmountBy({
                column: column as LocationColumnsKeys,
                limit: Number(limit),
                min_schedules: Number(minSchedules),
            });

            setData(data);
            setTotal(data.total);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchSummary() {
        try {
            const data = await getEstablishmentsSummary();
            setSummary(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData(settings);
        fetchSummary();
    }, []);

    return (
        <ChartWithSettingsLayout
            title={`Unique establishments by ${
                LocationColumns[settings.column as LocationColumnsKeys]
            }`}
            optionsElem={
                <Settings
                    settings={settings}
                    onReset={handleOnReset}
                    onRefresh={() => fetchData(settings)}
                    onSettingChange={handleOnSettingsChange}
                    summary={{ ...summary, total }}
                />
            }
        >
            <Chart chartConfig={chartConfig} chartData={chartData} />
        </ChartWithSettingsLayout>
    );
}
