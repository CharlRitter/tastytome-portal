import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Autocomplete, Grid, Paper, Switch, TextField, Typography } from '@mui/material';
import PageContainer from '@/components/pagecontainer';
import { THEMES, UNITS } from '@/constants/general';
import { AutocompleteOption } from '@/constants/types';
import { setIsDarkMode } from '@/slices/theme';
import globalStyles from '@/public/theme/global.module.scss';

export default function Settings() {
  const dispatch = useDispatch();
  const isSystemDarkMode =
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [pantryStock, setPantryStock] = useState<boolean>(true);
  const [negativePantryStock, setNegativePantryStock] = useState<boolean>(true);
  const [nutritionalInformation, setNutritionalInformation] = useState<boolean>(true);

  return (
    <PageContainer>
      <Paper classes={{ root: 'main' }}>
        <Grid container spacing={2} alignItems="center" className={globalStyles['gap-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">Theme</Typography>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={THEMES}
              defaultValue={THEMES[0]}
              onChange={(event: ChangeEvent<object>, selectedOption: AutocompleteOption) =>
                dispatch(
                  setIsDarkMode(
                    selectedOption.value === THEMES[0].value ?
                      isSystemDarkMode :
                      selectedOption.value === THEMES[1].value
                  )
                )
              }
              disableClearable
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" className={globalStyles['gap-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">Default Units</Typography>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={UNITS}
              defaultValue={UNITS[0]}
              disableClearable
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" className={globalStyles['gap-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">Pantry Stock</Typography>
          </Grid>
          <Grid item xs={6}>
            <Switch aria-label="pantry stock" checked={pantryStock} onChange={() => setPantryStock(!pantryStock)} />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" className={globalStyles['gap-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">Negative Pantry Stock</Typography>
          </Grid>
          <Grid item xs={6}>
            <Switch
              aria-label="negative pantry stock"
              checked={negativePantryStock}
              onChange={() => setNegativePantryStock(!negativePantryStock)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" className={globalStyles['gap-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">Nutritional Information</Typography>
          </Grid>
          <Grid item xs={6}>
            <Switch
              aria-label="nutritional information"
              checked={nutritionalInformation}
              onChange={() => setNutritionalInformation(!nutritionalInformation)}
            />
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}
