import React, { ChangeEvent, MouseEvent, ReactElement, useEffect, useState } from 'react';
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
import RecipeCards from '@/components/recipe-cards';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { clearRecipes, getRecipes } from '@/slices/recipeSlice';
import { SliceItem } from '@/types/common';
import { Category } from '@/types/enum';
import { Recipe } from '@/types/recipe';
import { RootState } from '@/reducers/store';
import { StatusTypes } from '@/constants/general';
import { EffortRating, StyledRating } from '@/public/theme/globalStyled';
import { usePrevious } from '@/utils/common';
import { ActionsAccordion, StickyWrapper } from './styled';

export default function Recipes(): ReactElement {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { data: recipeCategories } = useAppSelector((state: RootState): SliceItem<Category[]> => state.enum.categories);
  const {
    data: storeRecipes,
    status: statusRecipes,
    totalCount: recipeTotalCount,
    error: errorRecipes
  } = useAppSelector((state: RootState): SliceItem<Recipe[]> => state.recipe.recipes);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isListLayout, setIsListLayout] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [effort, setEffort] = useState<number>(0);
  const [isDateAscending, setIsDateAscending] = useState<boolean>(false);
  const [openErrorRecipes, setOpenErrorRecipes] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const prevCategories = usePrevious<Category[]>(categories);
  const prevEffort = usePrevious<number>(effort);
  const prevRating = usePrevious<number>(rating);
  const prevIsDateAscending = usePrevious<boolean>(isDateAscending);

  const pageSize = 12;
  const isMoreRecipes = (recipeTotalCount as number) > currentPage * pageSize || false;
  const isLoadingRecipes = statusRecipes === StatusTypes.Pending;
  const isErrorRecipes = statusRecipes === StatusTypes.Rejected;

  function handleClearFilters() {
    setCategories([]);
    setRating(0);
    setEffort(0);
    setIsDateAscending(false);
  }

  useEffect(() => {
    async function handleScroll() {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

      if (scrollHeight - (scrollTop + clientHeight) < 100 && !isLoadingRecipes && !isErrorRecipes && isMoreRecipes) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoadingRecipes, isMoreRecipes, isErrorRecipes]);

  useEffect(() => {
    if (
      categories.length === prevCategories?.length &&
      isDateAscending === prevIsDateAscending &&
      effort === prevEffort &&
      rating === prevRating
    ) {
      dispatch(
        getRecipes({
          params: {
            categories: categories.map((category) => category.id).join(','),
            orderBy: isDateAscending ? 'asc' : 'desc',
            effort,
            rating,
            page: currentPage,
            pageSize
          }
        })
      );
    } else {
      setCurrentPage(1);
      setRecipes([]);
      dispatch(clearRecipes());
    }
  }, [
    categories,
    currentPage,
    dispatch,
    effort,
    isDateAscending,
    prevCategories?.length,
    prevEffort,
    prevIsDateAscending,
    prevRating,
    rating
  ]);

  useEffect(() => {
    setRecipes((prevRecipes) => [...prevRecipes, ...storeRecipes]);
  }, [storeRecipes]);

  useEffect(() => {
    if (isErrorRecipes) {
      setOpenErrorRecipes(true);
    }
  }, [isErrorRecipes]);

  return (
    <PageContainer>
      <Snackbar open={openErrorRecipes} autoHideDuration={6000} onClose={() => setOpenErrorRecipes(false)}>
        <Alert onClose={() => setOpenErrorRecipes(false)} severity="error">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Typography>Could not load recipes — {errorRecipes?.message}</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenErrorRecipes(false);
                dispatch(
                  getRecipes({
                    params: {
                      categories: categories.map((category) => category.id).join(','),
                      orderBy: isDateAscending ? 'asc' : 'desc',
                      effort,
                      rating,
                      page: currentPage,
                      pageSize
                    }
                  })
                );
              }}
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
                options={recipeCategories as Category[]}
                getOptionLabel={(option) => option.value}
                value={categories}
                renderInput={(params) => <TextField {...params} label="Categories" />}
                onChange={(event: ChangeEvent<HTMLInputElement>, value: Category[]) => setCategories(value)}
                className="w-3/12"
              />
              <Stack direction="row" spacing={1}>
                <Typography component="legend" color={theme.palette.text.secondary}>
                  Rating
                </Typography>
                <StyledRating
                  value={rating}
                  onChange={(event: ChangeEvent<HTMLInputElement>, value: number) => setRating(value)}
                  size="large"
                />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography component="legend" color={theme.palette.text.secondary}>
                  Difficulty
                </Typography>
                <EffortRating
                  value={effort}
                  onChange={(event: ChangeEvent<HTMLInputElement>, value: number) => setEffort(value)}
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
        <RecipeCards recipes={recipes} isListLayout={isListLayout} loading={isLoadingRecipes} setRecipes={setRecipes} />
      </Grid>
      {!isLoadingRecipes && recipes.length === 0 && !isMoreRecipes && (
        <Stack className="w-full mt-6 mb-5" justifyContent="center" direction="row">
          <Typography>No more recipes</Typography>
        </Stack>
      )}
    </PageContainer>
  );
}
