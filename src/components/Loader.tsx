import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

interface ILoaderProps {
    open: boolean;
}

export const Loader:React.FC<ILoaderProps> = ({open}) => {
    return (
        <Backdrop open={open} sx={{zIndex: (theme)=>theme.zIndex.modal}}>
            <CircularProgress />
        </Backdrop>
    );
}