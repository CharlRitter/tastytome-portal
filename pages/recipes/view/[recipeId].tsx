import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { JSX, useEffect, useState } from 'react';
import { FaArrowLeft, FaBookmark, FaCopy, FaEdit, FaRegBookmark, FaTrash } from 'react-icons/fa';
import { TbRectangle, TbRectangleFilled } from 'react-icons/tb';

import { EllipsisLoader } from '@/components/ellipsis-loader';
import { PageContainer } from '@/components/page-container';
import { RecipeTabPanel } from '@/components/recipe-tab-panel';
import { Timer } from '@/components/timer';
import { Toast, ToastParams } from '@/components/toast';
import { EffortRating, StyledRating } from '@/components/styled-components';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import { clearRecipe, deleteRecipe, getRecipe, removeRecipes, updateRecipe } from '@/slices/recipeSlice';
import { SliceItem } from '@/types/common';
import { RecipeResponse } from '@/types/recipe';
import { formatDate } from '@/utils/common';

import { LoadingStack } from '../styled';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export default function RecipeView(): JSX.Element {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { data: recipe } = useAppSelector((state: RootState): SliceItem<RecipeResponse> => state.recipeSlice.recipe);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastParams>({ open: false, message: '', severity: 'error' });
  const isMD = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    async function handleGetRecipe(recipeId: string) {
      const action = await dispatch(getRecipe({ recipeId: parseInt(recipeId, 10) }));

      if (isRejectedWithValue(action)) {
        setToast({
          open: true,
          message: `Error retriving recipe - ${action.error.message}`,
          severity: 'error'
        });
      }
    }

    if (!router.isReady) {
      return;
    }
    const { recipeId } = router.query;

    if (!recipeId || Array.isArray(recipeId) || Number.isNaN(parseInt(recipeId, 10))) {
      router.push('/recipes');
    } else {
      setIsLoading(true);
      handleGetRecipe(recipeId);
      setIsLoading(false);
    }
  }, [dispatch, router]);

  useEffect(
    () => () => {
      dispatch(clearRecipe());
    },
    [dispatch]
  );

  async function dispatchDelete() {
    if (recipe.id) {
      setIsDeleting(true);
      setDeleteConfirmation(false);

      const action = await dispatch(deleteRecipe({ recipeId: recipe.id }));

      if (isRejectedWithValue(action)) {
        setToast({
          open: true,
          message: `Error deleting recipe - ${action.error.message}`,
          severity: 'error'
        });
      } else {
        dispatch(removeRecipes(recipe.id));
      }
      setIsDeleting(false);
    }
  }

  async function dispatchUpdate() {
    if (recipe.id) {
      setIsLoading(true);
      const action = await dispatch(updateRecipe({ recipeId: recipe.id, body: { bookmarked: !recipe.bookmarked } }));

      if (isRejectedWithValue(action)) {
        setToast({
          open: true,
          message: `Error updating recipe - ${action.error.message}`,
          severity: 'error'
        });
      } else {
        const secondaryAction = await dispatch(getRecipe({ recipeId: recipe.id }));

        if (isRejectedWithValue(secondaryAction)) {
          setToast({
            open: true,
            message: `Error retriving recipe - ${secondaryAction.error.message}`,
            severity: 'error'
          });
        }
      }

      setIsLoading(false);
    }
  }

  return (
    <PageContainer>
      <Toast
        open={toast.open}
        onClose={() => setToast({ open: false, message: '', severity: 'error' })}
        severity={toast.severity}
        message={toast.message}
      />
      <Dialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete this recipe? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <LoadingButton onClick={() => dispatchDelete()} autoFocus loading={isDeleting} disabled={isDeleting}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Paper classes={{ root: 'main' }}>
        {isLoading ? (
          <LoadingStack className="w-full" justifyContent="center" alignItems="center">
            <EllipsisLoader />
          </LoadingStack>
        ) : (
          <>
            <Stack className="mb-4" direction="row" justifyContent="space-between" spacing={2}>
              <Stack direction="row">
                <IconButton
                  color="primary"
                  aria-label="back"
                  onClick={() => {
                    if (window.history.length === 1) {
                      router.push('/recipes');
                    } else {
                      router.back();
                    }
                  }}
                >
                  <FaArrowLeft />
                </IconButton>
              </Stack>
              <Stack direction="row">
                <IconButton color="primary" aria-label="edit" onClick={() => dispatchUpdate()}>
                  {recipe.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </IconButton>
                <IconButton color="primary" aria-label="edit" onClick={() => router.push(`/recipes/edit/${recipe.id}`)}>
                  <FaEdit />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="duplicate"
                  onClick={() => router.push(`/recipes/add/${recipe.id}`)}
                >
                  <FaCopy />
                </IconButton>
                <IconButton color="primary" aria-label="delete" onClick={() => setDeleteConfirmation(true)}>
                  <FaTrash />
                </IconButton>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" color={theme.palette.common.white}>
                {recipe.title}
              </Typography>
              <Typography>{recipe.createdat && formatDate(recipe.createdat)}</Typography>
            </Stack>
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>{recipe.description}</Typography>
            <Stack direction="row" justifyContent="space-between" className="mb-4">
              <StyledRating name="read-only" value={recipe.rating} readOnly size="large" />
              <EffortRating
                name="read-only"
                value={recipe.effort}
                readOnly
                size="large"
                icon={<TbRectangleFilled />}
                emptyIcon={<TbRectangle />}
                max={3}
              />
            </Stack>
            {recipe.recipecategory.map((recipeCategory) => (
              <Chip className="mr-1" key={recipeCategory.id} label={recipeCategory.category.value} variant="outlined" />
            ))}
            <Stack direction={isMD ? 'row' : 'column'}>
              <Tabs
                value={currentTab}
                onChange={(event: React.SyntheticEvent, newValue: number) => {
                  setCurrentTab(newValue);
                }}
                aria-label="recipe tabs"
                orientation={isMD ? 'vertical' : 'horizontal'}
              >
                <Tab label="Ingredients" id="recipe-tab-0" aria-controls="recipe ingredients" />
                <Tab label="Instructions" id="recipe-tab-1" aria-controls="recipe instructions" />
                <Tab label="Timers" id="recipe-tab-2" aria-controls="recipe timers" />
              </Tabs>
              <RecipeTabPanel value={currentTab} index={0}>
                {recipe.recipeingredient.map((ingredient) => {
                  const measurementunit =
                    ingredient.measurementtypeid !== 1 &&
                    ingredient.measurementamount &&
                    ingredient.measurementamount <= 1
                      ? ingredient.measurementunit?.value.slice(0, ingredient.measurementunit.value.length - 1)
                      : ingredient.measurementunit?.value;
                  let conversions = '';

                  if (ingredient.measurementunit.conversionfactor) {
                    const convertedAmount = (
                      ingredient.measurementamount * parseFloat(ingredient.measurementunit.conversionfactor)
                    ).toFixed(2);

                    // Volume
                    if (ingredient.measurementtypeid === 4) {
                      // To millilitres
                      if (ingredient.measurementunit.measurementsystemid === 2) {
                        conversions = ` (${convertedAmount} ml)`;
                      }
                      // To fluid ounces
                      else if (ingredient.measurementunit.measurementsystemid === 1) {
                        conversions = ` (${convertedAmount} fl oz)`;
                      }
                      // To millilitres & fluid ounces
                      else {
                        const convertedFluidOunceAmount = (
                          ingredient.measurementamount *
                          parseFloat(ingredient.measurementunit.conversionfactor) *
                          0.033814
                        ) // TODO Get this from database
                          .toFixed(2);

                        conversions = ` (${convertedAmount} ml) (${convertedFluidOunceAmount} fl oz)`;
                      }
                    }
                    // Weight
                    else if (ingredient.measurementtypeid === 5) {
                      // To grams
                      if (ingredient.measurementunit.measurementsystemid === 2) {
                        conversions = ` (${convertedAmount} g)`;
                      }
                      // To ounces
                      else if (ingredient.measurementunit.measurementsystemid === 1) {
                        conversions = ` (${convertedAmount} oz)`;
                      }
                    }
                    // Temperature
                    else if (ingredient.measurementtypeid === 2) {
                      // To Celsius
                      if (ingredient.measurementunit.measurementsystemid === 2) {
                        conversions = ` (${convertedAmount} °C)`;
                      }
                      // To Fahrenheit
                      else if (ingredient.measurementunit.measurementsystemid === 1) {
                        conversions = ` (${(ingredient.measurementamount - 32) * (5 / 9)} °F)`;
                      }
                    }
                  }

                  return (
                    <Box key={`ingredient-${ingredient.id}`} className={`${isMD && 'px-4'}`}>
                      <Box className="py-4">
                        <Typography>{`${ingredient.measurementamount} ${measurementunit} ${ingredient.title}${conversions}`}</Typography>
                      </Box>
                      <Divider />
                    </Box>
                  );
                })}
              </RecipeTabPanel>
              <RecipeTabPanel value={currentTab} index={1}>
                {recipe.recipeinstruction.map((instruction, index) => (
                  <Box key={`instruction-${instruction.id}`} className={`${isMD && 'px-4'}`}>
                    <Box className="py-4">
                      <Typography className="mb-2">Step {index + 1}</Typography>
                      <Typography>{instruction.title}</Typography>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </RecipeTabPanel>
              <RecipeTabPanel value={currentTab} index={2}>
                {recipe.recipetimer.map((timer) => (
                  <Box key={`timer-${timer.id}`} className={`${isMD && 'px-4'}`}>
                    <Box className="py-4">
                      <Timer timer={timer} />
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </RecipeTabPanel>
            </Stack>
          </>
        )}
      </Paper>
    </PageContainer>
  );
}
