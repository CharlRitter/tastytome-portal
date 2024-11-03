import { LoadingButton } from '@mui/lab';
import { Divider, FormControl, LinearProgress, TextField, Typography, useTheme } from '@mui/material';
import { passwordStrength } from 'check-password-strength';
import { useRouter } from 'next/router';
import React, { FormEvent, JSX, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { useAppDispatch } from '@/reducers/hooks';
import { createMember } from '@/slices/memberSlice';
import { interpolateColor } from '@/utils/common';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { GoogleDecodedCredentials } from '@/types/google';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { Toast, ToastParams } from '@/components/toast';

export function RegisterForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastParams>({ open: false, message: '', severity: 'error' });

  const strength = passwordStrength(password);
  const strengthPercentage = strength.id / 3;
  const strengthColour = interpolateColor(theme.palette.secondary.main, theme.palette.primary.main, strengthPercentage);
  const strengthBackgroundColour = interpolateColor(
    theme.palette.secondary.main,
    theme.palette.primary.main,
    strengthPercentage,
    0.5
  );
  const canSubmit = emailAddress && firstName && lastName && password && confirmPassword;

  async function dispatchRegister(emailAddress: string, firstName: string, lastName: string, password: string) {
    setIsLoading(true);

    const action = await dispatch(
      createMember({
        body: {
          emailaddress: emailAddress,
          firstname: firstName,
          lastname: lastName,
          password
        }
      })
    );

    if (isRejectedWithValue(action)) {
      setToast({
        open: true,
        message: `Error creating member - ${action.error.message}`,
        severity: 'error'
      });
    } else {
      router.push('/recipes');
    }

    setIsLoading(false);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    dispatchRegister(emailAddress, firstName, lastName, password);
  }

  async function handleGoogleRegister(credential: string) {
    const decodedCredential: GoogleDecodedCredentials = jwtDecode(credential);

    dispatchRegister(decodedCredential.email, decodedCredential.given_name, decodedCredential.family_name, credential);
  }

  return (
    <>
      <Toast
        open={toast.open}
        onClose={() => setToast({ open: false, message: '', severity: 'error' })}
        severity={toast.severity}
        message={toast.message}
      />
      <FormControl className="w-full" component="form" onSubmit={(event) => handleRegister(event)}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          label="Surname"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
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
        <LinearProgress
          variant="determinate"
          value={strengthPercentage * 100}
          sx={{
            backgroundColor: strengthBackgroundColour,
            '& .MuiLinearProgress-bar': {
              backgroundColor: strengthColour
            }
          }}
        />
        <Typography className="mt-1 flex justify-end" sx={{ color: strengthColour }}>
          {strength.value}
        </Typography>
        <TextField
          label="Confirm Password"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <LoadingButton
          className="mt-2"
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={!canSubmit}
          loading={isLoading}
        >
          Register
        </LoadingButton>
        <Divider className="my-3">OR</Divider>
        <GoogleLogin
          auto_select
          text="signup_with"
          onSuccess={(credentialResponse: CredentialResponse) =>
            credentialResponse.credential && handleGoogleRegister(credentialResponse.credential)
          }
        />
      </FormControl>
    </>
  );
}
