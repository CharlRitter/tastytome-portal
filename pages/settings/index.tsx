import React, { ChangeEvent, ReactElement } from 'react';
import { Autocomplete, Grid, Paper, Switch, TextField, Typography } from '@mui/material';
import PageContainer from '@/components/page-container';
import { SettingsRootState } from '@/types/settings';
// import { ThemeSettingOptions } from '@/constants/general';
// import {
//   setNegativePantryStock,
//   setNutritionalInformation,
//   setPantryStock,
//   setThemeSetting,
//   setMeasurementSystem
// } from '@/slices/settings';
// import { MeasurementSystems } from '@/constants/measurements';

export default function Settings(): ReactElement {
  // const dispatch = useAppDispatch();
  // const { theme, pantryStock, negativePantryStock, nutritionalInformation } = useAppSelector(
  //   (state: SettingsRootState):SliceItem<> => state.settings
  // );
  // const measurementSystemOptions = Object.values(MeasurementSystems);
  // const themeSettingOptions = Object.values(ThemeSettingOptions);

  return (
    <PageContainer>
      {/* <Paper classes={{ root: 'main' }}>
        <Grid container spacing={2} alignItems="center" className="mb-3">
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
        <Grid container spacing={2} alignItems="center" className="mb-3">
          <Grid item xs={6}>
            <Typography variant="body1">Measurement System</Typography>
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
        <Grid container spacing={2} alignItems="center" className="mb-3">
          <Grid item xs={6}>
            <Typography variant="body1">Use Pantry Stock</Typography>
          </Grid>
          <Grid item xs={6}>
            <Switch
              aria-label="pantry stock"
              checked={pantryStock}
              onChange={() => dispatch(setPantryStock(!pantryStock))}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" className="mb-3">
          <Grid item xs={6}>
            <Typography variant="body1">Allow Negative Pantry Stock</Typography>
          </Grid>
          <Grid item xs={6}>
            <Switch
              aria-label="negative pantry stock"
              checked={negativePantryStock}
              onChange={() => dispatch(setNegativePantryStock(!negativePantryStock))}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" className="mb-3">
          <Grid item xs={6}>
            <Typography variant="body1">Display Nutritional Information</Typography>
          </Grid>
          <Grid item xs={6}>
            <Switch
              aria-label="nutritional information"
              checked={nutritionalInformation}
              onChange={() => dispatch(setNutritionalInformation(!nutritionalInformation))}
            />
          </Grid>
        </Grid>
      </Paper> */}
    </PageContainer>
  );
}
