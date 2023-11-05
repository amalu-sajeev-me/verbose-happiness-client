import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DateUtils } from '../../../verbose-happiness/src/utils/Date.utils';
import { DateRangeOutlined } from "@mui/icons-material";

export const DateAndTime: React.FC = () => {
    const [today, setToday] = useState<Date>(new Date());
    useEffect(() => {
        const interval = setTimeout(() => {
            setToday(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <Box display="flex" gap={2}>
            <Typography variant="body1">
                <DateRangeOutlined fontSize="small" />
                {DateUtils.formattedDate(today)}
            </Typography>
        </Box>
    );
}