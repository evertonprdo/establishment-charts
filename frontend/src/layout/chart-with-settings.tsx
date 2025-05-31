import { Card } from "@/components/ui/card";

type Props = {
    title: string;
    children: React.ReactNode;
    optionsElem: React.ReactNode;
};

export function ChartWithSettingsLayout({ children, optionsElem, title }: Props) {
    return (
        <div className="container-wrapper min-h-[100vh] flex items-center">
            <div className="flex flex-1 h-full max-h-[768px] p-4 gap-8 my-auto">
                <main className="flex flex-1 flex-col justify-center gap-8">
                    <h1 className="text-center text-3xl font-medium">{title}</h1>
                    {children}
                </main>

                <aside className="flex shrink w-[324px] 2xl:w-[512px]">
                    <Card className="w-full h-full">{optionsElem}</Card>
                </aside>
            </div>
        </div>
    );
}
