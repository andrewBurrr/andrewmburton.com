import React, {ChangeEvent, FC, FormEvent, useState} from "react";
import {Box, Button, Grid, Paper, TextField, Typography, useTheme} from "@mui/material";
import {useCreateLead} from "../../hooks/useCreateLead";

interface ContactTextProps {
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ContactText: FC<ContactTextProps> = ({ placeholder, value, onChange }) => {
    const theme = useTheme();

    return (
        <TextField
            hiddenLabel
            size="small"
            variant="standard"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            sx={{
                display: "inline",
                verticalAlign: "middle",
                input: {
                    color: theme.palette.getContrastText(theme.palette.primary.main),
                    underline: { color: theme.palette.getContrastText(theme.palette.primary.main), },
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: 20
                },
            }}
        />
    );
}

const initialFormState = {
    name: '',
    inquiry: '',
    email: '',
}

const Contact = () => {
    const theme = useTheme();
    const { sendLead } = useCreateLead();
    const [formData, setFormData] = useState(initialFormState);

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await sendLead(formData);
        setFormData(initialFormState);
    };

    return (
        <Box sx={{ bgcolor: theme.palette.primary.dark, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: 6 }} id="contact">
            <Typography variant="h3" color={theme.palette.getContrastText(theme.palette.primary.dark)} align="center" padding={3}>
                <span style={{ color: theme.palette.getContrastText(theme.palette.primary.dark) }}>Let's</span>{' '}
                <span style={{ color: theme.palette.secondary.main }}>Chat</span>
            </Typography>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={10} sm={8} md={5}>
                    <Paper elevation={10} sx={{ bgcolor: theme.palette.primary.main, padding: 3 }} component="form" onSubmit={handleSubmit}>
                        <Typography variant="body1" fontSize={24} fontWeight="bolder" color={theme.palette.getContrastText(theme.palette.primary.main)} sx={{ lineHeight: '2.5em', display: 'inline', alignItems: 'baseline' }}>
                            Hello, my name is{' '}
                        </Typography>
                        <ContactText placeholder="your name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                        <Typography variant="body1" fontSize={24} fontWeight="bolder" color={theme.palette.getContrastText(theme.palette.primary.main)} sx={{ lineHeight: '2.5em', display: 'inline', alignItems: 'baseline' }}>
                            {' '}and I have a{' '}
                        </Typography>
                        <ContactText placeholder="idea, project, inquiry" value={formData.inquiry} onChange={(e) => handleInputChange('inquiry', e.target.value)} />
                        <Typography variant="body1" fontSize={24} fontWeight="bolder" color={theme.palette.getContrastText(theme.palette.primary.main)} sx={{ lineHeight: '2.5em', display: 'inline', alignItems: 'baseline' }}>
                            {' '}that I want to discuss with you. You can reach me at{' '}
                        </Typography>
                        <ContactText placeholder="your email address" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                        <Typography variant="body1" fontSize={24} fontWeight="bolder" color={theme.palette.getContrastText(theme.palette.primary.main)} sx={{ lineHeight: '2.5em', display: 'inline', alignItems: 'baseline' }}>
                            . I look forward to hearing from you.
                        </Typography>
                        <Button type="submit" style={{ color: theme.palette.getContrastText(theme.palette.primary.main), display: "block", marginLeft: "auto", marginRight: 0, marginTop: 2 }}>send info</Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>

    );
}

export { Contact };