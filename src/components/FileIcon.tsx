import React from "react";
import { CloudDownloadOutlined, PictureAsPdfTwoTone } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MoreOptionsMenu } from "./MoreOptionsMenu";

interface IFileIconProps {
    name: string;
    fileId: string;
    secure_url: string;
}
export const FileIcon: React.FC<IFileIconProps> = ({ name, fileId, secure_url }) => {
    const navigate = useNavigate();
    const onFileOpen = () => {
        navigate(`../../view/${fileId}`);
    }
    const onSwapClick = () => {
        navigate(`../../swap/${fileId}`);
    }

    return (
        <Box title="double click to open">
            <Box
                display="inline-flex"
                p={2}
                flexDirection="column"
                border="1px dotted rgba(55,55,55, 0.3)"
                boxShadow="1px 3px 6px rgba(55,55,55, 0.2)"
                width="auto"
                alignItems="center"
                gap={2}
                sx={{
                    '&:hover': {
                        border: '1px solid green'
                    },
                    '&:hover .download-btn': {
                        opacity: 1,
                    },
                    '&:hover .more-button': {
                        opacity: 1,
                    },
                }}
                maxWidth="6rem"
                maxHeight="8rem"
                onDoubleClick={onFileOpen}
                textOverflow="clip"
                position="relative"
                zIndex={1}
            >
                <PictureAsPdfTwoTone fontSize="large" color="primary" />
                <Typography variant="caption" fontWeight="bolder" color="darkslategray">{name}</Typography>
                <IconButton
                    className="download-btn"
                    sx={{
                        position: 'absolute',
                        right: 0,
                        opacity: 0,
                        transition: 'opacity 0.2s ease-in-out',
                        outline: 'none !important',
                    }}
                >
                    <Tooltip title="click here to download">
                        <a href={secure_url} download>
                            <CloudDownloadOutlined />
                        </a>
                    </Tooltip>
                </IconButton>
                <Box
                    className="more-button"
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        opacity: 0,
                        transition: 'opacity 0.2s ease-in-out',
                        outline: 'none !important',
                        zIndex: 2
                    }}
                >
                    <MoreOptionsMenu onExtract={onFileOpen} onSwap={onSwapClick} />
                </Box>
            </Box>
        </Box>
    );
}