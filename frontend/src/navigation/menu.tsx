import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Pages, type Paths } from ".";
import { useNavigation } from "./context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function NavigationMenu() {
    const { navigate, current } = useNavigation();

    const MenubarTriggers = ({ className }: { className?: string }) => {
        return Object.keys(Pages).map((key) => (
            <SheetClose key={key} asChild>
                <Button
                    variant={key == current ? "outline" : "secondary"}
                    disabled={key === current}
                    className={cn(className)}
                    onClick={() => navigate(key as Paths)}
                >
                    {key}
                </Button>
            </SheetClose>
        ));
    };

    return (
        <Sheet>
            <SheetTrigger className="p-2">
                <Menu />
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Charts</SheetTitle>
                    <SheetDescription>
                        Click on the chart name to see the chart of your preference
                    </SheetDescription>
                </SheetHeader>

                <div className="px-4">
                    <Separator />
                </div>

                <div className="flex flex-col flex-1 p-4 gap-2">
                    <MenubarTriggers className="w-full" />
                </div>
            </SheetContent>
        </Sheet>
    );
}
