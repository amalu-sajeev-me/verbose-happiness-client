import { PictureAsPdfTwoTone } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IFileIconProps {
    name: string;
}
export const FileIcon: React.FC<IFileIconProps> = ({ name }) => {
    const navigate = useNavigate();
    const onFileOpen = () => {
        navigate('../../view/1');
    }
    return (
        <Tooltip title="double click to open">
            <Box
                display="inline-flex"
                p={1}
                flexDirection="column"
                border="1px dotted rgba(55,55,55, 0.3)"
                boxShadow="1px 3px 6px rgba(55,55,55, 0.2)"
                width="auto"
                alignItems="center"
                gap={2}
                sx={{
                    '&:hover': {
                        border: '1px solid green'
                    }
                }}
                onDoubleClick={onFileOpen}
            >
                <PictureAsPdfTwoTone fontSize="large" color="primary" />
                <Typography variant="caption" color="ActiveCaption">{name}</Typography>
            </Box>
        </Tooltip>
    );
}