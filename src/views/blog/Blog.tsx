import React, {useEffect, useState} from "react";
import { Link as RouterLink } from "react-router-dom";
import {Avatar, Box, Button, Chip, Divider, Grid, Stack, Typography, useTheme} from "@mui/material";
import {CreateFAB} from "../../components/CreateFAB";
import {useBlog} from "../../contexts/BlogContext";
import {Post} from "../../types/api";

const PostItem = ({ id, data }: {id: string, data: Post}) => {
    const theme = useTheme();
    return (
        <Box paddingBottom={4}>
            <Typography variant="h4" fontWeight="bolder" fontFamily="Montserrat" color={theme.palette.secondary.main} gutterBottom>
                <RouterLink to={`/blog/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {data.title}
                </RouterLink>
            </Typography>
            { data.createdAt && <Typography variant="caption" fontFamily="Montserrat" fontStyle="oblique">Posted {data.createdAt.toDate().toLocaleDateString('en-US', {month: "long", day: "numeric", year: "numeric"})}</Typography> }
            <Typography variant="body1" paddingY={2} fontSize="1.3rem">{data.description}</Typography>
            <Button component={RouterLink} to={`/blog/${id}`} variant="contained" sx={{ bgcolor: theme.palette.primary.light }}>
                Keep Reading &rarr;
            </Button>
        </Box>
    );
}

const Blog = () => {
    const theme = useTheme();
    const { data } = useBlog();
    const [tagDocs, setTagDocs] = useState<{ [tag: string]: string[] }>({});
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filteredData, setFilteredData] = useState<Record<string, Post> | null>(null);

    useEffect(() => {
        if (data) {
            const newTagDocs: { [tag: string]: string[] } = {};

            Object.entries(data).forEach(([id, post]) => {
                post.tags.forEach((tag) => {
                    newTagDocs[tag] = [...(newTagDocs[tag] || []), id];
                });
            });
            setTagDocs(newTagDocs);
        }
    }, [data]);

    const handleTagClick = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    useEffect(() => {
        if (selectedTags.length === 0) {
            setFilteredData(null);
            return;
        }

        const filteredIds: string[] = selectedTags.reduce((result: string[], tag) => {
            const tagIds = tagDocs[tag] || [];
            tagIds.forEach(id => {
                if (!result.includes(id)) {
                    result.push(id);
                }
            });
            return result;
        }, []);

        if (data) {
            setFilteredData(
                filteredIds.reduce((acc, id) => {
                    acc[id] = data[id];
                    return acc;
                }, {} as Record<string, Post>)
            );
        }
    }, [selectedTags, data, tagDocs]);

    return (
        <Box sx={{ minHeight: `calc(100vh - 91px)`, paddingBottom: 5 }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={11} sm={9} md={7} lg={5}>
                    {data && <Typography variant="caption">{`${Object.keys(data).length} Articles`}</Typography> }
                    <Typography variant="h3">Blog</Typography>
                    <Typography variant="subtitle2">Featured Topics:</Typography>
                    {Object.entries(tagDocs).map( ([tag, docs], index) => (
                        <Chip
                            key={index}
                            onClick={() => handleTagClick(tag)}
                            variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                            size="small"
                            label={tag}
                            sx={{
                                mr: 1, // Adding margin between each Chip
                                mb: 1, // Adding margin between each row of Chips
                                ...(selectedTags.includes(tag)
                                    ? {
                                        bgcolor: theme.palette.primary.light,
                                        color: theme.palette.getContrastText(theme.palette.primary.light),
                                    }
                                    : {
                                        borderColor: theme.palette.primary.light,
                                    }),
                            }}
                            avatar={
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.primary.light,
                                        color: theme.palette.getContrastText(theme.palette.primary.light),
                                    }}
                                >
                                    <Typography variant="caption" color={theme.palette.getContrastText(theme.palette.primary.light)}>{docs.length as number}</Typography>
                                </Avatar>
                            }
                        />
                    ))}
                    <Divider sx={{ marginBottom: 1 }}/>
                    <Stack spacing={4} border={1} borderColor={`rgba(0,0,0,0.12)`} padding={2} paddingTop={3} paddingBottom={4}>
                        {data && selectedTags.length === 0 && Object.entries(data).map(([id, post], index) => (
                            <div key={id}>
                                <PostItem id={id} data={post} key={id} />
                                { index !== Object.keys(data).length - 1 && <Divider /> }
                            </div>
                        ))}
                        {selectedTags.length > 0 && filteredData && Object.entries(filteredData).map( ([id, post], index) => (
                            <div key={id}>
                                <PostItem id={id} data={post} />
                                { index !== Object.keys(filteredData).length - 1 && <Divider /> }
                            </div>
                        ))}
                        {selectedTags.length > 0 && !filteredData && (
                            <Typography variant="h5">No posts match the selected tags!</Typography>
                        )}
                        {data && Object.keys(data).length === 0 && (
                            <Typography variant="h4" color="textSecondary" align="center">
                                More content coming soon
                            </Typography>
                        )}
                    </Stack>
                </Grid>
            </Grid>
            <CreateFAB route="/create-post" />
        </Box>
    );
}

export { Blog };