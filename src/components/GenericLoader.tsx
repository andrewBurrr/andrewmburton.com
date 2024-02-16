import React, {useEffect, useState} from "react";
import {Backdrop, Fade, useTheme} from "@mui/material";
import {useCycle} from "framer-motion";

const GenericLoader = () => {
    const theme = useTheme();
    const [status, toggleStatus] = useCycle(true, false);

    useEffect(() => {
        console.log(status);
        if (status) {
            setTimeout(() => {
                toggleStatus();
            }, 3000);
            console.log("yay");
        }
    }, []);


    return (
        <Fade in={ status } appear={false} timeout={{ exit: 1500 }} easing={{ exit: "ease-out" }}>
            <Backdrop
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    color: theme.palette.secondary.main, // Text color for CircularProgress
                    backgroundColor: theme.palette.background.default, // Background color matching the app theme
                }}
                open={status}
            >
                <h1>Loading</h1>
            </Backdrop>
        </Fade>
    );
}

export { GenericLoader };