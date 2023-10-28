import { LoadingButton } from '@mui/lab';
import { FormControl, LinearProgress, TextField, Typography, useTheme } from '@mui/material';
import { passwordStrength } from 'check-password-strength';
import { useRouter } from 'next/router';
import React, { FormEvent, JSX, useState } from 'react';

import { StatusTypes } from '@/constants/general';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import { createMember } from '@/slices/memberSlice';
import { SliceItem } from '@/types/common';
import { MemberResponse } from '@/types/member';
import { interpolateColor } from '@/utils/common';

export function RegisterForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const router = useRouter();
  const { status: memberStatus } = useAppSelector(
    (state: RootState): SliceItem<MemberResponse> => state.memberSlice.member
  );
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      setIsLoading(true);
      await dispatch(
        createMember({
          body: {
            emailaddress: emailAddress,
            firstname: firstName,
            lastname: lastName,
            password
          }
        })
      );

      if (memberStatus === StatusTypes.Fulfilled) {
        router.push('/recipes');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
    </FormControl>
  );
}
