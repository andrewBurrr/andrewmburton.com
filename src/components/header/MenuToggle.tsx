import React from "react";
import {motion} from "framer-motion";
import {styled, SvgIcon, useTheme} from "@mui/material";
import {useNav} from "../../contexts/NavContext";

const MenuIconButton = styled("button") `
  outline: none;
  border: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
`

// const Path: FC<SVGMotionProps<SVGPathElement>> = (props) => {
//     const theme = useTheme();
//
//     return (
//         <motion.path
//             fill="transparent"
//             strokeWidth="1"
//             stroke={iconColor}
//             strokeLinecap="round"
//             {...props}
//         />
//     );
// }



const MenuToggle = () => {
    const theme = useTheme();
    const { isOpen, toggleIsOpen } = useNav();
    const iconColor = theme.palette.getContrastText(isOpen ? theme.palette.primary.main : theme.palette.background.default);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            style={{alignItems: "center"}}
        >
            <MenuIconButton onClick={toggleIsOpen} sx={{m: 2, pt: 0.5 }}>
                <SvgIcon id="menuicon" width={30} height={30} viewBox="0 0 22 20">
                    <motion.path
                        variants={{
                            closed: {d: "M 2 2.5 L 20 2.5"},
                            open: {d: "M 3 16.5 L 17 2.5"}
                        }}
                        fill="transparent"
                        strokeWidth="1"
                        stroke={iconColor}
                        strokeLinecap="round"
                    />
                    <motion.path
                        d="M 2 9.423 L 20 9.423"
                        variants={{
                            closed: {opacity: 1},
                            open: {opacity: 0}
                        }}
                        transition={{duration: 0.1}}
                        fill="transparent"
                        strokeWidth="1"
                        stroke={iconColor}
                        strokeLinecap="round"
                    />
                    <motion.path
                        id="cross"
                        variants={{
                            closed: {d: "M 2 16.346 L 20 16.346"},
                            open: {d: "M 3 2.5 L 17 16.346"}
                        }}
                        fill="transparent"
                        strokeWidth="1"
                        stroke={iconColor}
                        strokeLinecap="round"
                    />
                </SvgIcon>
            </MenuIconButton>
        </motion.nav>
    );
}

export { MenuToggle };