import { useEffect, useState } from "react";
import { ChartContainer, type ChartConfig } from "./components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    getEstablishmentsAmountBy,
    type EstablishmentsAmountBy,
} from "./services/establishments_amount_by";

const chartConfig = {
    amount: {
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

function App() {
    const [data, setData] = useState<EstablishmentsAmountBy>();
    const chartData = data?.locations ?? [];

    useEffect(() => {
        getEstablishmentsAmountBy({ column: "state" }).then(setData);
    }, []);

    return (
        <div className="flex flex-col w-full h-full p-8 gap-8 max-w-[1440px] mx-auto">
            <div className="flex flex-1 border-b-2 px-8 pb-2 self-center">
                <h1 className="font-bold text-2xl">Chart 1</h1>
            </div>
            <div className="flex">
                <div className="flex flex-1">
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-[630px]">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis tickLine={false} tickMargin={10} axisLine={false} />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}

export default App;
