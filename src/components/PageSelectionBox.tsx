import React from "react";
import { ArticleOutlined } from "@mui/icons-material";
import { FormControlLabel, Checkbox, Box, Typography } from "@mui/material";


interface IPageSelectionBoxProps{
    label: string;
    checked: boolean;
    onChange: () => void;
}

type ISelectionBoxProps = Pick<IPageSelectionBoxProps, 'label'>;

const SelectionBox: React.FC<ISelectionBoxProps> = ({label}) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box>
                <ArticleOutlined fontSize="large" />
            </Box>
            <Typography variant="caption" color="ActiveCaption">{label}</Typography>
        </Box>
    );
}

export const PageSelectionBox: React.FC<IPageSelectionBoxProps> = ({label, onChange, checked}) => {
    return (
        <FormControlLabel
            label={<SelectionBox label={label} />}
            control={
                <Checkbox
                    onChange={onChange}
                    aria-label="controlled"
                    color="success"
                    checked={checked}
                />
            }
            sx={{
                m: 1,
                p: 1,
                border: '1px dotted rgba(55,55,55, 0.3)',
                backgroundColor: checked ? 'rgba(20, 245, 20, 0.12)': 'none',
                '&:hover': {
                    border: '1px solid green'
                }
            }}
        />
    );
}