import React, { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import router from 'next/router';
import {
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Fab,
  Grid,
  IconButton,
  Pagination,
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
import { BsFillGridFill, BsFilter, BsList, BsPlus } from 'react-icons/bs';
import { TbRectangle, TbRectangleFilled } from 'react-icons/tb';
import { VscClose } from 'react-icons/vsc';
import PageContainer from '@/components/pagecontainer';
import RecipeCard from '@/components/recipecard';
import { CategoryOptions } from '@/constants/general';
import { DifficultyRating, StyledRating } from '@/public/theme/globalStyled';
import { ActionsAccordion, StickyWrapper } from './styled';

export default function Recipes(): ReactElement {
  // TODO Test data
  const recipes = [
    {
      id: 1,
      title: 'Recipe 1',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      imagePath: '/images/pancakes.jpg',
      rating: 1,
      difficulty: 1
    },
    {
      id: 2,
      title: 'Recipe 2',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      rating: 2,
      difficulty: 2
    },
    {
      id: 3,
      title: 'Recipe 3',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      imagePath: '/images/pancakes.jpg',
      rating: 3,
      difficulty: 3
    },
    {
      id: 4,
      title: 'Recipe 4',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      rating: 4
    },
    {
      id: 5,
      title: 'Recipe 5',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      imagePath: '/images/pancakes.jpg',
      rating: 5
    },
    {
      id: 6,
      title: 'Recipe 6',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      imagePath: '/images/pancakes.jpg',
      rating: 3
    },
    {
      id: 7,
      title: 'Recipe 7',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      imagePath: '/images/pancakes.jpg',
      rating: 3
    },
    {
      id: 8,
      title: 'Recipe 8',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      imagePath: '/images/pancakes.jpg',
      rating: 3
    },
    {
      id: 9,
      title: 'Recipe 9',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      imagePath: '/images/pancakes.jpg',
      rating: 3
    }
  ];
  const theme = useTheme();
  const [isListLayout, setIsListLayout] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [difficultyFilter, setDifficultyFilter] = useState<number>(0);
  const [isDateAscending, setIsDateAscending] = useState<boolean>(true);
  const categoryOptions = Object.values(CategoryOptions);

  function handleFilter(filters: { categories: string[]; rating: number; difficulty: number; dateAscending: boolean }) {
    // TODO
    console.log(filters);
  }

  function handleCategoryChange(value: string[]) {
    setSelectedCategories(value);
    handleFilter({
      categories: value,
      rating: ratingFilter,
      difficulty: difficultyFilter,
      dateAscending: isDateAscending
    });
  }

  function handleRatingChange(value: number) {
    setRatingFilter(value);
    handleFilter({
      categories: selectedCategories,
      rating: value,
      difficulty: difficultyFilter,
      dateAscending: isDateAscending
    });
  }

  function handleDifficultyChange(value: number) {
    setDifficultyFilter(value);
    handleFilter({
      categories: selectedCategories,
      rating: ratingFilter,
      difficulty: value,
      dateAscending: isDateAscending
    });
  }

  function handleDateOrderChange(checked: boolean) {
    setIsDateAscending(checked);
    handleFilter({
      categories: selectedCategories,
      rating: ratingFilter,
      difficulty: difficultyFilter,
      dateAscending: checked
    });
  }

  function handleClearFilters() {
    setSelectedCategories([]);
    setRatingFilter(0);
    setDifficultyFilter(0);
    setIsDateAscending(true);
  }

  return (
    <PageContainer>
      <StickyWrapper>
        <Paper className="p-3">
          <Stack justifyContent="space-between" alignItems="center" direction="row">
            <Stack direction="row" spacing={2}>
              <ToggleButtonGroup
                aria-label="layout button group"
                value={isListLayout}
                onChange={(event: MouseEvent<HTMLElement>, value: boolean) => value !== null && setIsListLayout(value)}
                sx={{ visibility: { xs: 'hidden', md: 'visible' } }}
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
                options={categoryOptions}
                value={selectedCategories}
                renderInput={(params) => <TextField {...params} label="Categories" />}
                onChange={(event: ChangeEvent<HTMLInputElement>, value: string[]) => handleCategoryChange(value)}
                className="w-3/12"
              />
              <Stack direction="row" spacing={1}>
                <Typography component="legend" color={theme.palette.text.secondary}>
                  Rating
                </Typography>
                <StyledRating
                  value={ratingFilter}
                  onChange={(event: ChangeEvent<HTMLInputElement>, value: number) => handleRatingChange(value)}
                  size="large"
                />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography component="legend" color={theme.palette.text.secondary}>
                  Difficulty
                </Typography>
                <DifficultyRating
                  value={difficultyFilter}
                  onChange={(event: ChangeEvent<HTMLInputElement>, value: number) => handleDifficultyChange(value)}
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
                  onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => handleDateOrderChange(checked)}
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
        {recipes.map((recipe) => (
          <Grid key={recipe.id} item xs={12} lg={isListLayout ? 12 : 6} xl={isListLayout ? 12 : 4}>
            <RecipeCard
              recipeID={recipe.id}
              isListLayout={isListLayout}
              title={recipe.title}
              dateCreated={recipe.dateCreated}
              description={recipe.description}
              categories={recipe.categories}
              imagePath={recipe.imagePath}
              rating={recipe.rating}
              difficulty={recipe.difficulty}
              loading={false}
            />
          </Grid>
        ))}
      </Grid>
      <Stack justifyContent="center" direction="row">
        <Pagination count={10} color="secondary" size="large" />
      </Stack>
    </PageContainer>
  );
}
