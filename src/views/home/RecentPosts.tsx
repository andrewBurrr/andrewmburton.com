import {Box, Grid, Typography, useTheme} from "@mui/material";
import React, {FC} from "react";
import Carousel from "react-material-ui-carousel";
import {GenericCardElement} from "../../components/GenericCardElement";
import {useBlog} from "../../contexts/BlogContext";
import {ScrollTo} from "../../components/ScrollTo";

interface RecentPostsProps {
    nextSection: string;
}

const RecentPosts: FC<RecentPostsProps> = ({ nextSection }) => {
    const theme = useTheme();
    const { data } = useBlog();

    return (
        <Box sx={{ bgcolor: theme.palette.primary.dark, height: "100vh", position: "relative", display: "flex", flexDirection: "column"}} id="posts">
            <Typography variant="h3" color={theme.palette.getContrastText(theme.palette.primary.dark)} align="center" padding={3}>
                <span style={{ color: theme.palette.getContrastText(theme.palette.primary.dark) }}>Recent</span>{' '}
                <span style={{ color: theme.palette.secondary.main }}>Posts</span>
            </Typography>
            <Grid container justifyContent="center" alignItems="center" sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column", width: "100%" }}>
                <Grid item width="100%" height="100%">
                    { data &&
                        <Carousel animation="slide" duration={1000} height="75vh">
                            { Object.entries(data).map( ([id, data] ) =>
                                <Grid key={id} container alignItems="center" justifyContent="center" height="100%">
                                    <Grid item xs={9} sm={7} md={5} lg={3}>
                                        <GenericCardElement data={data} route={`/blog/${id}`} />
                                    </Grid>
                                </Grid>
                            ) }
                        </Carousel>
                    }
                </Grid>
            </Grid>
            <Box sx={{ width: "100%", position: "absolute", bottom: 0, alignItems: 'center', }}>
                <ScrollTo nextSection={nextSection} />
            </Box>
        </Box>
    );
}

export { RecentPosts };