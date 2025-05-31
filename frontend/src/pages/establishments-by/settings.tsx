import { FilterX, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LocationColumns } from "@/services/establishments_amount_by";
import type { EstablishmentsSummary } from "@/services/establishments_summary";

export type Settings = {
    column: string;
    limit: string;
    minSchedules: string;
};

export type Summary = {
    total: number;
} & EstablishmentsSummary;

type Props = {
    settings: Settings;
    summary: Summary;
    onReset(): void;
    onRefresh(): void;
    onSettingChange(settings: Settings): void;
};

export function Settings({ settings, onReset, onRefresh, onSettingChange, summary }: Props) {
    const { column, limit, minSchedules } = settings;

    function handleOnFieldChange(field: keyof Settings, value: string) {
        if (settings[field] === value) {
            return;
        }

        onSettingChange({
            ...settings,
            [field]: value,
        });
    }

    function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            onRefresh();
        }
    }

    return (
        <>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your statistics preferences</CardDescription>

                <CardAction className="flex gap-2">
                    <Button variant="secondary" onClick={onReset}>
                        <FilterX />
                    </Button>
                    <Button onClick={onRefresh}>
                        <Send />
                    </Button>
                </CardAction>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label>Column</Label>
                        <Select
                            value={column}
                            onValueChange={(val) => handleOnFieldChange("column", val)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {Object.entries(LocationColumns).map(([value, title]) => (
                                    <SelectItem key={value} value={value}>
                                        {title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label>Column limit</Label>
                        <Input
                            type="number"
                            value={limit}
                            onKeyDown={handleOnKeyDown}
                            onChange={(e) => handleOnFieldChange("limit", e.target.value)}
                            min={0}
                            className="min-w-32"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Min Schedules</Label>
                        <Input
                            type="number"
                            value={minSchedules}
                            onKeyDown={handleOnKeyDown}
                            onChange={(e) => handleOnFieldChange("minSchedules", e.target.value)}
                            min={0}
                            className="min-w-32"
                        />
                    </div>
                </div>
            </CardContent>

            <div className="px-4">
                <Separator />
            </div>

            <CardFooter className="flex-col gap-2 items-stretch">
                <div className="grid gap-2 mb-2">
                    <CardTitle>Summary</CardTitle>
                    <CardDescription>Relevant statistics based on the chart</CardDescription>
                </div>

                <Summary {...summary} />
            </CardFooter>
        </>
    );
}

function Summary({ establishments, max_schedule, schedules_avg, total_schedules, total }: Summary) {
    type ChildrenWithClassName = {
        children?: React.ReactNode;
        className?: string;
    };

    const Title = ({ children, className }: ChildrenWithClassName) => (
        <span className={cn("font-medium", className)}>{children}:</span>
    );

    const Field = ({ children, className }: ChildrenWithClassName) => (
        <span className={cn("flex-1 text-end text-secondary-foreground", className)}>
            {children}
        </span>
    );

    const Wrapper = ({ children, className }: ChildrenWithClassName) => (
        <div className={cn("flex w-full items-baseline gap-2 text-sm", className)}>{children}</div>
    );

    function fmtNumber(val: number): string {
        return val.toLocaleString("default", { maximumFractionDigits: 2 });
    }

    return (
        <div className="flex flex-col gap-2">
            <Wrapper>
                <Title>Total establishments</Title>
                <Field>{fmtNumber(establishments)}</Field>
            </Wrapper>

            <Wrapper>
                <Title>Queried establishments</Title>
                <Field>{fmtNumber(total)}</Field>
            </Wrapper>

            <Wrapper>
                <Title>Total schedules</Title>
                <Field>{fmtNumber(total_schedules)}</Field>
            </Wrapper>

            <Wrapper>
                <Title>Maximum schedule amount</Title>
                <Field>{fmtNumber(max_schedule)}</Field>
            </Wrapper>

            <Wrapper>
                <Title>Schedules amount average</Title>
                <Field>{fmtNumber(schedules_avg)}</Field>
            </Wrapper>
        </div>
    );
}
