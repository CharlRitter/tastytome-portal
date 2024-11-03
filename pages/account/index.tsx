import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import React, { FormEvent, JSX, useState } from 'react';

import { PageContainer } from '@/components/page-container';
import { useAppDispatch } from '@/reducers/hooks';
import { logoutMember, updateMemberPassword } from '@/slices/memberSlice';
import { interpolateColor } from '@/utils/common';
import { FormControl, Typography, TextField, LinearProgress, useTheme, Snackbar, Slide, Alert } from '@mui/material';
import { passwordStrength } from 'check-password-strength';
import { googleLogout } from '@react-oauth/google';
import { Toast, ToastParams } from '@/components/toast';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export default function Account(): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);
  const [isLoadingPasswordUpdate, setIsLoadingPasswordUpdate] = useState<boolean>(false);
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
  const canSubmit = newPassword && currentPassword;

  async function logout() {
    setIsLoadingLogout(true);
    const action = await dispatch(logoutMember());

    if (isRejectedWithValue(action)) {
      setToast({
        open: true,
        message: `Error logging out - ${action.error.message}`,
        severity: 'error'
      });
    } else {
      googleLogout();
      router.push('/');
    }
    setIsLoadingLogout(false);
  }

  async function handleUpdatePassword(event: FormEvent) {
    event.preventDefault();
    setIsLoadingPasswordUpdate(true);
    const action = await dispatch(updateMemberPassword({ body: { currentPassword, newPassword } }));

    if (isRejectedWithValue(action)) {
      setToast({
        open: true,
        message: `Error updating password - ${action.error.message}`,
        severity: 'error'
      });
    } else {
      setToast({
        open: true,
        message: 'Password updated successfully',
        severity: 'success'
      });
    }

    setIsLoadingPasswordUpdate(false);
  }

  return (
    <PageContainer>
      <Toast
        open={toast.open}
        onClose={() => setToast({ open: false, message: '', severity: 'error' })}
        severity={toast.severity}
        message={toast.message}
      />
      <LoadingButton type="button" variant="contained" color="error" loading={isLoadingLogout} onClick={() => logout()}>
        Logout
      </LoadingButton>

      <FormControl className="w-full mt-2" component="form" onSubmit={(event) => handleUpdatePassword(event)}>
        <Typography variant="h5" gutterBottom>
          Update Password
        </Typography>
        <TextField
          label="Current Password"
          fullWidth
          margin="normal"
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
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
        <LoadingButton
          className="mt-2 mb-1"
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={!canSubmit}
          loading={isLoadingPasswordUpdate}
        >
          Update Password
        </LoadingButton>
      </FormControl>
    </PageContainer>
  );
}
