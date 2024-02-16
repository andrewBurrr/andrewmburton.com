import React, {createContext, FC, ReactNode, useContext, useState} from "react";
import {useCycle} from "framer-motion";
import {useAuth} from "./AuthContext";
import {globalRoutes, privateRoutes, publicRoutes} from "../navigation/Routes";
import {CustomRoute} from "../types/config";

interface NavContextProps {
    isOpen: boolean;
    toggleIsOpen: () => void;
    links: CustomRoute[];
}

const NavContext = createContext<NavContextProps>({
    isOpen: false,
    toggleIsOpen: () => {},
    links: [],
});

const useNav = () => {
    return useContext(NavContext);
}

interface NavProviderProps {
    children: ReactNode;
}

const NavProvider: FC<NavProviderProps> = ({ children }) => {
    const { user, loading } = useAuth();
    const [isOpen, toggleIsOpen] = useCycle(false, true);
    const links = loading ? [] : [
        ...globalRoutes,
        ...( user === null ? publicRoutes : privateRoutes),
    ];

    return (
        <NavContext.Provider value={{ isOpen, toggleIsOpen, links }}>
            {children}
        </NavContext.Provider>
    );
};

export { NavProvider, useNav };