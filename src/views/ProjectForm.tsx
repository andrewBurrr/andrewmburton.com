import React, {FormEvent, useState} from 'react';

import { Project} from "types/api";
import {useCreateProject} from "hooks/useCreateProject";
import {FormTextField} from "components/forms/FormTextField";
import {Box, Grid, Stack, Typography} from "@mui/material";
import {FormButton} from "components/forms/FormButton";
import {MarkDownEditor} from "../components/MarkDownEditor";
import {TagSelector} from "../components/forms/TagSelector";
import {FileUpload} from "../components/forms/FileUpload";
import {useNavigate} from "react-router-dom";

const ProjectForm = () => {
    const navigate = useNavigate();
    const { publishProject } = useCreateProject();
    const [projectData, setProjectData] = useState<Project>({
        title: '',
        thumbnailURL: '',
        description: '',
        content: '',
        tags: [],
        repository: '',
        video: '',
        reportURL: '',
        isFeatured: false,
    });

    const handleChange = (field: keyof Project, value: string | string[] | File) => {
        setProjectData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await publishProject(projectData);
        navigate(-1);
    };

    return (
        <Grid container alignItems="center" justifyContent="center" paddingY={5}>
            <Grid item xs={10} sm={8} md={6}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 0, maxWidth: 800, margin: 'auto' }} border={1} borderColor={`rgba(0,0,0,0.12)`} padding={2}>
                    <Stack spacing={2}>
                        <Typography component="h1" variant="h5" align="center">
                            Create Project
                        </Typography>
                        <FormTextField fullWidth required margin="none" label="Title"
                            value={projectData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                        <FormTextField
                            fullWidth required multiline margin="none" label="Description"
                            value={projectData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                        />
                        <TagSelector selectedTags={projectData.tags} onTagsChange={handleChange} />
                        <FileUpload fileType="image/*" label="thumbnail" content={projectData.thumbnail} onChange={handleChange}/>
                        <MarkDownEditor content={projectData.content} onChange={handleChange} />
                        <FormTextField fullWidth required margin="none" label="Repository URL"
                            value={projectData.repository}
                            onChange={(e) => handleChange('repository', e.target.value)}
                        />
                        <FormTextField fullWidth required margin="none" label="Video URL"
                            value={projectData.video}
                            onChange={(e) => handleChange('video', e.target.value)}
                        />
                        <FileUpload fileType=".pdf" label="report" content={projectData.report} onChange={handleChange}/>
                        <FormButton type="submit" fullWidth variant="contained">
                            Submit
                        </FormButton>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    )
}

export { ProjectForm };