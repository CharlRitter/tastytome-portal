import { AppBar, Box, Container, Paper, Stack, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import React, { JSX, useEffect, useState } from 'react';

import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';
import { useAppDispatch } from '@/reducers/hooks';

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [tabValue, setTabValue] = useState<number>(0);

  useEffect(() => {
    const hasToken = sessionStorage.getItem('jwtToken');

    if (hasToken) {
      router.push('/recipes');
    }
  }, [dispatch, router]);

  return (
    <Container sx={{ height: '100vh' }} maxWidth="sm">
      <Stack height="100%" justifyContent="center">
        <Paper elevation={3}>
          <Box>
            <AppBar position="static">
              <Tabs
                value={tabValue}
                onChange={(_, newValue: number) => setTabValue(newValue)}
                variant="scrollable"
                allowScrollButtonsMobile
              >
                <Tab label="Login" />
                <Tab label="Register" />
              </Tabs>
            </AppBar>
            <Box p={2}>{tabValue === 0 ? <LoginForm /> : <RegisterForm />}</Box>
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
}
