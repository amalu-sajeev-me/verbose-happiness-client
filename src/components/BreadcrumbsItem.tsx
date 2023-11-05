import { Typography } from "@mui/material";
import React from "react";
import { useLocation, Link } from "react-router-dom";

interface IBreadcrumbsItemProps {
    label: string;
    to: string;
}

export const BreadcrumbsItem: React.FC<IBreadcrumbsItemProps> = ({to, label}) => {
    const { pathname } = useLocation();
    const isActive = pathname === to;
    return (
        <Typography variant="body2">
            {isActive ? (
                <Typography color="darkgrey">{label.toLowerCase()}</Typography>
            ) : (
                    <Link style={{color: 'green'}} to={to}>{label.toLowerCase()}</Link>
            )}
        </Typography>    
    );
}