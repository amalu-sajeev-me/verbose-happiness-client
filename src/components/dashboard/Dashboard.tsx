import {
  Box,
  Paper} from '@mui/material';
import { Copyright } from '../Copyright';
import { Drawer } from '../Drawer';
import { Page } from '../Page';
import { withAuthGuard } from '../auth/withAuthGuard';



function DashboardView() {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }}>
        <Drawer />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            display: 'block',
            width: '100%',
            overflow: 'auto',
          }}
        >
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Page />
            </Paper>
            <Copyright/>
        </Box>
      </Box>
  );
}

export const Dashboard = withAuthGuard(DashboardView);