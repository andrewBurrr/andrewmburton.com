import React, {useState} from "react";
import {Grid, Paper, Chip, styled, useTheme, useMediaQuery} from "@mui/material";
import {FormButton} from "./FormButton";
import {CloudUpload} from "@mui/icons-material";
import {Project} from "../../types/api";

const VisuallyHiddenInput = styled('input')({
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

interface FileUploadProps {
    fileType: string;
    label: string;
    content: File | undefined;
    onChange: (field: keyof Project, value: string | string[] | File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ fileType, label, content, onChange }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [previewUrl, setPreviewUrl] = useState<string | null>('');
    const [fileName, setFileName] = useState<string | null>(null);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onChange(label as keyof Project, file);
            setPreviewUrl(URL.createObjectURL(file));
            setFileName(file.name);
        }

    }

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
            <Grid item xs={5.1}>
                <FormButton component="label" variant="contained" startIcon={<CloudUpload />} fullWidth>
                    {label}
                    <VisuallyHiddenInput
                        type="file"
                        accept={fileType}
                        onChange={handleFileChange}
                    />
                </FormButton>
            </Grid>
            <Grid item>
                { fileType === "image/*" && !isMobile ? (
                    content && (
                        <Paper style={{
                            width: 'auto',
                            height: 128,
                            padding: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Img src={previewUrl || ""} alt="Preview" />
                        </Paper>
                    )
                ) : ( content && (
                    <Chip label={fileName} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }} />
                ))}
            </Grid>
        </Grid>
    );
}

export { FileUpload };