import { ChartWithSettingsLayout } from "@/layout/chart-with-settings";
import { Settings } from "./settings";
import { Chart } from "./chart";

export function EstablishmentsBy() {
    return (
        <ChartWithSettingsLayout title="Establishments by" optionsElem={<Settings />}>
            <Chart
                chartData={[
                    { amount: 200, name: "SC" },
                    { amount: 150, name: "SP" },
                    { amount: 137, name: "PR" },
                    { amount: 120, name: "BA" },
                ]}
            />
        </ChartWithSettingsLayout>
    );
}
