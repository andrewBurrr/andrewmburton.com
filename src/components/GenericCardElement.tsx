import {CardElement} from "../types/api";
import {Box, Grid, Paper, styled, Typography, useTheme} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";

const DescriptionTypography = styled(Typography) `
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
` as typeof Typography;

interface GenericCardElementProps<T extends CardElement> {
    data: T;
    route: string;
}

const GenericCardElement = <T extends CardElement>({ data, route }: GenericCardElementProps<T>) => {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            to={route}
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Paper elevation={10} sx={{ position: "relative", bgcolor: theme.palette.primary.light, padding: 3, borderRadius: '24px' }}>
                <Grid container direction="column" spacing={0.5}>
                    <Grid item>
                        <img
                            src={data.thumbnailURL}
                            alt={data.title}
                            style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: "16px" }}
                            draggable={false}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" fontWeight="bold" color={theme.palette.getContrastText(theme.palette.primary.main)} noWrap>{data.title}</Typography>
                    </Grid>
                    <Grid item sx={{ height: "5rem" }}>
                        <DescriptionTypography
                            variant="body1"
                            color={theme.palette.getContrastText(theme.palette.primary.main)}
                            sx={{ height: "100%" }}
                        >
                            {data.description}
                        </DescriptionTypography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" color="secondary">
                            {data.createdAt && data.createdAt.toDate().toLocaleDateString('en-US', {month: "long", day: "numeric", year: "numeric"})}
                        </Typography>
                    </Grid>
                </Grid>
                <motion.div
                    initial={{ opacity: 0 }} // Initially hidden
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '8px 16px',
                        borderRadius: '0 24px 0 16px',
                    }}
                >
                    <Typography variant="body2" color="text.primary">Read More</Typography>
                </motion.div>
            </Paper>
        </Link>
    );
}

export { GenericCardElement };