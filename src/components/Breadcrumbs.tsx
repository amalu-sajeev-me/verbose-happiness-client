import { NavigateNext, PictureAsPdfRounded } from "@mui/icons-material";
import { Box, FormControlLabel, Breadcrumbs as MuiBreadcrumbs, Typography, useMediaQuery, Checkbox } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { BreadcrumbsItem } from "./BreadcrumbsItem";
import { useAuth } from "./auth/AuthContext";


export const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const { experimentalMode, setExperimentalModeOnOff: enableExperimentalMode } = useAuth();
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
            <Box display="flex" flexDirection="column">
                <Typography variant="h6" color="darkslategray">
                    <PictureAsPdfRounded sx={{
                        transform: 'translateY(6px)',
                        color: 'darkslateblue'
                    }} />
                    &nbsp;PDF PAGE EXTRACTOR
                </Typography>
                <Typography variant="caption">
                    <FormControlLabel
                        label={<Typography fontFamily="monospace" variant="caption" color="darkgray">experimental features</Typography>}
                        control={<Checkbox
                            checked={experimentalMode}
                            onClick={() => enableExperimentalMode(!experimentalMode)}
                            name="experimental"
                            size="small"
                            color="warning" />}
                    />
                </Typography>
            </Box>
        </Box>
    );
}