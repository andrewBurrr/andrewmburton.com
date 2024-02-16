import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from "contexts/AuthContext";
import { GitHub, LinkedIn, YouTube } from "@mui/icons-material";
import {FooterBox} from "components/footer/FooterBox";
import {LinkBox} from "components/footer/LinkBox";
import {FooterLink} from "components/footer/FooterLink";
import {SocialBox} from "components/footer/SocialBox";
import {globalRoutes, privateRoutes, publicRoutes} from "../../navigation/Routes";
import {auth} from "../../apis/firebase";


const Footer = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    const links = !loading ? [
        ...(user !== null ? privateRoutes : publicRoutes),
        ...globalRoutes
    ] : [];

    const socials = [
        { path: "https://ca.linkedin.com/in/andrew-burton-318a12157", color: "#0077B5", icon: <LinkedIn sx={{ fontSize: 'h2.fontSize' }}/> },
        { path: "https://github.com/andrewBurrr", color: "#181717", icon: <GitHub sx={{ fontSize: 'h2.fontSize' }} /> },
        { path: "https://www.youtube.com/channel/UCX7rRMmlEEbP4-5j8MkYENQ", color: "#FF0000", icon: <YouTube sx={{ fontSize: 'h2.fontSize' }} /> },
    ];

    const handleLogout = async () => {
        await auth.signOut();
    }

    return (
        <FooterBox component="footer">
            <LinkBox>
                {links.map((link, index) => (
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
                { user &&
                    <FooterLink
                        component={Link}
                        to="/"
                        onClick={handleLogout}
                        underline="none"
                        color='inherit'
                    >
                        Logout
                    </FooterLink>
                }
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