import React from 'react';

import { Routes } from "navigation/Routes";
import { AuthProvider } from "contexts/AuthContext";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./styles/AppTheme";
import {AnimatePresence} from "framer-motion";
import "./App.css";
import {NavProvider} from "./contexts/NavContext";
import {BlogProvider} from "./contexts/BlogContext";
import {ProjectsProvider} from "./contexts/ProjectsContext";

// Lets run a test
function App() {
    return (
        <AuthProvider>
            <BlogProvider>
                <ProjectsProvider>
                    <CssBaseline />
                    <ThemeProvider theme={theme}>
                        <NavProvider>
                            <AnimatePresence>
                                <Routes />
                            </AnimatePresence>
                        </NavProvider>
                    </ThemeProvider>
                </ProjectsProvider>
            </BlogProvider>
        </AuthProvider>
    );
}

export { App };
