import React, { ReactElement } from 'react';
import { Card, CardContent, Grid, Skeleton, Stack, Typography } from '@mui/material';
import RecipeCard from '@/components/recipe-card';
import { Recipe } from '@/types/recipe';

export default function RecipeCards(props: {
  recipes: Recipe[];
  isListLayout: boolean;
  loading?: boolean;
}): ReactElement {
  const { recipes, isListLayout, loading } = props;

  let content = (
    <Stack className="w-full mt-6 mb-3" justifyContent="center" direction="row">
      <Typography>No results</Typography>
    </Stack>
  );

  if (loading) {
    content = (
      <>
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <Grid key={index} item xs={12} lg={isListLayout ? 12 : 6} xl={isListLayout ? 12 : 4}>
              <Card>
                <Stack direction={isListLayout ? 'row' : 'column'} width="100%">
                  <Stack direction={isListLayout ? 'row' : 'column'} width="100%">
                    <Skeleton
                      variant="rounded"
                      width={isListLayout ? 300 : 'unset'}
                      height={isListLayout ? 250 : 300}
                    />
                    <Stack direction="column" width="100%">
                      <CardContent>
                        <Skeleton variant="text" height={50} width="50%" className="mb-4" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="50%" />
                        <Skeleton variant="text" width="75%" />
                      </CardContent>
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
      </>
    );
  } else if (!loading && recipes.length > 0) {

    content = (
      <>
        {recipes.map((recipe) => (
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
            />
          </Grid>
        ))}
      </>
    );
  }

  return content;
}
