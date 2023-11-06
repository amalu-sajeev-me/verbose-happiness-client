import { NavigateNext, PictureAsPdfRounded } from "@mui/icons-material";
import { Box, Breadcrumbs as MuiBreadcrumbs, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { BreadcrumbsItem } from "./BreadcrumbsItem";


export const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width:600px)');
    const pathNames = location.pathname.split('/').filter(x => x);
    return (
        <Box display="flex" flexDirection={isMobile ? 'column-reverse': 'row'} justifyContent="space-between" gap={3}>
            <MuiBreadcrumbs separator={<NavigateNext fontSize="small" />}>
                <BreadcrumbsItem to="/" label="Home" />
                {pathNames.map((name, index)=>{
                    const routeTo = `/${pathNames.slice(0, index+1).join('/')}`;
                    return <BreadcrumbsItem to={routeTo} key={routeTo} label={name} />
                })}
            </MuiBreadcrumbs>
            <Box>
                <Typography variant="h6" color="darkslategray">
                    <PictureAsPdfRounded sx={{
                        transform: 'translateY(6px)',
                        color: 'darkslateblue'
                    }} />
                    &nbsp;PDF PAGE EXTRACTOR
                </Typography>
            </Box>
        </Box>
    );
}