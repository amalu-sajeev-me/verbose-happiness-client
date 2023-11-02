import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    AlertTitle,
    TextField,
    FormControlLabel,
    Checkbox,
    Typography
} from '@mui/material';
import React, { useState } from "react";
import { PageSelectionBox } from "./PageSelectionBox";
import { useNavigate } from "react-router-dom";

export const FileOpenView: React.FC = () => {
    const mockFile = new Array(6).fill('lol');
    const [overwrite, setOverwrite] = useState<boolean>(false);
    const navigate = useNavigate()
    const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
    const handleCheckboxChange = (pageNumber: number) => {
        const updatedSet = new Set(selectedPages);
        if (updatedSet.has(pageNumber)) updatedSet.delete(pageNumber);
        else updatedSet.add(pageNumber);
        setSelectedPages(updatedSet);
    }
    const handleClose = () => {
        navigate(-1);
    }
    const toggleOverWrite = () => {
        if (overwrite) setOverwrite(false);
        else setOverwrite(true)
    }
    return (
        <Dialog
                    sx={{
                    '&.MuiDialog-paper': {
                        width: '899px'
                        },
                    }}
                    onClose={handleClose}
                    open
                    BackdropProps={{ onClick: handleClose }}
                    fullWidth
                    maxWidth="lg"
                    fullScreen
                >
                    <DialogTitle variant="h5" color="InfoText">{'name.pdf'.toUpperCase()}</DialogTitle>
                    <DialogContent>
                        <Box>
                            {mockFile.map((title, index) => {
                                return (
                                    <PageSelectionBox
                                        checked={selectedPages.has(index)}
                                        label={`${title} - Page Number ${index + 1}`}
                                        onChange={() => handleCheckboxChange(index)} />
                                );
                            })}
                        </Box>
                        <Box p={1}>
                            <Alert variant="standard" severity="info">
                                <AlertTitle>Note:</AlertTitle>
                                Please select the pages you want to extract from the pdf
                            </Alert>
                </Box>
                <Typography variant="h6" p={1} mt={3}>
                    Additional details
                </Typography>
                <Box display="flex" flexDirection="row" alignItems="center" gap={1} p={1}>
                    <TextField
                        variant="outlined"
                        placeholder="file name prefix (without .pdf)"
                        sx={{ width: '30%' }}
                        disabled={!overwrite}
                    />            
                    <FormControlLabel
                        label={
                            <Typography variant="subtitle1">owerwrite the existing filename</Typography>
                        }
                        control={
                            <Checkbox
                                color="warning"
                                checked={overwrite}
                                size="small"
                                onChange={toggleOverWrite}
                            />}
                    />
                </Box>
                    <Box p={1}>
                        <Button variant="contained" color="success">Extract and Download Pdf</Button>
                    </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="success">Go Back</Button>
                    </DialogActions>
                </Dialog>
    );
}