import React, { useState } from 'react';
import { useRouter } from 'next/router';
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
import { FaBars, FaRegEnvelope, FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import PAGES from '@/constants/pages';
import styles from './SideMenu.module.scss';

interface Props {
  drawerWidth: number;
}

function SideMenu(props: Props) {
  const { drawerWidth } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;
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
        {PAGES.map((page) => {
          return (
            <div key={page.route}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={currentRoute === page.route}
                  onClick={() => {
                    return router.push(page.route);
                  }}
                >
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.title} />
                </ListItemButton>
              </ListItem>
              {page?.divider && <Divider />}
            </div>
          );
        })}
      </List>
      <Box className={styles['menu-bottom-wrapper']}>
        <Box className={styles['menu-bottom-item']}>
          {/* TODO VERSION */}
          <Typography variant="caption">version: 0.0.0</Typography>
          <Box>
            <IconButton
              aria-label="github_profile"
              onClick={() => {
                return window.open('https://github.com/CharlRitter', '_blank');
              }}
            >
              <FaGithubSquare />
            </IconButton>
            <IconButton
              aria-label="linkedin_profile"
              onClick={() => {
                return window.open('https://www.linkedin.com/in/charl-ritter-0a1a45130/', '_blank');
              }}
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
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => {
              return setMobileOpen(!mobileOpen);
            }}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <FaBars />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {
              PAGES.find((page) => {
                return currentRoute === page.route;
              }).title
            }
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="Menu">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => {
            return setMobileOpen(!mobileOpen);
          }}
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

export default SideMenu;
