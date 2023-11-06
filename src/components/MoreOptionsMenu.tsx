import * as React from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useAuth } from './auth/AuthContext';

interface IMoreOptionsMenuProps {
  onExtract: () => void;
  onSwap: () => void;
}

export const MoreOptionsMenu: React.FC<IMoreOptionsMenuProps> = ({ onExtract, onSwap }) => {
  const { experimentalMode } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          outline: 'none !important'
        }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => (handleClose(), onExtract())} sx={{textTransform: 'capitalize'}}>
          <Typography variant='caption' color="darkslategray" textTransform="capitalize">
            extract
          </Typography>
        </MenuItem>
        {
          experimentalMode && (
              <MenuItem onClick={() => (handleClose(), onSwap())}>
                <Typography variant='caption' color="darkslategray" textTransform="capitalize">
                  swap pages
                </Typography>
              </MenuItem>
          )
        }
      </Menu>
    </div>
  );
}