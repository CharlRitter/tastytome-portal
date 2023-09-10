import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import RecipeCard from '@/components/recipe-card';
import { Recipe } from '@/types/recipe';

interface RecipeCardsProps {
  recipes: Recipe[];
  isListLayout: boolean;
  loading?: boolean;
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
}

export default function RecipeCards(props: RecipeCardsProps): ReactElement {
  const { recipes, isListLayout, loading, setRecipes } = props;

  let content = (
    <>
      {recipes.map((recipe) => (
        <Grid key={recipe.id} item xs={12} lg={isListLayout ? 12 : 6} xl={isListLayout ? 12 : 4}>
          <RecipeCard
            recipeId={recipe.id as number}
            isListLayout={isListLayout}
            title={recipe.title}
            dateCreated={recipe.createdat as string}
            description={recipe.description}
            recipeCategories={recipe.recipecategory}
            imagePath={recipe.image as string | null}
            rating={recipe.rating}
            effort={recipe.effort}
            setRecipes={setRecipes}
          />
        </Grid>
      ))}
    </>
  );

  if (!loading && recipes.length === 0) {
    content = (
      <Stack className="w-full mt-6 mb-3" justifyContent="center" direction="row">
        <Typography>No results</Typography>
      </Stack>
    );
  }

  return (
    <>
      {content}
      {loading &&
        Array(3)
          .fill(null)
          .map((_, index) => (
            <Grid key={index} item xs={12} lg={isListLayout ? 12 : 6} xl={isListLayout ? 12 : 4}>
              <RecipeCard
                isListLayout={isListLayout}
                loading={true}
                title={''}
                dateCreated={''}
                description={''}
                recipeCategories={[]}
                recipeID={0}
                setRecipes={setRecipes}
              />
            </Grid>
          ))}
    </>
  );
}
