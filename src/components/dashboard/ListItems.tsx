import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Folder, LogoutTwoTone, UploadFile } from '@mui/icons-material';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <UploadFile />
      </ListItemIcon>
      <ListItemText primary="Uploads" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Folder />
      </ListItemIcon>
      <ListItemText primary="Files"/>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader> */}
    <ListItemButton>
      <ListItemIcon>
        <LogoutTwoTone />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);