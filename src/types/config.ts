import {ReactNode} from "react";

export interface CustomRoute {
    title: string;
    path: string;
    element: ReactNode;
    icon?: ReactNode;
    children?: CustomRoute[];
}
