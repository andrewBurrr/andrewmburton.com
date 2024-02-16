import React, {FormEvent, useState} from 'react';

import {Post, Project} from "types/api";
import {useCreateProject} from "hooks/useCreateProject";
import {FormTextField} from "components/forms/FormTextField";
import {Box, Grid, Stack, Typography} from "@mui/material";
import {FormButton} from "components/forms/FormButton";
import {MarkDownEditor} from "../components/MarkDownEditor";
import {TagSelector} from "../components/forms/TagSelector";
import {FileUpload} from "../components/forms/FileUpload";
import {useCreatePost} from "../hooks/useCreatePost";

const PostForm = () => {
    const { publishPost, loading, error } = useCreatePost();
    const [postData, setPostData] = useState<Post>({
        title: '',
        thumbnailURL: '',
        description: '',
        content: '',
        tags: [],
    });

    const handleChange = (field: keyof Project, value: string | string[] | File) => {
        setPostData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // You can perform any validation before submitting
        console.log(postData);
        await publishPost(postData);
    };

    return (
        <Grid container alignItems="center" justifyContent="center" paddingY={5}>
            <Grid item xs={10} sm={8} md={6}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 0, maxWidth: 800, margin: 'auto' }} border={1} borderColor={`rgba(0,0,0,0.12)`} padding={2}>
                    <Stack spacing={2}>
                        <Typography component="h1" variant="h5" align="center">
                            New Post
                        </Typography>
                        <FormTextField fullWidth required margin="none" label="Title"
                                       value={postData.title}
                                       onChange={(e) => handleChange('title', e.target.value)}
                        />
                        <FormTextField fullWidth required multiline margin="none" label="Description"
                                       value={postData.description}
                                       onChange={(e) => handleChange('description', e.target.value)}
                        />
                        <TagSelector selectedTags={postData.tags} onTagsChange={handleChange} />
                        <FileUpload fileType="image/*" label="thumbnail" content={postData.thumbnail} onChange={handleChange}/>
                        <MarkDownEditor content={postData.content} onChange={handleChange} />
                        <FormButton type="submit" fullWidth variant="contained">
                            Submit
                        </FormButton>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    )
}

export { PostForm };