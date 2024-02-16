import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "contexts/AuthContext";
// import { authOnlyRoutes, publicRoutes, unauthOnlyRoutes } from "navigation/RouteConfig";

import { GitHub, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import {FooterBox} from "components/footer/FooterBox";
import {LinkBox} from "components/footer/LinkBox";
import {FooterLink} from "components/footer/FooterLink";
import {SocialBox} from "components/footer/SocialBox";
import {globalRoutes, privateRoutes, publicRoutes} from "../../navigation/Routes";
import {Divider} from "@mui/material";


const Footer = () => {
    const { user, loading } = useAuth();

    const links = !loading ? [
        ...(user !== null ? privateRoutes : publicRoutes),
        ...globalRoutes
    ] : [];
    //                         sx={{ '&:hover': { color: social.color, backgroundColor: "white" } }}

    const socials = [
        { path: "https://ca.linkedin.com/in/andrew-burton-318a12157", color: "#0077B5", icon: <LinkedIn sx={{ fontSize: 'h2.fontSize' }}/> },
        { path: "https://github.com/andrewBurrr", color: "#181717", icon: <GitHub sx={{ fontSize: 'h2.fontSize' }} /> },
        { path: "https://www.youtube.com/channel/UCX7rRMmlEEbP4-5j8MkYENQ", color: "#FF0000", icon: <YouTube sx={{ fontSize: 'h2.fontSize' }} /> },
    ];

    return (
        <FooterBox component="footer">
            <LinkBox>
                {links.filter((link) => link.icon).map((link, index) => (
                    <FooterLink
                        key={index}
                        component={Link}
                        to={link.path}
                        underline="none"
                        color='inherit'
                    >
                        {link.title}
                    </FooterLink>
                ))}
            </LinkBox>
            <SocialBox>
                {socials.map((social, index) => (
                    <FooterLink
                        key={index}
                        href={social.path}
                        underline="none"
                        color='inherit'
                        sx={{ '&:hover': { color: social.color } }}
                    >
                        {social.icon}
                    </FooterLink>
                ))}
            </SocialBox>
        </FooterBox>

    );
}

export { Footer };