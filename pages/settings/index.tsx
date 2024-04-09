import { LoadingButton } from '@mui/lab';
import { Autocomplete, Grid, Paper, Switch, TextField, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import getConfig from 'next/config';
import React, { JSX, useEffect, useState } from 'react';

import { PageContainer } from '@/components/page-container';
import { Toast } from '@/components/toast';
import { StatusTypes } from '@/constants/general';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import { getMember, updateMemberSettings } from '@/slices/memberSlice';
import { SliceItem } from '@/types/common';
import { Theme } from '@/types/enum';
import { MemberResponse } from '@/types/member';

export default function Settings(): JSX.Element {
  const dispatch = useAppDispatch();
  const { publicRuntimeConfig } = getConfig();
  const {
    data: { membersettings },
    status: statusMember,
    error: errorMember
  } = useAppSelector((state: RootState): SliceItem<MemberResponse> => state.memberSlice.member);
  const { data: themes } = useAppSelector((state: RootState): SliceItem<Theme[]> => state.enumSlice.themes);
  const [openErrorToast, setOpenErrorToast] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [usePantry, setUsePantry] = useState<boolean>(false);
  const [useNegativePantry, setUseNegativePantry] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [hasContentChanged, setHasContentChanged] = useState<boolean>(false);

  const isLoadingMember = statusMember === StatusTypes.Pending;
  const isErrorMember = statusMember === StatusTypes.Rejected;

  useEffect(() => {
    if (isErrorMember) {
      setOpenErrorToast(true);
    }
  }, [isErrorMember]);

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

    try {
      setIsUpdating(true);

      await dispatch(updateMemberSettings({ body }));
      dispatch(getMember());
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <PageContainer>
      <Toast
        open={openErrorToast}
        onClose={() => setOpenErrorToast(false)}
        severity="error"
        message={errorMember?.message ?? ''}
      />
      <Paper classes={{ root: 'main' }}>
        <Grid container spacing={2} alignItems="center" className="mb-3">
          <Grid item xs={6}>
            <Typography variant="body1">Theme</Typography>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              className="w-full"
              options={themes}
              getOptionLabel={(option) => option.value ?? ''}
              value={theme || []}
              renderInput={(params) => <TextField {...params} />}
              disableClearable
              onChange={(_, selectedOption) => setTheme(selectedOption)}
            />
          </Grid>
        </Grid>
        {publicRuntimeConfig?.ENABLE_PANTRY && (
          <>
            <Grid container spacing={2} alignItems="center" className="mb-3">
              <Grid item xs={6}>
                <Typography variant="body1">Use Pantry Stock</Typography>
              </Grid>
              <Grid item xs={6}>
                <Switch aria-label="pantry stock" checked={usePantry} onChange={() => setUsePantry(!usePantry)} />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mb-3">
              <Grid item xs={6}>
                <Typography variant="body1">Allow Negative Pantry Stock</Typography>
              </Grid>
              <Grid item xs={6}>
                <Switch
                  aria-label="negative pantry stock"
                  checked={useNegativePantry}
                  onChange={() => setUseNegativePantry(!useNegativePantry)}
                />
              </Grid>
            </Grid>
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
