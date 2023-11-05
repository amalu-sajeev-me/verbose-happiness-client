import { NavigateNext, PictureAsPdfRounded } from "@mui/icons-material";
import { Box, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { BreadcrumbsItem } from "./BreadcrumbsItem";
import { DateAndTime } from "./DateAndTime";


export const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter(x => x);
    return (
        <Box display="flex" flexDirection="row" justifyContent="space-between">
            <MuiBreadcrumbs separator={<NavigateNext fontSize="small" />}>
                <BreadcrumbsItem to="/" label="Home" />
                {pathNames.map((name, index)=>{
                    const routeTo = `/${pathNames.slice(0, index+1).join('/')}`;
                    return <BreadcrumbsItem to={routeTo} key={routeTo} label={name} />
                })}
            </MuiBreadcrumbs>
            <Box>
                <Typography variant="h6" color="darkslateblue">
                    <PictureAsPdfRounded sx={{
                        transform: 'translateY(6px)',
                        color: 'darkslateblue'
                    }} />
                    PDF PAGE EXTRACTOR
                </Typography>
            </Box>
            <DateAndTime />
        </Box>
    );
}