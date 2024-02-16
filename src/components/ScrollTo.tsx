import {theme} from "../styles/AppTheme";
import {Link, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {ExpandMoreRounded} from "@mui/icons-material";
import React, {FC} from "react";

interface ScrollToProps {
    nextSection: string;
}

const ScrollTo: FC<ScrollToProps> = ({ nextSection }) => {

    const linkVariants = {
        hidden: { y: 0, opacity: 0 },
        visible: { y: 20, opacity: [0, 1, 0] },
    }

    const scrollToSection = (sectionId: string): void => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    return (
        <Link
            component="div"
            onClick={() => scrollToSection(nextSection)}
            underline="none"
            color={theme.palette.getContrastText(theme.palette.primary.main)}
            style={{ cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}
        >
            <motion.div
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                transition={{ duration: 2.5, ease: 'linear', repeat: Infinity }}
            >
                <ExpandMoreRounded fontSize="medium" />
            </motion.div>
            <Typography variant="caption">
                scroll
            </Typography>
        </Link>
    );
}

export { ScrollTo };