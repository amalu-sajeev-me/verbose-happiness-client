import { Alert, AlertTitle, Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAxios } from '../hooks/useAxios';
import { FileIcon } from "./FileIcon";
import { Loader } from "./Loader";

type IFilesResponse = Record<'fileName', string>;
type IQueryParams = Record<'pageNumber', string>;

export const ViewFiles: React.FC = () => {
    const api = useAxios();
    const [loading, setLoading] = useState<boolean>(true);
    const { pageNumber = 1 } = useParams<IQueryParams>();
    const [pageCount, setPageCount] = useState<number>(0);
    const navigate = useNavigate();
    const [files, setFiles] = useState<null | IFilesResponse[]>(null);
    useEffect(() => {
        api.get(`/files/all/${pageNumber}`).then(response => {
            console.log({ response });
            const { data } = response;
            const files = data.responseData.data as IFilesResponse[];
            const totalPages = data.responseData.totalPages as number;
            console.log(files);
            setPageCount(totalPages);
            setFiles(files);
            setLoading(false);
        });
    }, [pageNumber]);
    const handlePagination = (_event: React.ChangeEvent<unknown>, page: number) => {
        console.log({ page });
        navigate(`../${page}`)
    }
    console.log({files});
    return (
        <Box>
            <Box display="flex" flexDirection="row" gap={2}>
                {files && files.map(file => {
                    return (
                        <FileIcon name={file.fileName} key={file.fileName} />
                    );
                })}
            </Box>
            <Box p={1} mt={5}>
                {files && files.length > 0 ? (
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    upload more files to browse. 
                    click <Link to="../../upload">here</Link> to upload one more file
                </Alert>
                ) : (
                    <Alert severity="warning" color="warning">
                            <AlertTitle>Warning</AlertTitle>
                            no files have been uploaded yet. 
                            click <Link to="../../upload">here</Link> to upload your first file.
                    </Alert>
                )}
            </Box>
            <Box>
                <Pagination
                    sx={{ position: 'fixed', bottom: '3rem' }}
                    page={Number(pageNumber)}
                    count={pageCount}
                    onChange={handlePagination}
                    variant="outlined"
                    shape="rounded"
                />
            </Box>
            <Loader open={loading} />
        </Box>
    );
}