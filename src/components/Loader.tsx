import { Backdrop } from "@mui/material";
import { BallTriangle } from 'react-loader-spinner';
import React from "react";

interface ILoaderProps {
    open: boolean;
}

export const Loader:React.FC<ILoaderProps> = ({open}) => {
    return (
        <Backdrop open={open} sx={{zIndex: (theme)=>theme.zIndex.modal}}>
            <BallTriangle />
        </Backdrop>
    );
}