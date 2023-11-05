import React from "react";
import { GitHub } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";

export const Copyright:React.FC = function () {
  return (
      <Box display="flex" flexDirection="row" alignItems="center" textAlign="center">
          <Typography variant="body2" color="darkslateblue" m="auto">
          {'Copyright © '}
          <GitHub sx={{fontSize: '1em'}} /> / <Link href="https://github.com/amalu-sajeev-me" target="_blank">amalu-sajeev-me</Link>
        </Typography>
      </Box>
  );
}