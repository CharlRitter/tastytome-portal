import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import getConfig from 'next/config';
import { DateTime } from 'luxon';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { FaBars, FaRegEnvelope, FaGithubSquare, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa';
import PAGES from '@/constants/pages';
import { RootReducerState } from '@/constants/types';
import { setIsDarkMode } from '@/slices/theme';
import styles from './sidemenu.module.scss';

export default function SideMenu(props: { drawerWidth: number }) {
  const { drawerWidth } = props;
  const isDarkMode = useSelector((state: RootReducerState) => state.isDarkMode);

  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const currentRoute = usePathname();
  const currentPage = PAGES.find((page) => currentRoute === page.route);
  const { publicRuntimeConfig } = getConfig();
  const now = DateTime.local();
  const currentYear = now.year;
  const drawer = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          CookScribe
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {PAGES.map((page) => (
          <div key={page.route}>
            <ListItem disablePadding>
              <ListItemButton selected={currentRoute === page.route} onClick={() => router.push(page.route)}>
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.title} />
              </ListItemButton>
            </ListItem>
            {page?.divider && <Divider />}
          </div>
        ))}
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
            <IconButton
              aria-label="email_link"
              onClick={() => {
                window.location.href = 'mailto:charlritter@hotmail.com';
              }}
            >
              <FaRegEnvelope />
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
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="Menu">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
