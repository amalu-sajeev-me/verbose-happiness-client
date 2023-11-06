import React from "react";
import { GitHub } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";

export const Copyright:React.FC = function () {
  return (
      <Box display="flex" flexDirection="row" alignItems="center" textAlign="center" my={4}>
          <Typography variant="body2" color="darkgray" m="auto">
          {'Copyright © '}
        <GitHub sx={{ fontSize: '1em' }} />
        &nbsp;/&nbsp;
        <Link sx={{color: 'lightseagreen'}} href="https://github.com/amalu-sajeev-me" target="_blank">
          amalu-sajeev-me
        </Link>
        <Typography color="darkgray">{new Date().getFullYear()}</Typography>
        </Typography>
      </Box>
  );
}