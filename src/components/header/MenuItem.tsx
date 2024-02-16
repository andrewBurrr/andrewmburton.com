import { motion } from "framer-motion";
import {Tab} from "@mui/material";

const variants = {
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



const MenuItem = () => {
    return (
        <Tab
            component={motion.div}
            label={"Hello"}
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            sx={{ flex: 1, textAlign: 'center' }}
        />
    );
}

export { MenuItem };