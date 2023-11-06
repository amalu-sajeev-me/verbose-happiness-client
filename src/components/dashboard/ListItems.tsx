import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { Folder, LogoutRounded, UploadFileTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Tooltip, Typography } from '@mui/material';


interface IMainMenuItem {
  label: string;
  url: `/${string}`;
  icon: React.ReactNode;
}

const menuItemsList: IMainMenuItem[] = [
  {
    label: 'upload',
    url: '/dashboard/upload',
    icon: <UploadFileTwoTone color="primary" />
  },
  {
    label: 'view files',
    url: '/dashboard/files',
    icon: <Folder color="primary" />
  },
  {
    label: 'logout',
    url: '/logout',
    icon: <LogoutRounded color="warning" />
  }
]

export const mainListItems = (
  <>
    {menuItemsList.map(item => {
      return (
        <Link to={item.url}>
          <Tooltip title={item.label}>
            <ListItemButton sx={{display: 'flex', alignItems: 'center', gap: 4}}>
              {item.icon}
              <Typography variant="button" color="darkslategray">
              {item.label}
              </Typography>
            </ListItemButton>
          </Tooltip>
        </Link>
      );
    })}
  </>
);