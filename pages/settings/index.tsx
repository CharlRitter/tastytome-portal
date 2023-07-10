import React, { ChangeEvent, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Grid, Paper, Switch, TextField, Typography } from '@mui/material';
import PageContainer from '@/components/pagecontainer';
import {
  setNegativePantryStock,
  setNutritionalInformation,
  setPantryStock,
  setThemeSetting,
  setMeasurementSystem
} from '@/slices/settings';
import globalStyles from '@/public/theme/global.module.scss';
import { SettingsRootState } from '@/types/settings';
import { MeasurementSystems } from '@/constants/measurements';
import { ThemeSettingOptions } from '@/constants/general';

export default function Settings() : ReactElement {
  const dispatch = useDispatch();
  const { theme, pantryStock, negativePantryStock, nutritionalInformation } = useSelector(
    (state: SettingsRootState) => state.settings
  );
  const measurementSystemOptions = Object.values(MeasurementSystems);
  const themeSettingOptions = Object.values(ThemeSettingOptions);

  return (
    <PageContainer>
      <Paper classes={{ root: 'main' }}>
        <Grid container spacing={2} alignItems="center" className={globalStyles['space-bottom']}>
          <Grid item xs={6}>
            <Typography variant="body1">Theme</Typography>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={themeSettingOptions}
              value={theme}
              onChange={(event: ChangeEvent<object>, selectedOption: string) =>
                dispatch(setThemeSetting(selectedOption))
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
              options={measurementSystemOptions}
              defaultValue={MeasurementSystems.Metric}
              onChange={(event: ChangeEvent<object>, selectedOption: string) =>
                dispatch(setMeasurementSystem(selectedOption))
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
