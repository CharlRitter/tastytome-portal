import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { DateTime } from 'luxon';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { FaBars, FaGithubSquare, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa';
import { PAGES, INFO_MODALS } from '@/constants/navigationitems';
import { InfoModal, Page, RootReducerState } from '@/constants/types';
import { setIsDarkMode } from '@/slices/theme';
import styles from './sidemenu.module.scss';

export default function SideMenu(props: { drawerWidth: number }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openModal, setOpenModal] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { drawerWidth } = props;
  const { publicRuntimeConfig } = getConfig();
  const currentRoute = usePathname();
  const isDarkMode = useSelector((state: RootReducerState) => state.isDarkMode);
  const currentPage = PAGES.find((page: Page) => currentRoute === page.route);
  const now = DateTime.local();
  const currentYear = now.year;
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));
  const pages = PAGES.map((page: Page) => (
    <ListItem key={page.title} disablePadding>
      <ListItemButton selected={currentRoute === page.route} onClick={() => router.push(page.route)}>
        <ListItemIcon>{page.icon}</ListItemIcon>
        <ListItemText primary={page.title} />
      </ListItemButton>
    </ListItem>
  ));
  const infoModals = INFO_MODALS.map((modal: InfoModal) => {
    const Content = dynamic(() => import(`@/public/files/${modal.title.toLowerCase()}.mdx`), {
      loading: () => <div>Loading...</div>
    });

    return (
      <ListItem key={modal.title} disablePadding>
        <ListItemButton onClick={() => setOpenModal(modal.id)}>
          <ListItemIcon>{modal.icon}</ListItemIcon>
          <ListItemText primary={modal.title} />
        </ListItemButton>
        <Dialog
          open={openModal === modal.id}
          onClose={() => setOpenModal(0)}
          fullWidth
          maxWidth="md"
          fullScreen={isSM}
          aria-labelledby={`${modal.title}-dialog-title`}
          aria-describedby={`${modal.title}-dialog-description`}
        >
          <DialogTitle id={`${modal.title}-dialog-title`}>{modal.title}</DialogTitle>
          <DialogContent>
            <Content />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(0)} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  });

  const drawer = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          CookScribe
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {pages}
        <Divider />
        {infoModals}
      </List>
      <Box className={styles['menu-bottom-wrapper']}>
        <Box className={styles['menu-bottom-item']}>
          <Typography variant="caption">version: {publicRuntimeConfig?.version}</Typography>
          <Box>
            <IconButton
              aria-label="github_profile"
              onClick={() => window.open('https://github.com/CharlRitter', '_blank')}
            >
              <FaGithubSquare />
            </IconButton>
            <IconButton
              aria-label="linkedin_profile"
              onClick={() => window.open('https://www.linkedin.com/in/charl-ritter-0a1a45130/', '_blank')}
            >
              <FaLinkedin />
            </IconButton>
          </Box>
          <Typography variant="caption">© {currentYear} CookScribe.</Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar className={styles['header-bar']}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <FaBars />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {currentPage ? currentPage.title : 'Page Not Found'}
          </Typography>
          <IconButton aria-label="theme mode" color="white" onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
            {isDarkMode ? <FaMoon /> : <FaSun />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" aria-label="Menu">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
