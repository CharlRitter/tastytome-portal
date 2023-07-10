import React, { MouseEvent, ReactElement, useState } from 'react';
import router from 'next/router';
import { Fab, Grid, Pagination, Stack, ToggleButtonGroup, Tooltip } from '@mui/material';
import { BsFillGridFill, BsList, BsPlus } from 'react-icons/bs';
import PageContainer from '@/components/pagecontainer';
import RecipeCard from '@/components/recipecard';
import globalStyles from '@/public/theme/global.module.scss';
import { ActionsHeader, LayoutToggleButton, StickyWrapper } from './styled';

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
      rating: 1
    },
    {
      id: 2,
      title: 'Recipe 2',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      imagePath: '/images/pancakes.jpg',
      rating: 2
    },
    {
      id: 3,
      title: 'Recipe 3',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      imagePath: '/images/pancakes.jpg',
      rating: 3
    },
    {
      id: 4,
      title: 'Recipe 4',
      dateCreated: 'September 14, 2016',
      description:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      categories: ['Breakfast', 'Dinner'],
      imagePath: '/images/pancakes.jpg',
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
  const [isListLayout, setIsListLayout] = useState<boolean>(false);

  return (
    <PageContainer>
      <StickyWrapper>
        <ActionsHeader>
          <Stack justifyContent="space-between" alignItems="center" direction="row" sx={{ margin: '10px' }}>
            <ToggleButtonGroup
              aria-label="layout button group"
              value={isListLayout}
              onChange={(event: MouseEvent<HTMLElement>, value: boolean) => value !== null && setIsListLayout(value)}
              sx={{ visibility: { xs: 'hidden', md: 'visible' } }}
              color="primary"
              exclusive
            >
              <LayoutToggleButton aria-label="grid layout" value={false}>
                <BsFillGridFill className={globalStyles['large-icon']} />
              </LayoutToggleButton>
              <LayoutToggleButton aria-label="list layout" value={true}>
                <BsList className={globalStyles['large-icon']} />
              </LayoutToggleButton>
            </ToggleButtonGroup>
            <Tooltip title="Add Recipe">
              <Fab color="primary" size="medium" aria-label="add recipe" onClick={() => router.push('/recipes/add')}>
                <BsPlus className={globalStyles['large-icon']} />
              </Fab>
            </Tooltip>
          </Stack>
        </ActionsHeader>
      </StickyWrapper>

      <Grid container spacing={2} className={globalStyles['space-bottom']}>
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
