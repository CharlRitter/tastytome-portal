import { LoadingButton } from '@mui/lab';
import { Alert, AppBar, Box, Button, Container, FormControl, Paper, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FormEvent, JSX, useState } from 'react';

import { StatusTypes } from '@/constants/general';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import { resetMemberPassword } from '@/slices/memberSlice';
import { SliceItem } from '@/types/common';
import { MemberResponse } from '@/types/member';

export default function ForgotPassword(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status: memberStatus } = useAppSelector(
    (state: RootState): SliceItem<MemberResponse> => state.memberSlice.member
  );
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasReset, setHasReset] = useState<boolean>(false);

  async function handleForgotPassword(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);
      await dispatch(resetMemberPassword({ body: { emailaddress: emailAddress } }));

      if (memberStatus === StatusTypes.Fulfilled) {
        setHasReset(true);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container sx={{ height: '100vh' }} maxWidth="sm">
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
                <Button type="button" className='mt-3' variant="text" color="secondary" onClick={() => router.push('/')}>
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
