import {FC, SyntheticEvent, useEffect, useState} from "react";
import {Stack, Tab, Tabs, Typography, useTheme} from "@mui/material";
import {Link as RouteLink, useLocation} from "react-router-dom";
import {Link as StyleLink} from "@mui/material";
import {CustomRoute} from "../../types/config";
import {MenuItem} from "./MenuItem";
import {motion} from "framer-motion";
import {useNav} from "../../contexts/NavContext";

const tabsVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const tabVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

interface MenuControlProps {
    links: CustomRoute[];
}

const MenuControl: FC<MenuControlProps> = ({ links}) => {
    const theme = useTheme();
    const location = useLocation();
    const { toggleIsOpen } = useNav();
    const pathIndex = () => links.findIndex(link => link.path === location.pathname);
    const [currentPage, setCurrentPage] = useState(pathIndex);

    const handlePageChange = ( event: SyntheticEvent ) => {
        toggleIsOpen();
        setCurrentPage(pathIndex);
    };

    useEffect(() => {
        setCurrentPage(pathIndex);
    }, [location]);

    return (
        <Stack direction="column" alignItems="stretch" justifyContent="space-between" sx={{ height: "90%", py: 6 }}>
            {links.map(link => (
                <motion.div key={link.path} variants={tabVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <StyleLink component={RouteLink} to={link.path} underline="none" onClick={toggleIsOpen}>
                        <Typography variant="h2" fontFamily="Aboreto" align="center" color={theme.palette.getContrastText(theme.palette.primary.main)}>
                            {link.title}
                        </Typography>
                    </StyleLink>
                </motion.div>
            ))}
        </Stack>
    );
}

export { MenuControl };