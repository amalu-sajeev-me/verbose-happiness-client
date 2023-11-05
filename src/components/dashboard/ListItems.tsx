import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Folder, LogoutTwoTone, UploadFileTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';


interface IMainMenuItem {
  label: string;
  url: `/${string}`;
  icon: React.ReactNode;
}

const menuItemsList: IMainMenuItem[] = [
  {
    label: 'upload',
    url: '/dashboard/upload',
    icon: <UploadFileTwoTone />
  },
  {
    label: 'view files',
    url: '/dashboard/files',
    icon: <Folder />
  }
]

export const mainListItems = (
  <>
    {menuItemsList.map(item => {
      return (
        <Link to={item.url}>
          <ListItemButton>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label.toUpperCase()} />
          </ListItemButton>
        </Link>
      );
    })}
  </>
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