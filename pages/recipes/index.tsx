import React, { ChangeEvent, MouseEvent, ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import router from 'next/router';
import {
  AccordionDetails,
  AccordionSummary,
  Alert,
  Autocomplete,
  Button,
  Fab,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Snackbar,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { BsFillGridFill, BsFilter, BsList, BsPlus } from 'react-icons/bs';
import { TbRectangle, TbRectangleFilled } from 'react-icons/tb';
import { VscClose } from 'react-icons/vsc';
import PageContainer from '@/components/page-container';
import RecipeCard from '@/components/recipe-card';
import { getRecipes } from '@/slices/recipeSlice';
import { Category, EnumState } from '@/types/enum';
import { RecipeState } from '@/types/recipe';
import { DifficultyRating, StyledRating } from '@/public/theme/globalStyled';
import { ActionsAccordion, StickyWrapper } from './styled';

export default function Recipes(): ReactElement {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { categories } = useSelector((state: { enum: EnumState }) => state.enum);
  const {
    recipes,
    loading: recipeLoading,
    error: recipeError
  } = useSelector((state: { recipe: RecipeState }) => state.recipe);

  const [isListLayout, setIsListLayout] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [effortFilter, setEffortFilter] = useState<number>(0);
  const [isDateAscending, setIsDateAscending] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recipesPerPage] = useState<number>(10);

  const totalRecipes = recipes.length;
  const totalPages = Math.ceil(totalRecipes / recipesPerPage) || 1;

  useEffect(() => {
    dispatch(
      getRecipes({
        categories: selectedCategories && selectedCategories.map((category) => category.id).join(','),
        orderBy: isDateAscending ? 'asc' : 'desc',
        effort: effortFilter?.toString(),
        rating: ratingFilter?.toString(),
        page: currentPage,
        pageSize: recipesPerPage
      })
    );
  }, [dispatch, selectedCategories, isDateAscending, effortFilter, ratingFilter, currentPage, recipesPerPage]);

  useEffect(() => {
    setOpenSnackbar(recipeError !== null);
  }, [recipeError]);

  function handleClearFilters() {
    setSelectedCategories([]);
    setRatingFilter(0);
    setEffortFilter(0);
    setIsDateAscending(false);
  }

  return (
    <PageContainer>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Typography>Could not load recipes — {recipeError}</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                dispatch(
                  getRecipes({
                    categories: selectedCategories && selectedCategories.map((category) => category.id).join(','),
                    orderBy: isDateAscending ? 'asc' : 'desc',
                    effort: effortFilter?.toString(),
                    rating: ratingFilter?.toString(),
                    page: currentPage,
                    pageSize: recipesPerPage
                  })
                )
              }
            >
              Reload
            </Button>
          </Stack>
        </Alert>
      </Snackbar>
      <StickyWrapper>
        <Paper className="p-3">
          <Stack justifyContent="space-between" alignItems="center" direction="row">
            <Stack direction="row">
              <ToggleButtonGroup
                aria-label="layout button group"
                className="mr-3"
                value={isListLayout}
                onChange={(event: MouseEvent<HTMLElement>, value: boolean) => value !== null && setIsListLayout(value)}
                sx={{ display: { xs: 'none', md: 'block' } }}
                color="primary"
                exclusive
              >
                <ToggleButton className="p-3" aria-label="grid layout" value={false}>
                  <BsFillGridFill className="large-icon" />
                </ToggleButton>
                <ToggleButton className="p-3" aria-label="list layout" value={true}>
                  <BsList className="large-icon" />
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                value={showFilters}
                exclusive
                color="primary"
                onClick={() => setShowFilters(!showFilters)}
              >
                <ToggleButton value={true} aria-label="show filters">
                  <BsFilter className="large-icon" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Tooltip title="Add Recipe">
              <Fab color="primary" size="medium" aria-label="add recipe" onClick={() => router.push('/recipes/add')}>
                <BsPlus className={'large-icon'} />
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
                options={categories as Category[]}
                getOptionLabel={(option) => option.value}
                value={selectedCategories || []}
                renderInput={(params) => <TextField {...params} label="Categories" />}
                onChange={(event: ChangeEvent<HTMLInputElement>, value: Category[]) => setSelectedCategories(value)}
                className="w-3/12"
              />
              <Stack direction="row" spacing={1}>
                <Typography component="legend" color={theme.palette.text.secondary}>
                  Rating
                </Typography>
                <StyledRating
                  value={ratingFilter}
                  onChange={(event: ChangeEvent<HTMLInputElement>, value: number) => setRatingFilter(value)}
                  size="large"
                />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography component="legend" color={theme.palette.text.secondary}>
                  Difficulty
                </Typography>
                <DifficultyRating
                  value={effortFilter}
                  onChange={(event: ChangeEvent<HTMLInputElement>, value: number) => setEffortFilter(value)}
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
                  onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => setIsDateAscending(checked)}
                />
              </Stack>
              <Tooltip title="Clear Filters">
                <IconButton color="primary" aria-label="clear filters" onClick={() => handleClearFilters()}>
                  <VscClose className={'large-icon'} />
                </IconButton>
              </Tooltip>
            </Stack>
          </AccordionDetails>
        </ActionsAccordion>
      </StickyWrapper>

      <Grid container spacing={2} className="mb-3">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Grid key={recipe.id} item xs={12} lg={isListLayout ? 12 : 6} xl={isListLayout ? 12 : 4}>
              <RecipeCard
                recipeID={recipe.id as number}
                isListLayout={isListLayout}
                title={recipe.title}
                dateCreated={recipe.createdat as string}
                description={recipe.description}
                recipeCategories={recipe.recipecategory}
                imagePath={recipe.image as string | null}
                rating={recipe.rating}
                effort={recipe.effort}
                loading={recipeLoading}
              />
            </Grid>
          ))
        ) : (
          <Stack className="w-full mt-6 mb-3" justifyContent="center" direction="row">
            <Typography>No results</Typography>
          </Stack>
        )}
      </Grid>
      <Stack justifyContent="center" direction="row">
        <Pagination
          count={totalPages}
          color="secondary"
          size="large"
          onChange={(event: ChangeEvent<HTMLInputElement>, page: number) => setCurrentPage(page)}
        />
      </Stack>
    </PageContainer>
  );
}
