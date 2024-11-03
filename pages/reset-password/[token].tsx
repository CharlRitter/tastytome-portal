import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { FormEvent, JSX, useEffect, useState } from 'react';

import { useAppDispatch } from '@/reducers/hooks';
import { confirmResetMemberPassword } from '@/slices/memberSlice';
import { LoadingButton } from '@mui/lab';
import { passwordStrength } from 'check-password-strength';
import { interpolateColor } from '@/utils/common';
import { Toast, ToastParams } from '@/components/toast';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export default function ResetPassword(): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastParams>({ open: false, message: '', severity: 'error' });

  const strength = passwordStrength(newPassword);
  const strengthPercentage = strength.id / 3;
  const strengthColour = interpolateColor(theme.palette.secondary.main, theme.palette.primary.main, strengthPercentage);
  const strengthBackgroundColour = interpolateColor(
    theme.palette.secondary.main,
    theme.palette.primary.main,
    strengthPercentage,
    0.5
  );
  const canSubmit = newPassword && confirmPassword;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { token } = router.query;

    if (!token || Array.isArray(token)) {
      router.push('/');
    } else {
      setToken(token);
    }
  }, [setToken, router]);

  async function handleResetPassword(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    const action = await dispatch(
      confirmResetMemberPassword({
        token,
        body: { newPassword }
      })
    );

    if (isRejectedWithValue(action)) {
      setToast({
        open: true,
        message: `Error ressting password - ${action.error.message}`,
        severity: 'error'
      });
    } else {
      router.push('/recipes');
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
              <FormControl className="w-full" component="form" onSubmit={(event) => handleResetPassword(event)}>
                <Typography variant="h5" gutterBottom>
                  Password Reset
                </Typography>
                <TextField
                  label="New Password"
                  fullWidth
                  margin="normal"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
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
                  className="mt-2 mb-1"
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  disabled={!canSubmit}
                  loading={isLoading}
                >
                  Reset Password
                </LoadingButton>
                <Button type="button" variant="text" color="secondary" onClick={() => router.push('/')}>
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
