import { motion } from "framer-motion";
import {MenuItem} from "./MenuItem";
import {Tabs} from "@mui/material";

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const itemIds = [0,1,2,3,4]

const MenuNav = () => {
    return (
        <Tabs orientation="vertical" variant="fullWidth" component={motion.div} variants={variants} sx={{ display: 'flex', flexDirection: 'column' }}>
            {itemIds.map(i => (
                <MenuItem key={i}/>
            ))}
        </Tabs>
        // <motion.ul variants={variants} style={{ padding: "25px" }}>
        //     {itemIds.map(i => (
        //         <MenuItem key={i}/>
        //     ))}
        // </motion.ul>
    );
}

export { MenuNav };