import { Alert, AlertTitle, Box, Button, Divider, Typography } from "@mui/material";
import { MuiFileInput } from 'mui-file-input';
import { useSnackbar } from "notistack";
import { useState } from "react";
import { IApiResponse, useAxios } from "../hooks/useAxios";
import { Loader } from "./Loader";
import { Link } from "react-router-dom";

export const FileUpload = () => {
    const api = useAxios(true);
    const [file, setFile] = useState<null | File>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();
    const handleChange = (newFile: File | null) => {
        setFile(newFile);
        console.log(newFile);
    };
    const onUpload = async () => {
        if(!file) return enqueueSnackbar({variant: 'error', message: 'no file choosen'})
        const form = new FormData();
        form.append('pdf-file', file);
        setLoading(true)
        const { data } = await api.post('/files', form);
        const { statusCode } = data as IApiResponse;
        if (statusCode == 200) {
            enqueueSnackbar({ variant: 'success', message: 'file uploaded succesfully' });
            setLoading(false);
        }
        console.log({ data });
    }
    return (
        <Box>
            <Box display="flex" flexDirection="row"
            gap={1}
            alignItems="center"
            alignContent="center"
        >
                <MuiFileInput
                    value={file}
                    onChange={handleChange}
                    placeholder="accepts only .pdf files"
                    InputProps={{type: 'file'}}
                />
                <Button
                    variant="outlined"
                    color="success"
                sx={{ p: 1 }}
                onClick={onUpload}
                disabled={loading}
                >
                    Upload
            </Button>
            <Loader open={loading} />
            </Box>
            <Box mt={5}>
                <Alert variant="standard" color="info">
                    <AlertTitle sx={{textAlign: 'left'}}>Info</AlertTitle>
                    <Typography variant="caption">
                        Please upload your Pdf files here. And you can view all uploaded files from 
                        the <Link to="../files">Files</Link> section.
                    </Typography>
                </Alert>
            </Box>
            <Divider />
            <Box sx={{textAlign: 'left'}}>
                <Alert variant="standard" color="success">
                    <AlertTitle sx={{textAlign: 'left'}}>How to extract pages from your PDF</AlertTitle>
                    <ol>
                        <li>
                            <Typography variant="body2" color="darkslategray">
                                Upload your source pdf file which the pages needs to be extracted from &nbsp;
                                <Link to="../files">here</Link>
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2" color="darkslategray">
                                Go to <Link to="../files">View Files</Link> Page and find the uploaded file.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2" color="darkslategray">
                                Double click on the file to open the Page extraction window.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2" color="darkslategray">
                                Select the pages you want to extract by cliking on the page numbers.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2" color="darkslategray">
                                optionally you can rename the new file
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2" color="darkslategray">
                                click on extract and downlod button.
                            </Typography>
                        </li>
                    </ol>
                </Alert>
            </Box>
        </Box>
    );
}