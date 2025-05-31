import { createContext, useContext, useState } from "react";

import { Pages, type Paths } from ".";

export type NavigationContextProps = {
    current: Paths;
    navigate(path: Paths): void;
};
export const NavigationContext = createContext<NavigationContextProps | null>(null);

type Props = {
    outlet: (props: { children?: React.ReactNode }) => React.JSX.Element;
};
export function Navigation({ outlet: Outlet }: Props) {
    const [current, setCurrent] = useState<Paths>("Establishments By");

    function navigate(path: Paths) {
        setCurrent(path);
    }

    const Current = Pages[current];

    return (
        <NavigationContext.Provider value={{ current, navigate }}>
            <Outlet>{Current}</Outlet>
        </NavigationContext.Provider>
    );
}

export function useNavigation(): NavigationContextProps {
    const hook = useContext(NavigationContext);

    if (hook === null) {
        throw new Error();
    }

    return hook;
}
