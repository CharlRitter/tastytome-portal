import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import React, { JSX, ReactNode, useEffect } from 'react';

import { SideMenu } from '@/components/side-menu';
import { DRAWER_WIDTH } from '@/constants/general';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import {
  getCategories,
  getMeasurementSystems,
  getMeasurementTypes,
  getMeasurementUnits,
  getThemes
} from '@/slices/enumSlice';
import { getMember, logoutMember } from '@/slices/memberSlice';
import { SliceItem } from '@/types/common';
import { EnumState } from '@/types/enum';
import { MemberResponse } from '@/types/member';
import { googleLogout } from '@react-oauth/google';

export type PageContainerProps = {
  children: ReactNode;
};

export function PageContainer(props: PageContainerProps): JSX.Element {
  const { children } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: member } = useAppSelector((state: RootState): SliceItem<MemberResponse> => state.memberSlice.member);
  const { categories, measurementsystems, measurementtypes, measurementunits, themes } = useAppSelector(
    (state: RootState): EnumState => state.enumSlice
  );

  useEffect(() => {
    const fetchData = async () => {
      const hasToken = sessionStorage.getItem('jwtToken');

      if (!hasToken) {
        await dispatch(logoutMember());
        googleLogout();

        router.push('/');
      } else {
        // TODO: Add error handling for this.
        if (member.id === 0) {
          dispatch(getMember());
        }
        if (categories.data.length === 0) {
          dispatch(getCategories());
        }
        if (measurementsystems.data.length === 0) {
          dispatch(getMeasurementSystems());
        }
        if (measurementtypes.data.length === 0) {
          dispatch(getMeasurementTypes());
        }
        if (measurementunits.data.length === 0) {
          dispatch(getMeasurementUnits());
        }
        if (themes.data.length === 0) {
          dispatch(getThemes());
        }
      }
    };

    fetchData();

    return () => {};
  }, [
    categories.data.length,
    dispatch,
    measurementsystems.data.length,
    measurementtypes.data.length,
    measurementunits.data.length,
    member.id,
    router,
    themes.data.length
  ]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: '99px',
        ml: { sm: `${DRAWER_WIDTH}px` },
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
      }}
    >
      <Container maxWidth="xl">
        <SideMenu drawerWidth={DRAWER_WIDTH} />
        {children}
      </Container>
    </Box>
  );
}
