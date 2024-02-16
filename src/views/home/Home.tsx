import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import { FeaturedProjects } from "views/home/FeaturedProjects";
import {WaveAnimation} from "./WaveAnimation";
import {Contact} from "./Contact";
import {RecentPosts} from "./RecentPosts";

const Home = () => {
    return (
        <Stack>
            <Box
                sx={{
                    height: "80vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Stack>
                    <Typography variant="h2" fontFamily="Aboreto">Andrew Burton</Typography>
                    <Typography variant="subtitle1" fontFamily="Aboreto">Computer Scientist</Typography>
                </Stack>
            </Box>
            <WaveAnimation nextSection="posts" />
            <RecentPosts nextSection="projects"/>
            <FeaturedProjects nextSection="contact" />
            <Contact />
        </Stack>
    );
}

export { Home };