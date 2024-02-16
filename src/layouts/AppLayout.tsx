import React, {FC, ReactNode, useState} from 'react';
import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import { theme } from 'styles/AppTheme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {TransitionWrapper} from "../components/TransitionWrapper";
import {NavProvider, useNav} from "../contexts/NavContext";
import {GenericLoader} from "../components/GenericLoader";

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    const { loading } = useAuth();
    const { isOpen } = useNav();

    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'visible';
    }

    if (loading) {
        return (<></>);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            <Header />
            {children}
            <Footer />
        </Box>
    );
}

export { AppLayout };