import React, {ChangeEvent, useState} from "react";
import {Link as RouterLink} from 'react-router-dom';
import { FormGridContainer } from "components/forms/FormGridContainer";
import { FormGrid } from "components/forms/FormGrid";
import { FormTextField } from "components/forms/FormTextField";
import { FormButton } from "components/forms/FormButton";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Paper, Grid, Box, Link, Avatar, Typography, Stack} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "apis/firebase";

const Login = () => {
    // const user = useAuth();
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: ''});

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({
            email: formData.email !== '' ? '' : 'Email is required',
            password: formData.password !== '' ? '' : 'Password is required'
        });
        if (Object.values(errors).every((error) => error === '')) {
            try {
                await login(formData.email, formData.password);
            } catch (error) {
                setErrors({
                    email: 'Invalid credentials',
                    password: 'Invalid credentials'
                });
            }
        }
    }

    return (
        <FormGridContainer container>
            <FormGrid item xs={12} sm={8} md={5} component={Paper} square variant="outlined">
                <Box component="form" onSubmit={handleSubmit} noValidate width="100%">
                <Stack spacing={2} alignItems="center">
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <FormTextField
                        fullWidth
                        margin="normal"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        autoFocus
                    />
                    <FormTextField
                        fullWidth
                        margin="normal"
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        type="password"
                    />
                    <FormButton
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Sign In
                    </FormButton>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                component={RouterLink}
                                to='/reset-password'
                                underline='none'
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
            </FormGrid>
        </FormGridContainer>
    );
}

export { Login };