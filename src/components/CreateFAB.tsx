import {Fab} from "@mui/material";
import {Add} from "@mui/icons-material";
import React, {FC} from "react";
import {useAuth} from "../contexts/AuthContext";
import { Link as RouteLink } from "react-router-dom";

interface CreateFABProps {
    route: string;
}

const CreateFAB: FC<CreateFABProps> = ({ route }) => {
    const { user, loading } = useAuth();

    return (
        <>
            { !loading && user !== null &&
                <Fab
                    component={RouteLink}
                    to={route}
                    sx={{ position: 'fixed', bottom: '32px', right: '32px' }}
                    color="secondary"
                    aria-label="add"
                >
                    <Add />
                </Fab>
            }
        </>
    );
}

export { CreateFAB };