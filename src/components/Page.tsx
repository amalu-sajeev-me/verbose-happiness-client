import { Box, Divider } from "@mui/material";
import { Outlet } from 'react-router-dom';
import { Breadcrumbs } from "./Breadcrumbs";


export const Page = () => {
    return (
        <Box minHeight="90vh">
            <Breadcrumbs />
            <Box height={32} />
            <Divider />
            <Box height={32} />
            <Outlet />
        </Box>
    );
}