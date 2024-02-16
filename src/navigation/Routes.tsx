import { useRoutes, useLocation, Outlet} from "react-router-dom";
import {NoPage} from "views/NoPage";
import React, {ReactNode} from "react";
import {CustomRoute} from "types/config";
import {Home} from "views/home/Home";
import {Projects} from "views/projects/Projects";
import {
    Home as HomeIcon,
    Login as LoginIcon,
    PrecisionManufacturing,
    Abc, Info
} from "@mui/icons-material";
import {PrivateRoute} from "./PrivateRoute";
import {PublicRoute} from "./PublicRoute";
import {ProjectForm} from "../views/ProjectForm";
import {Login} from "../views/Login";
import {TransitionWrapper} from "../components/TransitionWrapper";
import {Blog} from "../views/blog/Blog";
import {PostForm} from "../views/PostForm";
import {About} from "../views/about/About";
import {AppLayout} from "../layouts/AppLayout";
import { ProjectDetails } from "views/projects/ProjectDetails";
import { PostDetails } from "views/blog/PostDetails";

const createRoute = (title: string, path: string, element: ReactNode, icon?: ReactNode): CustomRoute => ({
    title,
    path,
    element,
    icon,
});

const publicRoutes = [
    createRoute("Login", "/login", <Login />, <LoginIcon />),
];
const privateRoutes = [
    createRoute("Create Project", "/create-project", <ProjectForm />),
    createRoute("Create Post", "/create-post", <PostForm />),
];
const globalRoutes = [
    createRoute("Home", "/", <Home />, <HomeIcon />),
    createRoute("Blog", "/blog", <Blog />, <HomeIcon />),
    createRoute("Projects", "/projects", <Projects />, <PrecisionManufacturing />),
    // createRoute("About", "/about", <About />, <Info />)
];

const dynamicRoutes = [
    createRoute("Post Details", "/blog/:postId", <PostDetails />),
    createRoute("Project Details", "/projects/:projectId", <ProjectDetails />),
];

const Routes = () => {
    const location = useLocation();
    const routes = useRoutes([
        {
            element: <Outlet />,
            errorElement:
                <AppLayout>
                    <TransitionWrapper>
                        <NoPage />
                    </TransitionWrapper>
                </AppLayout>,
            children: [
                {
                    element:
                    <AppLayout>
                        <TransitionWrapper>
                            <Outlet />
                        </TransitionWrapper>
                    </AppLayout>,
                    children: [
                        ...dynamicRoutes,
                    ]
                },
                {
                    element:
                        <AppLayout>
                            <TransitionWrapper>
                                <Outlet />
                            </TransitionWrapper>
                        </AppLayout>,
                    children: [
                        ...globalRoutes,
                    ]
                },
                {
                    element:
                        <AppLayout>
                            <TransitionWrapper>
                                <PrivateRoute />
                            </TransitionWrapper>
                        </AppLayout>,
                    children: [
                        ...privateRoutes,
                    ]
                },
                {
                    element:
                        <AppLayout>
                            <TransitionWrapper>
                                <PublicRoute />
                            </TransitionWrapper>
                        </AppLayout>,
                    children: [
                        ...publicRoutes,
                    ]
                }
            ]
        },
    ]);

    if (!routes) return null;

    return (
        <>
            {React.cloneElement(routes, { key: location.pathname })}
        </>
    );
}

export { Routes, publicRoutes, privateRoutes, globalRoutes };