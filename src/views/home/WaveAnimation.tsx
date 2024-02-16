import React, {FC} from 'react';
import { motion } from 'framer-motion';
import {Box, useTheme} from "@mui/material";
// @ts-ignore
import SVG from "assets/waveanimation.svg";
import {ScrollTo} from "../../components/ScrollTo";

interface WaveAnimationProps {
    nextSection: string;
}

const WaveAnimation: FC<WaveAnimationProps> = ({ nextSection }) => {
    const theme = useTheme();
    const animationVariants = {
        initial: {
            transform: 'translateX(0%)',
        },
        animate: {
            transform: 'translateX(-50%)',
            transition: {
                repeat: Infinity,
                duration: 12, // Adjust the duration as needed
                ease: 'linear',
            },
        },
    };

    return (
        <Box position="relative">
            <Box position="absolute" sx={{ border: "none", top: -198, width: "100%", overflowX: "hidden" }}>
                <motion.div
                    style={{
                        background: `url(${SVG}) repeat-x`,
                        width: '6400px',
                        height: '198px',
                        willChange: 'transform',
                    }}
                    initial="initial"
                    animate="animate"
                    variants={animationVariants}
                />
            </Box>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    position: 'relative',
                    border: 'none',
                    width: '100%',
                    height: `calc(20vh - 91px)`,
                    paddingBottom:4,
                    backgroundColor: theme.palette.primary.main
                }}
            >
                <ScrollTo nextSection={nextSection} />
            </Box>
        </Box>
    );
};

export { WaveAnimation };
