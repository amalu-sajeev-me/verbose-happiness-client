import { Box, Button } from "@mui/material";
import { MuiFileInput } from 'mui-file-input';
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { Loader } from "./Loader";

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
        const result = await api.post('/files', form);
        if (result.status == 200) {
            enqueueSnackbar({ variant: 'success', message: 'file uploaded succesfully' });
            setLoading(false);
        }
        console.log({ result });
    }
    return (
        <Box display="flex" flexDirection="row"
            gap={1}
            alignItems="center"
            alignContent="center"
        >
                <MuiFileInput
                    value={file}
                    onChange={handleChange}
                    placeholder="accepts only .pdf files"
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
    );
}