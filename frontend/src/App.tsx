import { useEffect, useState } from "react";
import { ChartContainer, type ChartConfig } from "./components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    getEstablishmentsAmountBy,
    type EstablishmentsAmountBy,
} from "./services/establishments_amount_by";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { RefreshCcw } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select";

const chartConfig = {
    amount: {
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

function App() {
    const [data, setData] = useState<EstablishmentsAmountBy>();

    const [limit, setLimit] = useState("");
    const [minSchedules, setMinSchedules] = useState("");
    const [column, setColumn] = useState("state");

    const chartData = data?.locations ?? [];

    function handleOnChangeLimit(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setLimit(value);
    }
    function handleOnChangeSchedules(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setMinSchedules(value);
    }

    async function fetchData() {
        try {
            let data = await getEstablishmentsAmountBy({
                column: column as "state" | "city",
                limit: Number(limit),
                min_schedules: Number(minSchedules),
            });
            setData(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col w-full h-full p-8 gap-8 max-w-[1440px] mx-auto">
            <div className="flex flex-1 border-b-2 px-8 pb-4 self-center items-center gap-4">
                <h1 className="font-bold text-2xl whitespace-nowrap">Establishments by</h1>
                <Select value={column} onValueChange={setColumn}>
                    <SelectTrigger className="min-w-[150px]">
                        <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="city">City</SelectItem>
                        <SelectItem value="state">State</SelectItem>
                    </SelectContent>
                </Select>

                <Input
                    type="number"
                    placeholder="Limit"
                    value={limit}
                    onKeyDown={(e) => e.key === "Enter" && fetchData()}
                    onChange={handleOnChangeLimit}
                    min={0}
                    max={27}
                    className="min-w-32"
                />
                <Input
                    type="number"
                    placeholder="min schedules"
                    value={minSchedules}
                    onKeyDown={(e) => e.key === "Enter" && fetchData()}
                    onChange={handleOnChangeSchedules}
                    min={0}
                    className="min-w-32"
                />
                <Button onClick={fetchData}>
                    <RefreshCcw />
                </Button>
                <p className="font-medium text-xl whitespace-nowrap">{`Total: ${data?.total}`}</p>
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
