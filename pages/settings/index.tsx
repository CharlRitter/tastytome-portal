import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Grid, Paper, Switch, TextField, Typography } from '@mui/material';
import PageContainer from '@/components/pagecontainer';
import { THEMES, UNITS } from '@/constants/general';
import {
  setNegativePantryStock,
  setNutritionalInformation,
  setPantryStock,
  setTheme,
  setUnits
} from '@/slices/settings';
import globalStyles from '@/public/theme/global.module.scss';
import { AutocompleteOption } from '@/types/constants';
import { SettingsRootState } from '@/types/settings';

export default function Settings() {
  const dispatch = useDispatch();
  const { theme, pantryStock, negativePantryStock, nutritionalInformation } = useSelector(
    (state: SettingsRootState) => state.settings
  );

  return (
    <PageContainer>
      <Paper classes={{ root: 'main' }}>
        <Grid container spacing={2} alignItems="center" className={globalStyles['space-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">Theme</Typography>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={THEMES.options}
              value={THEMES.options[theme]}
              onChange={(event: ChangeEvent<object>, selectedOption: AutocompleteOption) =>
                dispatch(setTheme(selectedOption.value))
              }
              disableClearable
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" className={globalStyles['space-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">App Colour</Typography>
          </Grid>
          <Grid item xs={6}>
            {/* TODO */}
            <Autocomplete
              options={[]}
              disableClearable
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" className={globalStyles['space-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">Default Units</Typography>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={UNITS.options}
              defaultValue={UNITS.options[UNITS.mapping.metric]}
              onChange={(event: ChangeEvent<object>, selectedOption: AutocompleteOption) =>
                dispatch(setUnits(selectedOption.value))
              }
              disableClearable
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" className={globalStyles['space-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">Pantry Stock</Typography>
          </Grid>
          <Grid item xs={6}>
            <Switch
              aria-label="pantry stock"
              checked={pantryStock}
              onChange={() => dispatch(setPantryStock(!pantryStock))}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" className={globalStyles['space-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">Negative Pantry Stock</Typography>
          </Grid>
          <Grid item xs={6}>
            <Switch
              aria-label="negative pantry stock"
              checked={negativePantryStock}
              onChange={() => dispatch(setNegativePantryStock(!negativePantryStock))}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" className={globalStyles['space-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">Nutritional Information</Typography>
          </Grid>
          <Grid item xs={6}>
            <Switch
              aria-label="nutritional information"
              checked={nutritionalInformation}
              onChange={() => dispatch(setNutritionalInformation(!nutritionalInformation))}
            />
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}
