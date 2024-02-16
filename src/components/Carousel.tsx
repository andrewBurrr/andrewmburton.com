import {Box, Grid, Link, Paper, Typography, useTheme} from "@mui/material";
import {motion} from "framer-motion";
import React, {cloneElement, FC, ReactElement, useState} from "react";

interface SlideProps<T> {
    data: T;
}

interface CarouselProps<T> {
    slides: T[];
    slideElement: (data: T) => ReactElement<SlideProps<T>>;
}

const Carousel: FC<CarouselProps<any>> = ({ slides, slideElement }) => {
    const theme = useTheme();
    const swipeConfidenceThreshold = 10000;
    const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            };
        }
    };

    const paginate = (newDirection: number) => {
        const newIndex = (newDirection > 0) ? (activeIndex + 1) % slides.length : (activeIndex -1 + slides.length) % slides.length;
        setActiveIndex([newIndex, newDirection]);
    };

    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const handleDotClick = (index: number) => {
        setActiveIndex([index, 1]);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={10} md={5} lg={4}>
                    <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflowX: "hidden" }}
                    >
                        <Box key={activeIndex}>
                            {slideElement(slides[activeIndex])}
                        </Box>
                    </motion.div>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', m: 2 }}>
                <Link
                    component={motion.div}
                    underline="none"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => paginate(-1)}
                    style={{ cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}
                >
                    <Typography variant="subtitle2" color={theme.palette.getContrastText(theme.palette.primary.main)}>Prev</Typography>
                </Link>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {slides.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => handleDotClick(index)}
                            sx={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: index === activeIndex ? 'primary.light' : 'secondary.main',
                                cursor: 'pointer',
                                userSelect: 'none'
                            }}
                        />
                    ))}
                </Box>
                <Link
                    component={motion.div}
                    underline="none"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => paginate(1)}
                    style={{ cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}
                >
                    <Typography variant="subtitle2" color={theme.palette.getContrastText(theme.palette.primary.main)}>Next</Typography>
                </Link>
            </Box>
        </Box>
    );
}

export { Carousel };