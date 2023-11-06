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
    Typography,
    IconButton,
    Divider,
    Tooltip,
    useMediaQuery,
    Link,
} from '@mui/material';
import React, { useEffect, useReducer, useRef } from "react";
import { PageSelectionBox } from "./PageSelectionBox";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from '../hooks/useAxios';
import { PDFDocument } from 'pdf-lib';
import { Loader } from './Loader';
import { ArrowBack, ArrowForward, Edit } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { ReducerService } from './action/ReducerService';
import { FILE_OPEN_VIEW_ACTIONS, IFileOpenViewState } from './action/Action.type';


const initialState: IFileOpenViewState = {
    fileName: 'untitled.pdf',
    pageCount: 0,
    loading: true,
    overWrite: false,
    selectedPages: new Set<number>(),
    renameTo: null,
    moreInfo: undefined,
    extractedDownloadUrl: null,
}

export const FileOpenView: React.FC = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const {fileId} = useParams() as {fileId: string};
    const api = useAxios();
    const boxRef = useRef<HTMLDivElement>(null);
    const [state, dispatch] = useReducer(ReducerService.fileOpenView, initialState);
    const { fileName, loading, overWrite, pageCount, renameTo, selectedPages, moreInfo, extractedDownloadUrl } = state;
    const toggle = (fieldName: keyof IFileOpenViewState) => {
        dispatch({
            type: FILE_OPEN_VIEW_ACTIONS.ON_OR_OFF_TOGGLE,
            payload: { fieldName }
        });
    }
    useEffect(() => {
        (async () => {
            const apiResponse = await api.get(`/files/${fileId}`);
            const secure_url = apiResponse.data.responseData.storageData.secure_url;
            const fileName = apiResponse.data.responseData.fileName as string;
            const {data: pdfBytes} = await api.get(secure_url, {responseType: 'arraybuffer'});
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const pageCount = pdfDoc.getPageCount();
            const moreInfo = {
                fileName,
                docId: fileId,
                ownerId: apiResponse.data.responseData.owner
            };
            dispatch({
                type: FILE_OPEN_VIEW_ACTIONS.FETCH,
                payload: { fileName, moreInfo, loading: false, pageCount }
            })
        })();
    }, []);

    const handleCheckboxChange = (pageNumber: number) => {
        dispatch({
            type: FILE_OPEN_VIEW_ACTIONS.FILE_SELECTION,
            payload: {
                pageNumber 
            }
        })
    }
    const handleClose = () => {
        navigate(-1);
    }
    const toggleOverWrite = () => {
        toggle('overWrite');
    }
    const onExtractButtonClick = () => {
        if (selectedPages.size < 1) {
            return enqueueSnackbar({variant: 'error', message:'No files selected for extraction'})
        }
        toggle('loading');
        api.post(`/files/${fileId}/extract`, {
            pages: [...selectedPages],
            renameTo
        }).then(response => {
            if (response.status === 200) {
                const secureUrl = response.data?.responseData?.storageData?.secure_url as string;
                if (secureUrl) dispatch({
                    type: FILE_OPEN_VIEW_ACTIONS.FETCH,
                    payload: { extractedDownloadUrl: secureUrl }
                });
                enqueueSnackbar({ variant: 'success', message: 'file extracted succesfully' });
                toggle('loading');
            }
        })
    }
    const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        if (event.deltaY !== 0) {
            if (boxRef.current) {
                boxRef.current.scrollBy({left: event.deltaY, behavior: 'smooth'})
            }
        }
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
                    <DialogTitle variant="h5" color="darkslategray">
                        {fileName.toUpperCase()+ "  "}
                        <Tooltip title="Read only">
                            <Edit fontSize="small" />
                        </Tooltip>
                    </DialogTitle>
                    <DialogContent>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <IconButton>
                        <ArrowBack />
                    </IconButton>
                    <Box
                        height="8rem"
                        sx={{
                            overflowY: 'hidden',
                            owerflowX: 'scroll',
                            whiteSpace: 'nowrap',
                            '&::-webkit-scrollbar': {
                                width: '12px'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(229,246,253, 0.82)',
                                width: '14px',
                                borderRadius: '6px'
                            },
                            width: '100%'
                        }}
                        ref={boxRef}
                        onWheel={handleScroll}
                    >
                        {new Array(pageCount).fill(null).map((_title, index) => {
                            return (
                                <PageSelectionBox
                                    key={index}
                                    checked={selectedPages.has(index + 1)}
                                    label={`Page Number ${index + 1}`}
                                    onChange={() => handleCheckboxChange(index + 1)} />
                            );
                        })}
                    </Box>
                    <IconButton>
                        <ArrowForward />
                    </IconButton>
                </Box>
                <Box p={1}>
                    <Alert variant="standard" severity="info">
                        Please scroll or swipe to the left or right to select the pages you want to extract.
                    </Alert>
                    <Divider/>
                    <Alert variant="standard" severity="warning">
                        <AlertTitle>Note:</AlertTitle>
                        You must select the pages that you want to extract from the PDF file from above to continue 
                        with the extract and download process.
                    </Alert>
                </Box>
                <Typography variant="button" color="darkgreen" p={1} mt={3}>
                    Additional Settings
                </Typography>
                <Box display="flex" flexDirection={isMobile ? 'column': 'row'} justifyContent="space-between" gap={5}>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={1} p={1}>
                        <TextField
                            variant="outlined"
                            placeholder="file name prefix (without .pdf)"
                            sx={{ width: '18rem' }}
                            disabled={!overWrite}
                            size="small"
                            value={renameTo}
                            onChange={(e) => {
                                dispatch({type: FILE_OPEN_VIEW_ACTIONS.FETCH, payload: {renameTo: e.target.value}})
                            }}
                            helperText="this will be included in your extracted file name with the current timestamp"
                        />            
                        <FormControlLabel
                            label={
                                <Typography fontFamily="monospace" variant="subtitle1" color="lightslategray">owerwrite the existing filename</Typography>
                            }
                            control={
                                <Checkbox
                                    color="warning"
                                    checked={overWrite}
                                    size="small"
                                    onChange={toggleOverWrite}
                                />}
                        />
                    </Box>
                    {/* <Box>
                        <Alert variant="outlined" color="info">
                            <AlertTitle>overview of the process</AlertTitle>
                            when you click on the extract and download button, you'll get a download link just below 
                            the button which will let you download the file to your local device. and also a copy of
                            the extracted file gets saved in the server for future use. it is reccommended that you 
                            overwrite the extracted file name using text field in the additional settings section.
                        </Alert>
                    </Box> */}
                    {!loading && (<Box>
                        <Typography variant="body1" fontWeight="bold" color="lightslategray">More info</Typography>
                        {Object.entries(moreInfo || {}).map(([key, value]) => {
                            return (
                                <Box display="flex" gap={3}>
                                    <Typography variant="button" color="darkgreen">{key}</Typography>
                                    <Typography variant="caption" color="grey">{value}</Typography>
                                </Box>
                            );
                        })}
                    </Box>)}
                </Box>
                <Box p={1}>
                    <Button onClick={onExtractButtonClick} variant="contained" color="success">Extract Pdf</Button>
                </Box>
                {extractedDownloadUrl && (
                    <Box p={1}>
                        <Link variant='button' sx={{
                            color: 'green'
                        }} href={extractedDownloadUrl} target="_blank">download</Link>
                    </Box>
                )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="success">Go Back</Button>
                </DialogActions>
                <Loader open={loading} />
            </Dialog>
    );
}