import { LoadingButton } from '@mui/lab';
import { Alert, AppBar, Box, Button, Container, FormControl, Paper, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FormEvent, JSX, useState } from 'react';

import { useAppDispatch } from '@/reducers/hooks';
import { resetMemberPassword } from '@/slices/memberSlice';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { Toast, ToastParams } from '@/components/toast';

export default function ForgotPassword(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasReset, setHasReset] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastParams>({ open: false, message: '', severity: 'error' });

  async function handleForgotPassword(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    const action = await dispatch(resetMemberPassword({ body: { emailaddress: emailAddress } }));

    if (isRejectedWithValue(action)) {
      setToast({
        open: true,
        message: `Error resetting password - ${action.error.message}`,
        severity: 'error'
      });
    } else {
      setHasReset(true);
    }

    setIsLoading(false);
  }

  return (
    <Container sx={{ height: '100vh' }} maxWidth="sm">
      <Toast
        open={toast.open}
        onClose={() => setToast({ open: false, message: '', severity: 'error' })}
        severity={toast.severity}
        message={toast.message}
      />
      <Stack height="100%" justifyContent="center">
        <Paper elevation={3}>
          <Box>
            <AppBar position="static" />
            <Box p={2}>
              <FormControl className="w-full" component="form" onSubmit={(event) => handleForgotPassword(event)}>
                <Typography variant="h5" gutterBottom>
                  Forgot Password
                </Typography>
                {hasReset ? (
                  <Alert severity="success">
                    You should receive an email shortly with further instructions. Don't see it? Be sure to check your
                    spam and junk folders.
                  </Alert>
                ) : (
                  <>
                    <Typography>Enter your email and we'll send you a link to reset your password.</Typography>
                    <TextField
                      label="Email"
                      fullWidth
                      margin="normal"
                      value={emailAddress}
                      onChange={(event) => setEmailAddress(event.target.value)}
                    />
                    <LoadingButton
                      className="mt-2"
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                      disabled={!emailAddress}
                      loading={isLoading}
                    >
                      Reset Password
                    </LoadingButton>
                  </>
                )}
                <Button
                  type="button"
                  className="mt-3"
                  variant="text"
                  color="secondary"
                  onClick={() => router.push('/')}
                >
                  Back to login
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
}
