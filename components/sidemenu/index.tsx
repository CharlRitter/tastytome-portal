import React, { ReactElement, useState } from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { DateTime } from 'luxon';
import {
  AppBar,
  Box,
  Breadcrumbs,
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
import { FaBars, FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { PAGES, INFO_MODALS } from '@/constants/navigationitems';
import { CapitaliseFirstLetter } from '@/utils/common';
import { InfoModal, Page } from '@/types/constants';
import { NextLink } from '@/public/theme/globalStyled';
import { MenuBottomContent, MenuBottomWrapper } from './styled';

export default function SideMenu(props: { drawerWidth: number }): ReactElement {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<number>(INFO_MODALS.unsetModal);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { drawerWidth } = props;
  const { publicRuntimeConfig } = getConfig();
  const currentRoute = usePathname();
  const routeSections = currentRoute ? currentRoute.split('/').filter((element) => element.trim() !== '') : [];
  const now = DateTime.local();
  const currentYear = now.year;
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  let breadcrumbsHref = '';
  const breadcrumbs = routeSections.map((routeSection: string, index: number) => {
    breadcrumbsHref += `/${routeSection}`;
    let content: string | ReactElement = CapitaliseFirstLetter(routeSection, routeSection.includes('-') ? '-' : '');
    const lastItem = index === routeSections.length - 1;

    if (!lastItem) {
      content = (
        <NextLink key={routeSection} href={breadcrumbsHref}>
          {content}
        </NextLink>
      );
    }

    return (
      <Typography
        key={routeSection}
        variant="h6"
        noWrap
        sx={{ color: lastItem ? theme.palette.common.white : theme.palette.grey.A400 }}
      >
        {content}
      </Typography>
    );
  });

  const pages = PAGES.map((page: Page) => (
    <ListItem key={page.title} disablePadding>
      <ListItemButton selected={currentRoute === page.route} onClick={() => router.push(page.route)}>
        <ListItemIcon>{page.icon}</ListItemIcon>
        <ListItemText primary={page.title} />
      </ListItemButton>
    </ListItem>
  ));

  const infoModals = INFO_MODALS.modals.map((modal: InfoModal) => {
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
          onClose={() => setOpenModal(INFO_MODALS.unsetModal)}
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
            <Button onClick={() => setOpenModal(INFO_MODALS.unsetModal)} autoFocus>
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
      <MenuBottomWrapper>
        <MenuBottomContent>
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
        </MenuBottomContent>
      </MenuBottomWrapper>
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
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <FaBars />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'inherit' }}>
            {breadcrumbs}
          </Breadcrumbs>
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
