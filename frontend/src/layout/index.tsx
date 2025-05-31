import { NavigationMenu } from "@/navigation/menu";

export function Layout({ children }: React.PropsWithChildren) {
    return (
        <div className="h-[100vh] w-[100vw]">
            <div className="flex h-full">
                <div className="shrink border-r border-border p-2 shadow">
                    <NavigationMenu />
                </div>

                <div className="flex-1 overflow-auto">{children}</div>
            </div>
        </div>
    );
}
