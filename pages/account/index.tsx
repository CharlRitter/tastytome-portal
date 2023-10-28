import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import React, { JSX, useState } from 'react';

import { PageContainer } from '@/components/page-container';
import { StatusTypes } from '@/constants/general';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import { logoutMember } from '@/slices/memberSlice';
import { SliceItem } from '@/types/common';
import { MemberResponse } from '@/types/member';

export default function Account(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status: memberStatus } = useAppSelector(
    (state: RootState): SliceItem<MemberResponse> => state.memberSlice.member
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function logout() {
    try {
      setIsLoading(true);
      await dispatch(logoutMember());

      if (memberStatus === StatusTypes.Fulfilled) {
        router.push('/');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageContainer>
      <LoadingButton type="button" variant="contained" color="error" loading={isLoading} onClick={() => logout()}>
        Logout
      </LoadingButton>
    </PageContainer>
  );
}
