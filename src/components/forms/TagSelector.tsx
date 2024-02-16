import React, {ChangeEvent, useState} from "react";
import {Box, Button, Chip, Grid, InputAdornment, TextField} from "@mui/material";
import {Project} from "types/api";

interface TagSelectorProps {
    selectedTags: string[];
    onTagsChange: (field: keyof Project, value: string | string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, onTagsChange }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState('');

    const handleTagInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTag(event.target.value);
    };

    const handleAddTag = () => {
        if (tag.trim() !== '') {
            if (!tags.includes(tag.trim())) {
                setTags([...tags, tag.trim()]);
                onTagsChange('tags', [...tags, tag.trim()]);
            }
            setTag('');
        }
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && tag.trim() !== '') {
            if (!tags.includes(tag.trim())) {
                setTags([...tags, tag.trim()]);
                onTagsChange('tags', [...tags, tag.trim()]);
            }
            setTag('');
        }
    };

    const handleRemoveTag = (removedTag: string) => {
        const updatedTags = tags.filter((tag) => tag !== removedTag);
        setTags(updatedTags);
        onTagsChange('tags', updatedTags);
    };

    return (
        <Grid item xs={12}>
            <Box display="flex" alignItems="baseline" justifyContent="flex-start">
                <TextField
                    variant="outlined"
                    fullWidth
                    value={tag}
                    onChange={handleTagInputChange}
                    onKeyPress={handleInputKeyPress}
                    placeholder="Enter tag"
                    sx={{ height: '100%' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button variant="contained" color="primary" onClick={handleAddTag}>
                                    Add Tag
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            {/* Display selected tags as chips */}
            {selectedTags.map((tag) => (
                <Chip key={tag} label={tag} sx={{ margin: '4px' }} onDelete={() => handleRemoveTag(tag)} />
            ))}
        </Grid>
    );
}

export { TagSelector };