import React, { ChangeEvent, MouseEvent, ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import router from 'next/router';
import {
  AccordionDetails,
  AccordionSummary,
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { BsFillGridFill, BsFilter, BsList, BsPlus } from 'react-icons/bs';
import { TbRectangle, TbRectangleFilled } from 'react-icons/tb';
import { VscClose } from 'react-icons/vsc';
import PageContainer from '@/components/page-container';
import RecipeCards from '@/components/recipe-cards';
import { getRecipes, getNextRecipes } from '@/slices/recipeSlice';
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
    loading: loadingRecipes,
    loadingNext: loadingNextRecipe,
    totalCount: recipeTotalCount,
    error: errorRecipe
  } = useSelector((state: { recipe: RecipeState }) => state.recipe);

  const [isListLayout, setIsListLayout] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [effortFilter, setEffortFilter] = useState<number>(0);
  const [isDateAscending, setIsDateAscending] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMoreRecipes, setIsMoreRecipes] = useState<boolean>(false);

  const pageSize = useMediaQuery(theme.breakpoints.down('xl')) || isListLayout ? 10 : 12;

  function handleClearFilters() {
    setSelectedCategories([]);
    setRatingFilter(0);
    setEffortFilter(0);
    setIsDateAscending(false);
  }

  useEffect(() => {
    async function handleScroll() {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

      if (scrollHeight - (scrollTop + clientHeight) < 100 && !loadingRecipes && isMoreRecipes) {
        const nextPage = currentPage + 1;

        dispatch(
          getNextRecipes({
            categories: selectedCategories.map((category) => category.id).join(','),
            orderBy: isDateAscending ? 'asc' : 'desc',
            effort: effortFilter?.toString(),
            rating: ratingFilter?.toString(),
            page: nextPage,
            pageSize
          })
        );

        setCurrentPage(nextPage);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    dispatch,
    currentPage,
    isMoreRecipes,
    loadingRecipes,
    selectedCategories,
    isDateAscending,
    effortFilter,
    ratingFilter
  ]);

  useEffect(() => {
    dispatch(
      getRecipes({
        categories: selectedCategories && selectedCategories.map((category) => category.id).join(','),
        orderBy: isDateAscending ? 'asc' : 'desc',
        effort: effortFilter?.toString(),
        rating: ratingFilter?.toString(),
        pageSize
      })
    );
    setCurrentPage(1);
  }, [dispatch, selectedCategories, isDateAscending, effortFilter, ratingFilter]);

  useEffect(() => {
    setOpenSnackbar(errorRecipe !== null);
  }, [errorRecipe]);

  useEffect(() => {
    setIsMoreRecipes(recipeTotalCount > currentPage * 10);
  }, [recipeTotalCount, currentPage]);

  return (
    <PageContainer>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Typography>Could not load recipes — {errorRecipe}</Typography>
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
                    pageSize
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
      <Grid container spacing={2} className="mb-5">
        <RecipeCards recipes={recipes} isListLayout={isListLayout} loading={loadingRecipes} />
      </Grid>
      {loadingNextRecipe && (
        <Stack className="w-full mt-6 mb-5" justifyContent="center" direction="row">
          <CircularProgress />
        </Stack>
      )}
      {!isMoreRecipes && (
        <Stack className="w-full mt-6 mb-5" justifyContent="center" direction="row">
          <Typography>No more recipes</Typography>
        </Stack>
      )}
    </PageContainer>
  );
}
