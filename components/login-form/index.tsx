import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, FormControl, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FormEvent, JSX, useState } from 'react';

import { useAppDispatch } from '@/reducers/hooks';
import { loginMember } from '@/slices/memberSlice';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleDecodedCredentials } from '@/types/google';
import { jwtDecode } from 'jwt-decode';
import { Toast, ToastParams } from '@/components/toast';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastParams>({ open: false, message: '', severity: 'error' });

  const canSubmit = emailAddress && password;

  async function dispatchLogin(emailAddress: string, password: string) {
    setIsLoading(true);

    const action = await dispatch(loginMember({ body: { emailaddress: emailAddress, password } }));

    if (isRejectedWithValue(action)) {
      setToast({ open: true, message: `Error while logging in - ${action.error.message}`, severity: 'error' });
    } else {
      router.push('/recipes');
    }

    setIsLoading(false);
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    dispatchLogin(emailAddress, password);
  }

  async function handleGoogleLogin(credential: string) {
    const decodedCredential: GoogleDecodedCredentials = jwtDecode(credential);

    dispatchLogin(decodedCredential.email, credential);
  }

  return (
    <>
      <Toast
        open={toast.open}
        onClose={() => setToast({ open: false, message: '', severity: 'error' })}
        severity={toast.severity}
        message={toast.message}
      />
      <FormControl className="w-full" component="form" onSubmit={(event) => handleLogin(event)}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Box>
          <Button className="float-right w-fit" variant="text" onClick={() => router.push('/reset-password')}>
            Forgot password?
          </Button>
        </Box>
        <LoadingButton
          className="mt-2"
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={!canSubmit}
          loading={isLoading}
        >
          Login
        </LoadingButton>
        <Divider className="my-3">OR</Divider>
        <GoogleLogin
          auto_select
          text="signin_with"
          onSuccess={(response) => response.credential && handleGoogleLogin(response.credential)}
        />
      </FormControl>
    </>
  );
}
