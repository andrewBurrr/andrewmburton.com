import React from "react";
import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import {CreateFAB} from "../../components/CreateFAB";
import {GenericCardElement} from "../../components/GenericCardElement";
import {useProjects} from "../../contexts/ProjectsContext";

const Projects = () => {
    const { data } = useProjects();

    return (
        <Box sx={{ minHeight: `calc(100vh - 91px)` }}>
            <Typography variant="h3" align="center" gutterBottom>Projects</Typography>
            <Divider variant="middle"/>
            <Container sx={{ paddingY: 2 }}>
                <Grid container spacing={4} alignItems="center" justifyContent="center">
                    {data && Object.entries(data).map( ([id, project]) => (
                        <Grid item key={id} xs={12} sm={6} md={4}>
                            <GenericCardElement data={project} route={`/projects/${id}`} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <CreateFAB route="/create-project" />
        </Box>
    );
}

export { Projects };