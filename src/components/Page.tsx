import { Box } from "@mui/material";
import { FileUpload } from "./FileUpload";
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';

const routes = createBrowserRouter([
    {
        path: 'upload',
        element: <FileUpload />
    }
])

export const Page = () => {
    return (
        <Box minHeight="90vh">
            page
            <Outlet />
        </Box>
    );
}