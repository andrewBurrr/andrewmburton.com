import {SvgIcon, useTheme} from "@mui/material";
// @ts-ignore
import { ReactComponent as SVG} from "assets/webicon.svg";
import {useEffect} from "react";
import {useNav} from "../contexts/NavContext";

const WebIcon = () => {
    const theme = useTheme();
    const { isOpen } = useNav();
    const iconColor = isOpen ? theme.palette.primary.main : theme.palette.background.default;

    useEffect(() => {
        const webIcon = document.getElementById("webicon") as HTMLElement | null;

        if (webIcon instanceof SVGElement) {
            webIcon.querySelectorAll<HTMLElement>(".st0").forEach((element) => {
                element.style.fill = theme.palette.getContrastText(iconColor);
            });

            webIcon.querySelectorAll<HTMLElement>(".st1").forEach((element) => {
                element.style.fill = "none";
                element.style.stroke = theme.palette.getContrastText(iconColor);
                element.style.strokeWidth = "3";
                element.style.strokeMiterlimit = "10";
            })

            webIcon.querySelectorAll<HTMLElement>(".st2").forEach((element) => {
                element.style.display = "none";
            })

            webIcon.querySelectorAll<HTMLElement>(".st3").forEach((element) => {
                element.style.display = "inline";
            })

            webIcon.querySelectorAll<HTMLElement>(".st4").forEach((element) => {
                element.style.fill = theme.palette.getContrastText(iconColor);
            })

        }
    }, [iconColor, theme]);

    return (
        <SvgIcon component={SVG} id="webicon" viewBox="0 0 400 400" style={{ fontSize: 75 }} />
    );
}

export { WebIcon };