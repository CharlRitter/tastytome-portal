import {
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Fab,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import router from 'next/router';
import React, { ChangeEvent, JSX, MouseEvent, useEffect, useState } from 'react';
import { BsFillGridFill, BsFilter, BsList, BsPlus } from 'react-icons/bs';
import { TbRectangle, TbRectangleFilled } from 'react-icons/tb';
import { VscClose } from 'react-icons/vsc';
import InfiniteScroll from 'react-infinite-scroll-component';

import { EllipsisLoader } from '@/components/ellipsis-loader';
import { PageContainer } from '@/components/page-container';
import { RecipeCard } from '@/components/recipe-card';
import { Toast } from '@/components/toast';
import { StatusTypes } from '@/constants/general';
import { EffortRating, StyledRating } from '@/public/theme/globalStyled';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import { clearRecipes, getRecipes } from '@/slices/recipeSlice';
import { SliceItem } from '@/types/common';
import { Category } from '@/types/enum';
import { RecipeResponse } from '@/types/recipe';

import { ActionsAccordion, StickyWrapper } from './styled';

export default function Recipes(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { data: recipeCategories } = useAppSelector(
    (state: RootState): SliceItem<Category[]> => state.enumSlice.categories
  );
  const {
    data: recipes,
    status: statusRecipes,
    totalCount: recipeTotalCount,
    error: errorRecipes
  } = useAppSelector((state: RootState): SliceItem<RecipeResponse[]> => state.recipeSlice.recipes);

  const [isListLayout, setIsListLayout] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [effort, setEffort] = useState<number>(0);
  const [isDateAscending, setIsDateAscending] = useState<boolean>(false);
  const [openErrorToast, setOpenErrorToast] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const pageSize = 12;
  const isMoreRecipes = recipeTotalCount ? recipeTotalCount > page * pageSize : false;
  const isErrorRecipes = statusRecipes === StatusTypes.Rejected;

  useEffect(
    () => () => {
      dispatch(clearRecipes());
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(
      getRecipes({
        params: {
          categories: categories.map((category) => category.id).join(','),
          orderBy: isDateAscending ? 'asc' : 'desc',
          effort,
          rating,
          page,
          pageSize
        }
      })
    );
  }, [categories, dispatch, effort, isDateAscending, page, rating]);

  useEffect(() => {
    if (isErrorRecipes) {
      setOpenErrorToast(true);
    }
  }, [isErrorRecipes]);

  function handleClearFilters() {
    dispatch(clearRecipes());
    setPage(1);
    setCategories([]);
    setRating(0);
    setEffort(0);
    setIsDateAscending(false);
  }

  return (
    <PageContainer>
      <Toast
        open={openErrorToast}
        onClose={() => setOpenErrorToast(false)}
        severity="error"
        message={errorRecipes?.message ?? ''}
      />
      <StickyWrapper>
        <Paper className="p-3">
          <Stack justifyContent="space-between" alignItems="center" direction="row">
            <Stack direction="row">
              <ToggleButtonGroup
                aria-label="layout button group"
                className="mr-3"
                value={isListLayout}
                onChange={(event: MouseEvent<HTMLElement>, value: boolean) => setIsListLayout(value)}
                sx={{ display: { xs: 'none', md: 'block' } }}
                color="primary"
                exclusive
              >
                <ToggleButton className="p-3" aria-label="grid layout" value={false}>
                  <BsFillGridFill className="large-icon" />
                </ToggleButton>
                <ToggleButton className="p-3" aria-label="list layout" value>
                  <BsList className="large-icon" />
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                value={showFilters}
                exclusive
                color="primary"
                onClick={() => setShowFilters(!showFilters)}
              >
                <ToggleButton value aria-label="show filters">
                  <BsFilter className="large-icon" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Tooltip title="Add Recipe">
              <Fab color="primary" size="medium" aria-label="add recipe" onClick={() => router.push('/recipes/add')}>
                <BsPlus className="large-icon" />
              </Fab>
            </Tooltip>
          </Stack>
        </Paper>
        <ActionsAccordion expanded={showFilters} disableGutters className="p-0">
          <AccordionSummary className="hidden" />
          <AccordionDetails>
            <Stack direction="row" justifyContent="space-between" alignItems="center" className="px-3 pb-3 pt-0 gap-5">
              <Autocomplete
                multiple
                limitTags={3}
                options={recipeCategories}
                getOptionLabel={(option) => option.value}
                value={categories}
                renderInput={(params) => <TextField {...params} label="Categories" />}
                onChange={(_, value: Category[]) => {
                  dispatch(clearRecipes());
                  setPage(1);
                  setCategories(value);
                }}
                className="w-3/12"
              />
              <Stack direction="row" spacing={1}>
                <Typography component="legend" color={theme.palette.text.secondary}>
                  Rating
                </Typography>
                <StyledRating
                  value={rating}
                  onChange={(_, value: number | null) => {
                    dispatch(clearRecipes());
                    setPage(1);
                    setRating(value ?? 0);
                  }}
                  size="large"
                />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography component="legend" color={theme.palette.text.secondary}>
                  Difficulty
                </Typography>
                <EffortRating
                  value={effort}
                  onChange={(_, value: number | null) => {
                    dispatch(clearRecipes());
                    setPage(1);
                    setEffort(value ?? 0);
                  }}
                  size="large"
                  icon={<TbRectangleFilled />}
                  emptyIcon={<TbRectangle />}
                  max={3}
                />
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography component="legend" color={theme.palette.text.secondary}>
                  {isDateAscending ? 'Ascending' : 'Descending'}
                </Typography>
                <Switch
                  checked={isDateAscending}
                  onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    dispatch(clearRecipes());
                    setPage(1);
                    setIsDateAscending(checked);
                  }}
                />
              </Stack>
              <Tooltip title="Clear Filters">
                <IconButton color="primary" aria-label="clear filters" onClick={() => handleClearFilters()}>
                  <VscClose className="large-icon" />
                </IconButton>
              </Tooltip>
            </Stack>
          </AccordionDetails>
        </ActionsAccordion>
      </StickyWrapper>
      <InfiniteScroll
        dataLength={recipes.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={isMoreRecipes}
        loader={
          <Stack className="w-full mt-6 mb-5" alignItems="center">
            <EllipsisLoader />
          </Stack>
        }
        endMessage={
          <Stack className="w-full mt-6 mb-5" alignItems="center">
            <Typography>No more recipes</Typography>
          </Stack>
        }
      >
        <Grid container spacing={2} className="mb-5">
          {recipes.map((recipe) => (
            <Grid key={recipe.id} item xs={12} lg={isListLayout ? 12 : 6} xl={isListLayout ? 12 : 4}>
              <RecipeCard
                recipeId={recipe.id}
                isListLayout={isListLayout}
                title={recipe.title}
                dateCreated={recipe.createdat}
                description={recipe.description}
                recipeCategories={recipe.recipecategory}
                imagePath={recipe.image}
                rating={recipe.rating}
                effort={recipe.effort}
                bookmarked={recipe.bookmarked}
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </PageContainer>
  );
}
