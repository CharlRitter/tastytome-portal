import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import React, { FormEvent, JSX, useState } from 'react';

import { PageContainer } from '@/components/page-container';
import { StatusTypes } from '@/constants/general';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import { logoutMember, updateMemberPassword } from '@/slices/memberSlice';
import { SliceItem } from '@/types/common';
import { MemberResponse } from '@/types/member';
import { interpolateColor } from '@/utils/common';
import { FormControl, Typography, TextField, LinearProgress, useTheme, Snackbar, Slide, Alert } from '@mui/material';
import { passwordStrength } from 'check-password-strength';

export default function Account(): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const router = useRouter();
  const { status: memberStatus } = useAppSelector(
    (state: RootState): SliceItem<MemberResponse> => state.memberSlice.member
  );
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);
  const [isLoadingPasswordUpdate, setIsLoadingPasswordUpdate] = useState<boolean>(false);
  const [openToast, setOpenToast] = React.useState<boolean>(false);

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
    try {
      setIsLoadingLogout(true);
      await dispatch(logoutMember());

      if (memberStatus === StatusTypes.Fulfilled) {
        router.push('/');
      }
    } finally {
      setIsLoadingLogout(false);
    }
  }

  async function handleUpdatePassword(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoadingPasswordUpdate(true);
      await dispatch(updateMemberPassword({ body: { currentPassword, newPassword } }));

      if (memberStatus === StatusTypes.Fulfilled) {
        setOpenToast(true);
      }
    } finally {
      setIsLoadingPasswordUpdate(false);
    }
  }

  return (
    <PageContainer>
      <Snackbar
        open={openToast}
        autoHideDuration={5000}
        onClose={() => setOpenToast(false)}
        TransitionComponent={Slide}
      >
        <Alert onClose={() => setOpenToast(false)} severity="success">
          Password Updated
        </Alert>
      </Snackbar>
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
