import React, { MouseEvent, useState } from 'react';
import router from 'next/router';
import { Fab, Grid, Pagination, Stack, ToggleButtonGroup, Tooltip } from '@mui/material';
import { BsFillGridFill, BsList, BsPlus } from 'react-icons/bs';
import PageContainer from '@/components/pagecontainer';
import RecipeCard from '@/components/recipecard';
import globalStyles from '@/public/theme/global.module.scss';
import { StickyHeader, LayoutToggleButton } from './styled';

export default function Recipes() {
  const [isListLayout, setIsListLayout] = useState<boolean>(false);

  return (
    <PageContainer>
      <StickyHeader>
        <Stack justifyContent="space-between" alignItems="center" direction="row" sx={{ margin: '10px 0' }}>
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
      </StickyHeader>

      <Grid container spacing={2} className={globalStyles['gap-bottom']}>
        {[...Array(12)].map((_, index) => (
          <Grid key={index} item xs={12} lg={isListLayout ? 12 : 6} xl={isListLayout ? 12 : 4}>
            <RecipeCard
              recipeID={123}
              isListLayout={isListLayout}
              title="Shrimp and Chorizo Paella"
              dateCreated="September 14, 2016"
              description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
              imagePath="/images/pancakes.jpg"
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
