import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Tooltip,
    XAxis,
    YAxis,
    type TooltipProps,
} from "recharts";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import type { EstablishmentsAmountBy } from "@/services/establishments_amount_by";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentType } from "recharts/types/component/Tooltip";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

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

                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} tickMargin={10} axisLine={false} />

                <Tooltip content={CustomTooltip} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={4}>
                    <LabelList
                        dataKey="amount"
                        position="top"
                        formatter={(value: number) => value.toLocaleString()}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    );
}

const CustomTooltip: ContentType<ValueType, NameType> = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
        const { amount, schedules_amount } = payload[0].payload as {
            amount: number;
            schedules_amount: number;
        };

        return (
            <Card
                className="w-[200px] flex flex-col gap-4 p-4 bg-white shadow-lg border"
                style={{ pointerEvents: "none" }}
            >
                <CardHeader className="p-0">
                    <CardTitle className="text-xs font-semibold">Localidade</CardTitle>
                    <CardDescription>{label}</CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="text-sm font-medium">{amount.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Schedules amount</p>
                            <p className="text-sm font-medium">
                                {schedules_amount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return null;
};
