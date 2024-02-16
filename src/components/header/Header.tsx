import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from "contexts/AuthContext";
import { auth } from "apis/firebase";
import {
    AppBar, Box, Container, Grid,
    IconButton, styled, Toolbar, useTheme,
} from "@mui/material";
import { useFetchCurrentUser } from "hooks/useFetchCurrentUser";
import {globalRoutes, privateRoutes, publicRoutes} from "../../navigation/Routes";
import {TabControl} from "./TabControl";
import {Nav} from "./Nav";
import {MenuToggle} from "./MenuToggle";
import { WebIcon } from "components/WebIcon";
import {useNav} from "../../contexts/NavContext";

const SmallBox = styled (Box) `
  position: relative;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  display: flex;
  
  ${props => props.theme.breakpoints.up('sm')} {
    display: none;
  }
`

const MediumBox = styled(Box) `
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  display: none;
  
  ${props => props.theme.breakpoints.up('sm')} {
    display: flex;
  }
`

const LinkContainer = styled('div') `
  display: flex;
  align-items: center;
`

const Header: React.FC = () => {
    const theme = useTheme();
    const { user, loading } = useAuth();
    const { isOpen, toggleIsOpen } = useNav();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState<null|HTMLElement>(null);
    const { userData } = useFetchCurrentUser(user?.uid || null);


    const links = !loading ? [
        ...globalRoutes,
        ...(user !== null ? privateRoutes : publicRoutes),
    ] : [];

    const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorElUser(null);
    }

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/");
    }

    return (
        <React.Fragment>
            <AppBar position="static" color="transparent" elevation={0} sx={{ zIndex: theme.zIndex.appBar }}>
                <Container maxWidth={false} style={{ padding: 0 }}>
                    <Toolbar disableGutters>
                        <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                            <Grid item>
                                <IconButton component={Link} to="/" onClick={() => isOpen ? toggleIsOpen() : null}>
                                    <WebIcon />
                                </IconButton>
                            </Grid>
                            <Grid item container justifyContent="flex-end" direction="row" wrap="nowrap" spacing={2}>
                                <MediumBox>
                                    <TabControl links={links} />
                                </MediumBox>
                            </Grid>
                            <Grid item>
                                <SmallBox>
                                    <MenuToggle />
                                </SmallBox>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Nav />
        </React.Fragment>
    );
}

export { Header };