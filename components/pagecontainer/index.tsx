import React, { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import SideMenu from '@/components/sidemenu';
import { DRAWER_WIDTH } from '@/constants/general';

export default function PageContainer(props: { children?: ReactNode }) {
  const { children } = props;

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: '64px',
        ml: { sm: `${DRAWER_WIDTH}px` },
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
      }}
    >
      <Container>
        <SideMenu drawerWidth={DRAWER_WIDTH} />
        <Box
          component="main"
          sx={{
            p: 2
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
