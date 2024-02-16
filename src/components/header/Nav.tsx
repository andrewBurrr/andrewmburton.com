import React from "react";
import {Backdrop, Fade, useTheme} from "@mui/material";
import {MenuControl} from "./MenuControl";
import {useNav} from "../../contexts/NavContext";

const Nav = () => {
    const theme = useTheme();
    const { isOpen, links } = useNav();

    return (
        <Fade in={isOpen}>
            <Backdrop
                sx={{
                    zIndex: (theme) => theme.zIndex.appBar -1,
                    color: theme.palette.getContrastText(theme.palette.primary.main), // Text color for CircularProgress
                    backgroundColor: theme.palette.primary.main, // Background color matching the app theme
                }}
                open={isOpen}
            >
                <MenuControl links={links.filter((link) => link.icon)} />
            </Backdrop>
        </Fade>
    );
}

export { Nav };