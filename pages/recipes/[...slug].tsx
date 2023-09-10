import React, { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { TbCircleCheck, TbCircleOff, TbRectangle, TbRectangleFilled, TbUpload } from 'react-icons/tb';
import {
  Alert,
  Autocomplete,
  Button,
  Divider,
  Paper,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FileRejection, useDropzone } from 'react-dropzone';
import PageContainer from '@/components/page-container';
import RecipeItemsList from '@/components/recipe-items-list';
import { createRecipe, getRecipe, updateRecipe } from '@/slices/recipeSlice';
import { ListTypes, Mode, StatusTypes } from '@/constants/general';
import { Recipe, RecipeIngredient, RecipeInstruction, RecipeState, RecipeTimer } from '@/types/recipe';
import { Category, EnumState } from '@/types/enum';
import { SliceItem } from '@/types/common';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { EffortRating, StyledRating } from '@/public/theme/globalStyled';
import { DropBox, DropzoneBox, RatingStack } from './styled';

export default function RecipeAction(): ReactElement {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { data: categories } = useAppSelector(
    (state: { enum: EnumState }): SliceItem<Category[]> => state.enum.categories
  );
  const {
    data: recipe,
    status: statusRecipe,
    error: errorRecipe
  } = useAppSelector((state: { recipe: RecipeState }): SliceItem<Recipe> => state.recipe.recipe);
  const [query, setQuery] = useState<{ action: null | string; recipeId: null | number }>({
    action: null,
    recipeId: null
  });
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [recipeCategories, setRecipeCategories] = useState<Category[]>([]);
  const [imagePath, setImagePath] = useState<string>('');
  const [acceptedImage, setAcceptedImage] = useState<File | null>(null);
  const [rejectedImage, setRejectedImage] = useState<FileRejection | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [effort, setEffort] = useState<number>(0);
  // TODO set to user's default measurement system
  // const [measurementSystemId, setMeasurementSystemId] = useState<number>(1);
  const [recipeIngredients, setRecipeIngredients] = useState<Partial<RecipeIngredient>[]>([]);
  const [recipeInstructions, setRecipeInstructions] = useState<Partial<RecipeInstruction>[]>([]);
  const [recipeTimers, setRecipeTimers] = useState<Partial<RecipeTimer>[]>([]);
  const [openErrorGetRecipe, setOpenErrorGetRecipe] = useState<boolean>(false);
  const [openErrorUpdateRecipe, setOpenErrorUpdateRecipe] = useState<boolean>(false);
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const isLoadingRecipe = statusRecipe === StatusTypes.Pending;
  const isErrorRecipe = statusRecipe === StatusTypes.Rejected;
  const isAddMode = query.action === Mode.Add;

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png']
    },
    maxFiles: 1,
    maxSize: 2000000, // 2 MB
    onDrop: (acceptedFiles, fileRejections) => {
      setImagePath('');
      setAcceptedImage(acceptedFiles[0]);
      setRejectedImage(fileRejections[0]);
    }
  });

  const canSubmit =
    !title ||
    !description ||
    isEmpty(recipeCategories) ||
    isEmpty(recipeIngredients) ||
    recipeIngredients.some(
      (item) => item.measurementtype === null || item.measurementunit === null || item.measurementamount === null
    ) ||
    isEmpty(recipeInstructions) ||
    (recipeTimers && recipeTimers.some((item) => item.hours === null && item.minutes === null));

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  async function dispatchSubmit() {
    const body = {
      title,
      description,
      image: imagePath || acceptedImage || null,
      recipecategories: recipeCategories.map((recipeCategory) => recipeCategory.id),
      rating,
      effort,
      measurementsystemid: 1,
      recipeingredients: recipeIngredients.map((recipeIngredient) => ({
        ...recipeIngredient,
        measurementtypeid: recipeIngredient.measurementtype?.id as number,
        measurementunitid: recipeIngredient.measurementunit?.id as number
      })) as RecipeIngredient[],
      recipeinstructions: recipeInstructions.map((recipeInstruction) => recipeInstruction.title as string),
      recipetimers: recipeTimers as RecipeTimer[]
    };

    try {
      if (isAddMode) {
        await dispatch(createRecipe({ body }));
      } else {
        await dispatch(updateRecipe({ recipeId: 2, body }));
      }
    } finally {
      setisSubmitting(false);
      router.push('/recipes');
    }
  }

  useEffect(() => {
    if (!isSubmitting && isErrorRecipe) {
      setOpenErrorGetRecipe(isErrorRecipe);
    } else if (isSubmitting && isErrorRecipe) {
      setOpenErrorUpdateRecipe(isErrorRecipe);
    }
  }, [isErrorRecipe, isSubmitting]);

  useEffect(() => {
    if (recipe.id) {
      setTitle(recipe.title);
      setDescription(recipe.description);
      setRating(recipe.rating);
      setEffort(recipe.effort);
      setImagePath((recipe.image || '') as string);
      setRecipeCategories(
        recipe.recipecategory.map((recipeCategory) => ({
          id: recipeCategory.category.id,
          value: recipeCategory.category.value
        }))
      );
      setRecipeIngredients(recipe.recipeingredient);
      setRecipeInstructions(recipe.recipeinstruction);
      setRecipeTimers(recipe.recipetimer);
    }
  }, [recipe]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { slug } = router.query as { slug: string[] };
    const action = slug[0];
    let recipeId: number | null = null;

    if (slug.length === 2) {
      recipeId = parseInt(slug[1], 10);
    }

    if (
      slug.length > 2 ||
      (action !== Mode.Edit && action !== Mode.Add) ||
      (action === Mode.Edit && slug.length !== 2) ||
      (slug.length === 2 && Number.isNaN(recipeId))
    ) {
      router.push('/recipes');
    }

    setQuery({ action, recipeId });
  }, [router]);

  useEffect(() => {
    const { recipeId } = query;

    if (recipeId) {
      dispatch(getRecipe({ recipeId }));
    }
  }, [dispatch, query]);

  let dropzoneContent = (
    <DropBox isDragActive={isDragActive} {...getRootProps()}>
      <input {...getInputProps()} />
      <Stack alignItems="center" spacing={1}>
        <TbUpload size={50} color={theme.palette.primary.main} />
        <Typography className="pb-8">
          {isDragReject ? 'This file is not allowed' : 'Click to choose an image or drag it here'}
        </Typography>
        <Button type="button" variant="contained" color="secondary">
          Add image
        </Button>
      </Stack>
    </DropBox>
  );

  if (acceptedImage) {
    dropzoneContent = (
      <DropBox>
        <Stack alignItems="center" spacing={1}>
          <>
            <TbCircleCheck size={50} color={theme.palette.primary.main} />
            <Typography>Image successfully uploaded</Typography>
            <Typography>{acceptedImage.name}</Typography>
          </>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => {
              setAcceptedImage(null);
              setRejectedImage(null);
            }}
          >
            Remove image
          </Button>
        </Stack>
      </DropBox>
    );
  } else if (rejectedImage) {
    dropzoneContent = (
      <DropBox>
        <Stack alignItems="center" spacing={1}>
          <>
            <TbCircleOff size={50} color={theme.palette.primary.main} />
            <Typography>Image upload failed</Typography>
            <Typography>{rejectedImage.errors[0].message}</Typography>
          </>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => {
              setAcceptedImage(null);
              setRejectedImage(null);
            }}
          >
            Remove image
          </Button>
        </Stack>
      </DropBox>
    );
  } else if (imagePath) {
    dropzoneContent = (
      <DropBox disabled>
        <Stack alignItems="center" spacing={1}>
          <TbUpload size={50} color={theme.palette.primary.main} />
          <Typography className="pb-8">Click to choose an image or drag it here</Typography>
          <Button type="button" variant="contained" color="secondary" disabled>
            Add image
          </Button>
        </Stack>
      </DropBox>
    );
  }

  const titleGroupContent = (
    <Stack direction="column" className="w-full" spacing={1}>
      <TextField
        label="Title"
        name="title"
        value={title}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
        required
      />
      <TextField
        label="Description"
        name="description"
        value={description}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
        multiline
        rows={isMediumScreen ? 2 : 11}
        required
      />
    </Stack>
  );
  const dropzoneBoxContent = (
    <DropzoneBox isMediumScreen={isMediumScreen}>
      <Typography variant="h6">Image</Typography>
      {dropzoneContent}
      <Divider className="mb-3">OR</Divider>
      <Stack alignItems="center">
        <TextField
          label="Enter a URL to an image"
          name="image url"
          value={imagePath}
          disabled={Boolean(acceptedImage) || Boolean(rejectedImage)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setImagePath(event.target.value)}
        />
      </Stack>
    </DropzoneBox>
  );
  const categoriesContent = (
    <Autocomplete
      multiple
      limitTags={3}
      className="w-full"
      options={categories as Category[]}
      getOptionLabel={(option) => option.value}
      value={recipeCategories || []}
      renderInput={(params) => <TextField {...params} label="Categories *" />}
      onChange={(event: ChangeEvent<HTMLInputElement>, value: Category[]) => setRecipeCategories(value)}
    />
  );
  const ratingStackContent = (
    <RatingStack
      direction={isMediumScreen ? 'column' : 'row'}
      spacing={1}
      alignItems={isMediumScreen ? 'baseline' : 'center'}
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography component="legend" color={theme.palette.text.secondary}>
          Rating
        </Typography>
        <StyledRating
          value={rating}
          onChange={(event: ChangeEvent<HTMLInputElement>, value: number) => setRating(value)}
          size="large"
        />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
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
    </RatingStack>
  );
  const ingredientsContent = (
    <RecipeItemsList
      title="Ingredients *"
      items={recipeIngredients}
      type={ListTypes.Ingredients}
      handleSetItems={(value) => setRecipeIngredients(value)}
      label="ingredient"
    />
  );
  const instructionsContent = (
    <RecipeItemsList
      title="Instructions *"
      items={recipeInstructions}
      handleSetItems={(value) => setRecipeInstructions(value)}
      label="instruction"
    />
  );
  const timersContent = (
    <RecipeItemsList
      title="Timers"
      items={recipeTimers}
      type={ListTypes.Timers}
      handleSetItems={(value) => setRecipeTimers(value)}
      label="timer"
    />
  );

  return (
    <PageContainer>
      <Snackbar open={openErrorUpdateRecipe} autoHideDuration={6000} onClose={() => setOpenErrorUpdateRecipe(false)}>
        <Alert onClose={() => setOpenErrorUpdateRecipe(false)} severity="error">
          Could not add recipe — {errorRecipe?.message}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorGetRecipe} autoHideDuration={6000} onClose={() => setOpenErrorGetRecipe(false)}>
        <Alert onClose={() => setOpenErrorGetRecipe(false)} severity="error">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Typography> Could not load recipe — {errorRecipe?.message}</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                const recipeId = query.recipeId as number;

                setOpenErrorGetRecipe(false);
                dispatch(getRecipe({ recipeId }));
              }}
            >
              Reload
            </Button>
          </Stack>
        </Alert>
      </Snackbar>
      <Paper classes={{ root: 'main' }} component="form" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <Stack direction={isMediumScreen ? 'column' : 'row'} spacing={1} justifyContent="space-between">
            {isLoadingRecipe ? <Skeleton width="60%">{titleGroupContent}</Skeleton> : titleGroupContent}
            {isLoadingRecipe ? <Skeleton width="40%">{dropzoneBoxContent}</Skeleton> : dropzoneBoxContent}
          </Stack>
          <Stack direction={isMediumScreen ? 'column' : 'row'} spacing={1} justifyContent="space-between">
            {isLoadingRecipe ? <Skeleton width="60%">{categoriesContent}</Skeleton> : categoriesContent}
            {isLoadingRecipe ? <Skeleton width="40%">{ratingStackContent}</Skeleton> : ratingStackContent}
          </Stack>
          {isLoadingRecipe ? <Skeleton width="100%">{ingredientsContent}</Skeleton> : ingredientsContent}
          {isLoadingRecipe ? <Skeleton width="100%">{instructionsContent}</Skeleton> : instructionsContent}
          {isLoadingRecipe ? <Skeleton width="100%">{timersContent}</Skeleton> : timersContent}

          <Stack direction="row" spacing={2}>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              disabled={isLoadingRecipe}
              onClick={() => router.push('/recipes')}
            >
              Cancel
            </Button>
            <LoadingButton
              type="button"
              variant="contained"
              disabled={canSubmit || isLoadingRecipe}
              loading={isLoadingRecipe && isSubmitting}
              onClick={() => dispatchSubmit()}
            >
              {isAddMode ? 'Add' : 'Update'} Recipe
            </LoadingButton>
          </Stack>
        </Stack>
      </Paper>
    </PageContainer>
  );
}
