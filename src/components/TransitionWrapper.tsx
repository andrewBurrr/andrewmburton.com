import {motion} from "framer-motion";
import {Box} from "@mui/material";
import {FC, ReactNode} from "react";

interface TransitionWrapperProps {
    children: ReactNode;
}

const TransitionWrapper: FC<TransitionWrapperProps> = ({ children }) => {
  return (
      <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
      >
          {children}
      </Box>
  );
}

export { TransitionWrapper };