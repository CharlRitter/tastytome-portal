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
import { DateTime } from 'luxon';
import { usePathname, useRouter } from 'next/navigation';
import React, { JSX, useEffect, useState } from 'react';
import { FaBars, FaCoffee, FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import Markdown from 'react-markdown';

import { INFO_MODALS, PAGES } from '@/constants/navigationItems';
import { NextLink } from '@/components/styled-components';
import { InfoModal, Page } from '@/types/constants';
import { capitaliseFirstLetter } from '@/utils/common';

export type SideMenuProps = {
  drawerWidth: number;
};

export function SideMenu(props: SideMenuProps): JSX.Element {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<number>(INFO_MODALS.unsetModal);
  const [modalContent, setModalContent] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { drawerWidth } = props;
  const currentRoute = usePathname();
  const routeSections = currentRoute
    ? currentRoute
        .split('/')
        .filter((routeSection) => routeSection.trim() !== '' && Number.isNaN(parseInt(routeSection, 10)))
    : [];
  const now = DateTime.local();
  const currentYear = now.year;
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  let breadcrumbsHref = '';

  const breadcrumbs = routeSections.map((routeSection, index) => {
    breadcrumbsHref += `/${routeSection}`;
    let content: string | JSX.Element = capitaliseFirstLetter(routeSection, routeSection.includes('-') ? '-' : '');
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
        sx={{ color: lastItem ? theme.palette.common.white : theme.palette.common.gray_400 }}
      >
        {content}
      </Typography>
    );
  });

  const pages = PAGES.filter((page: Page) => !page?.isDisabled).map((page: Page) => (
    <ListItem key={page.title} disablePadding>
      <ListItemButton selected={currentRoute === page.route} onClick={() => router.push(page.route)}>
        <ListItemIcon>{page.icon}</ListItemIcon>
        <ListItemText primary={page.title} />
      </ListItemButton>
    </ListItem>
  ));

  const infoModals = INFO_MODALS.modals.map((modal: InfoModal) => (
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
          <Markdown>{modalContent}</Markdown>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(INFO_MODALS.unsetModal)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  ));

  const drawer = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          TastyTome
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {pages}
        <Divider />
        {infoModals}
      </List>
      <Box className="flex items-end	text-center	h-full pb-1">
        <Box className="w-full">
          <Box>
            <IconButton
              aria-label="buy me a coffee profile"
              // TODO add link
              // onClick={() => window.open('', '_blank')}
            >
              <FaCoffee />
            </IconButton>
            <IconButton
              aria-label="github profile"
              onClick={() => window.open('https://github.com/CharlRitter', '_blank')}
            >
              <FaGithubSquare />
            </IconButton>
            <IconButton
              aria-label="linkedin profile"
              onClick={() => window.open('https://www.linkedin.com/in/charl-ritter-0a1a45130/', '_blank')}
            >
              <FaLinkedin />
            </IconButton>
          </Box>
          <Typography variant="caption">© {currentYear} TastyTome.</Typography>
        </Box>
      </Box>
    </>
  );

  useEffect(() => {
    async function fetchModalContent(title: string) {
      const response = await import(`@/public/files/${title.toLowerCase().split(' ').join('-')}.md`);
      setModalContent(response.default);
    }

    if (openModal !== INFO_MODALS.unsetModal) {
      const modal = INFO_MODALS.modals.find((item) => item.id === openModal);

      if (modal) {
        fetchModalContent(modal.title);
      }
    }
  }, [openModal]);

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
          <Breadcrumbs aria-label="breadcrumbs" sx={{ color: 'inherit' }}>
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
