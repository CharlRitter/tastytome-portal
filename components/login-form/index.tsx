import { LoadingButton } from '@mui/lab';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FormEvent, JSX, useState } from 'react';

import { StatusTypes } from '@/constants/general';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import { loginMember } from '@/slices/memberSlice';
import { SliceItem } from '@/types/common';
import { MemberResponse } from '@/types/member';

export function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status: memberStatus } = useAppSelector(
    (state: RootState): SliceItem<MemberResponse> => state.memberSlice.member
  );
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const canSubmit = emailAddress && password;

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);
      await dispatch(loginMember({ body: { emailaddress: emailAddress, password } }));

      if (memberStatus === StatusTypes.Fulfilled) {
        router.push('/recipes');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
        <Button className="float-right w-fit" variant="text">
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
    </FormControl>
  );
}
