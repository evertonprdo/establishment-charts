import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import type { EstablishmentsAmountBy } from "@/services/establishments_amount_by";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type Props = {
    chartData: EstablishmentsAmountBy["locations"];
};

const chartConfig = {
    amount: {
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

export function Chart({ chartData }: Props) {
    return (
        <ChartContainer config={chartConfig} className="w-full min-h-[260px] max-h-[864px]">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} tickMargin={10} axisLine={false} />
            </BarChart>
        </ChartContainer>
    );
}
