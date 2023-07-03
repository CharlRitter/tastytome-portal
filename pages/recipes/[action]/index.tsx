import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageContainer from '@/components/pagecontainer';
import { Box, Button, Paper, TextField } from '@mui/material';

export default function Pantry() {
  const router = useRouter();
  const { action } = router.query;
  const isViewMode = typeof action === 'string' && /^\d+$/.test(action);
  const isAddMode = action === 'add';
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: ''
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!isViewMode && !isAddMode) {
      router.push('/recipes');
    }
  }, [isViewMode, isAddMode, router]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Handle form submission logic here
    console.log(recipe);
  }

  return (
    <PageContainer>
      <Paper classes={{ root: 'main' }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField label="Title" name="title" value={recipe.title} onChange={handleChange} required />
            <TextField
              label="Description"
              name="description"
              value={recipe.description}
              onChange={handleChange}
              required
            />
            <TextField
              label="Ingredients"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
            <TextField
              label="Instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Add Recipe
            </Button>
          </Box>
        </form>
      </Paper>
    </PageContainer>
  );
}
