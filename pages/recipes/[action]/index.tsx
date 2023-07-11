import React, { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import PageContainer from '@/components/pagecontainer';
import {
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Paper,
  Rating,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import RecipeItemsList from '@/components/recipeitemslist';
import { CategoryOptions, ListTypes } from '@/constants/general';
import { Recipe } from '@/types/recipes';
import { MeasurementSystems } from '@/constants/measurements';
import { ActionsAccordion } from '../styled';

export default function RecipeAction(): ReactElement {
  const router = useRouter();
  const { action } = router.query;
  const isViewMode = typeof action === 'string' && /^\d+$/.test(action);
  const isAddMode = action === 'add';
  const [recipe, setRecipe] = useState<Recipe>({
    id: null,
    title: '',
    description: '',
    categories: [],
    rating: 0,
    measurementSystem: MeasurementSystems.Metric,
    ingredients: [],
    instructions: [],
    timers: []
  });
  const [hasTimers, setHasTimers] = useState<boolean>(false);
  const categoryOptions = Object.values(CategoryOptions);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const canSubmit =
    !recipe.title ||
    !recipe.description ||
    isEmpty(recipe.categories) ||
    isEmpty(recipe.ingredients) ||
    recipe.ingredients.some(
      (item) => item.measurementType === null || item.measurementUnit === null || item.amount === null
    ) ||
    isEmpty(recipe.instructions) ||
    (!isEmpty(recipe.timers) && recipe.timers.some((item) => item.hours === null && item.minutes === null));

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function handleSetRecipe(updatedValue: Partial<Recipe>) {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ...updatedValue
    }));
  }

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!isViewMode && !isAddMode) {
      router.push('/recipes');
    }
  }, [isViewMode, isAddMode, router]);

  useEffect(() => {
    handleSetRecipe({ timers: [] });
  }, [hasTimers]);

  return (
    <PageContainer>
      <Paper classes={{ root: 'main' }} component="form" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <Stack direction={isMediumScreen ? 'column' : 'row'} spacing={1} justifyContent="space-between">
            <TextField
              label="Title"
              name="title"
              sx={{ width: isMediumScreen ? 'unset' : '80%' }}
              value={recipe.title}
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetRecipe({ title: event.target.value })}
              required
            />
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Rating:</Typography>
              <Rating
                value={recipe.rating}
                onChange={(event: ChangeEvent<HTMLInputElement>, value: number) => handleSetRecipe({ rating: value })}
                size="large"
              />
            </Stack>
          </Stack>
          <TextField
            label="Description"
            name="description"
            value={recipe.description}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetRecipe({ description: event.target.value })}
            multiline
            rows={2}
            required
          />
          <Autocomplete
            multiple
            limitTags={3}
            options={categoryOptions}
            value={recipe.categories}
            renderInput={(params) => <TextField {...params} label="Categories *" />}
            onChange={(event: ChangeEvent<HTMLInputElement>, value: string[]) => handleSetRecipe({ categories: value })}
          />

          <RecipeItemsList
            title="Ingredients *"
            items={recipe.ingredients}
            type={ListTypes.Ingredients}
            handleSetItems={(value) => handleSetRecipe({ ingredients: value })}
            label="ingredient"
          />
          <RecipeItemsList
            title="Instructions *"
            items={recipe.instructions}
            handleSetItems={(value) => handleSetRecipe({ instructions: value })}
            label="instruction"
          />
          <ActionsAccordion
            onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => setHasTimers(checked)}
            disableGutters
          >
            <AccordionSummary aria-label="add timers">
              <Typography>Add Timers</Typography>
              <Switch checked={hasTimers} />
            </AccordionSummary>
            <AccordionDetails>
              <RecipeItemsList
                title="Timers"
                items={recipe.timers}
                type={ListTypes.Timers}
                handleSetItems={(value) => handleSetRecipe({ timers: value })}
                label="timer"
              />
            </AccordionDetails>
          </ActionsAccordion>
          <Stack direction="row" spacing={2}>
            <Button type="button" variant="contained" color="secondary" onClick={() => router.push('/recipes')}>
              Cancel
            </Button>
            <Button type="button" variant="contained" disabled={canSubmit}>
              Add Recipe
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </PageContainer>
  );
}
