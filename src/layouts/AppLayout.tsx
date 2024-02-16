import React, {FC, ReactNode} from 'react';
import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import Box from "@mui/material/Box";
import {useAuth} from "../contexts/AuthContext";
import {useNav} from "../contexts/NavContext";

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