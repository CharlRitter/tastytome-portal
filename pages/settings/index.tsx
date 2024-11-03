import { LoadingButton } from '@mui/lab';
import { Autocomplete, Grid2, Paper, Switch, TextField, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import getConfig from 'next/config';
import React, { JSX, useEffect, useState } from 'react';

import { PageContainer } from '@/components/page-container';
import { Toast, ToastParams } from '@/components/toast';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import { getMember, updateMemberSettings } from '@/slices/memberSlice';
import { SliceItem } from '@/types/common';
import { Theme } from '@/types/enum';
import { MemberResponse } from '@/types/member';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export default function Settings(): JSX.Element {
  const dispatch = useAppDispatch();
  const { publicRuntimeConfig } = getConfig();
  const {
    data: { membersettings }
  } = useAppSelector((state: RootState): SliceItem<MemberResponse> => state.memberSlice.member);
  const { data: themes } = useAppSelector((state: RootState): SliceItem<Theme[]> => state.enumSlice.themes);
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [usePantry, setUsePantry] = useState<boolean>(false);
  const [useNegativePantry, setUseNegativePantry] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [hasContentChanged, setHasContentChanged] = useState<boolean>(false);
  const [isLoadingMember, setIsLoadingMember] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastParams>({ open: false, message: '', severity: 'error' });

  useEffect(() => {
    setTheme(membersettings.theme);
    setUsePantry(membersettings.usepantry);
    setUseNegativePantry(membersettings.usenegativepantry);
  }, [membersettings]);

  useEffect(() => {
    if (
      isEqual(theme, membersettings.theme) &&
      usePantry === membersettings.usepantry &&
      useNegativePantry === membersettings.usenegativepantry
    ) {
      setHasContentChanged(false);
    } else {
      setHasContentChanged(true);
    }
  }, [
    membersettings.theme,
    membersettings.usenegativepantry,
    membersettings.usepantry,
    theme,
    useNegativePantry,
    usePantry
  ]);

  async function dispatchSubmit() {
    const body = {
      themeid: theme.id,
      usepantry: usePantry,
      usenegativepantry: useNegativePantry
    };

    setIsUpdating(true);

    const action = await dispatch(updateMemberSettings({ body }));

    if (isRejectedWithValue(action)) {
      setToast({
        open: true,
        message: `Error updating settings - ${action.error.message}`,
        severity: 'error'
      });
    } else {
      setIsLoadingMember(true);
      const secondaryAction = await dispatch(getMember());

      if (isRejectedWithValue(secondaryAction)) {
        setToast({
          open: true,
          message: `Error retrieving member - ${secondaryAction.error.message}`,
          severity: 'error'
        });
      }

      setIsLoadingMember(false);
    }

    setIsUpdating(false);
  }

  return (
    <PageContainer>
      <Toast
        open={toast.open}
        onClose={() => setToast({ open: false, message: '', severity: 'error' })}
        severity={toast.severity}
        message={toast.message}
      />
      <Paper classes={{ root: 'main' }}>
        <Grid2 container spacing={2} alignItems="center" className="mb-3">
          <Grid2 size={{ xs: 6 }}>
            <Typography variant="body1">Theme</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Autocomplete
              className="w-full"
              options={themes}
              getOptionLabel={(option) => option.value ?? ''}
              value={theme || []}
              renderInput={(params) => <TextField {...params} />}
              disableClearable
              onChange={(_, selectedOption) => setTheme(selectedOption)}
            />
          </Grid2>
        </Grid2>
        {publicRuntimeConfig?.ENABLE_PANTRY && (
          <>
            <Grid2 container spacing={2} alignItems="center" className="mb-3">
              <Grid2 size={{ xs: 6 }}>
                <Typography variant="body1">Use Pantry Stock</Typography>
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Switch aria-label="pantry stock" checked={usePantry} onChange={() => setUsePantry(!usePantry)} />
              </Grid2>
            </Grid2>
            <Grid2 container spacing={2} alignItems="center" className="mb-3">
              <Grid2 size={{ xs: 6 }}>
                <Typography variant="body1">Allow Negative Pantry Stock</Typography>
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Switch
                  aria-label="negative pantry stock"
                  checked={useNegativePantry}
                  onChange={() => setUseNegativePantry(!useNegativePantry)}
                />
              </Grid2>
            </Grid2>
          </>
        )}
        <LoadingButton
          type="button"
          variant="contained"
          disabled={isLoadingMember || !hasContentChanged}
          loading={isLoadingMember && isUpdating}
          onClick={() => dispatchSubmit()}
        >
          Update
        </LoadingButton>
      </Paper>
    </PageContainer>
  );
}
