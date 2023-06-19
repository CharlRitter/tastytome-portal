import React, { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import SideMenu from '@/components/SideMenu';
import { DRAWER_WIDTH } from '@/constants/general';

interface Props {
  children?: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <Container>
      <SideMenu drawerWidth={DRAWER_WIDTH} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          mt: '64px'
        }}
      >
        {children}
      </Box>
    </Container>
  );
}

export default Layout;
