import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { BreadcrumbsItem } from "./BreadcrumbsItem";


export const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter(x => x);
    return (
        <Box>
            <MuiBreadcrumbs separator={<NavigateNext fontSize="small" />}>
                <BreadcrumbsItem to="/" label="Home" />
                {pathNames.map((name, index)=>{
                    const routeTo = `/${pathNames.slice(0, index+1).join('/')}`;
                    return <BreadcrumbsItem to={routeTo} key={routeTo} label={name} />
                })}
            </MuiBreadcrumbs>
        </Box>
    );
}