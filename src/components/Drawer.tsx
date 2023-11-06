import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  styled,
  Box,
  Toolbar,
  IconButton,
  Divider,
  List,
  Drawer as MuiDrawer,
  useMediaQuery
} from "@mui/material";
import { mainListItems } from "./dashboard/ListItems";
import { useState } from "react";

const drawerWidth: number = 240;

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export const Drawer = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState<boolean>(!isMobile && true);
  const toggleDrawer = () => {
    !isMobile && setOpen(!open);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <StyledDrawer variant="permanent" open={open} sx={{height: '100vh'}}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeft />: <ChevronRight/>}
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </StyledDrawer>
    </Box>
  );
}