import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import type { EstablishmentsAmountBy } from "@/services/establishments_amount_by";

type Props = {
    chartData: EstablishmentsAmountBy["locations"];
    chartConfig: ChartConfig;
    className?: string;
};

export function Chart({ chartData, chartConfig, className }: Props) {
    return (
        <ChartContainer
            config={chartConfig}
            className={cn("w-full min-h-[260px] max-h-[864px]", className)}
        >
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} tickMargin={10} axisLine={false} />
            </BarChart>
        </ChartContainer>
    );
}
