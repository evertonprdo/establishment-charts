import { EstablishmentsBy } from "@/pages/establishments-by";

export const Pages = {
    "Establishments By": <EstablishmentsBy />,
    "another-chart": <h1>another</h1>,
    "another-chart2": <h1>another</h1>,
} as const;

export type Paths = keyof typeof Pages;
