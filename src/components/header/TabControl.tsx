import { FC, SyntheticEvent, useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { CustomRoute } from "types/config";

interface PageControlProps {
    links: CustomRoute[];
}

const TabControl: FC<PageControlProps> = ({ links }) => {
    const location = useLocation();
    const pathIndex = () => links.findIndex(link => link.path === location.pathname);
    const [currentPage, setCurrentPage] = useState(pathIndex() > -1 ? pathIndex : 0);

    const handleTabChange = ( event: SyntheticEvent ) => {
        setCurrentPage(pathIndex() > -1 ? pathIndex : 0);
    };

    useEffect(() => {
        setCurrentPage(pathIndex() > -1 ? pathIndex : 0);
    }, [location]);

    return (
        <Tabs value={currentPage} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
            {links.filter((link) => link.icon).map((link, i) => (
                <Tab
                    key={i}
                    component={Link}
                    label={link.title}
                    to={link.path}
                />
            ))}
        </Tabs>
    );
}

export { TabControl };