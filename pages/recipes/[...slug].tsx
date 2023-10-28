import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { JSX, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { TbCircleCheck, TbCircleOff, TbRectangle, TbRectangleFilled, TbUpload } from 'react-icons/tb';

import { EllipsisLoader } from '@/components/ellipsis-loader';
import { PageContainer } from '@/components/page-container';
import { RecipeIngredients, RecipeInstructions, RecipeTimers } from '@/components/recipe-items';
import { Toast } from '@/components/toast';
import { Mode, StatusTypes } from '@/constants/general';
import { EffortRating, StyledRating } from '@/public/theme/globalStyled';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { RootState } from '@/reducers/store';
import { clearRecipe, createRecipe, getRecipe, updateRecipe } from '@/slices/recipeSlice';
import { SliceItem } from '@/types/common';
import { Category } from '@/types/enum';
import { RecipeIngredientRequest, RecipeInstructionRequest, RecipeResponse, RecipeTimerRequest } from '@/types/recipe';

import { DropBox, DropzoneBox, LoadingStack, RatingStack } from './styled';

export default function RecipeAction(): JSX.Element {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { data: categories } = useAppSelector((state: RootState): SliceItem<Category[]> => state.enumSlice.categories);
  const {
    data: recipe,
    status: statusRecipe,
    error: errorRecipe
  } = useAppSelector((state: RootState): SliceItem<RecipeResponse> => state.recipeSlice.recipe);
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
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredientRequest[]>([]);
  const [recipeInstructions, setRecipeInstructions] = useState<RecipeInstructionRequest[]>([]);
  const [recipeTimers, setRecipeTimers] = useState<RecipeTimerRequest[]>([]);
  const [openErrorToast, setOpenErrorToast] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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

  useEffect(() => {
    if (isErrorRecipe) {
      setOpenErrorToast(true);
    }
  }, [isErrorRecipe]);

  useEffect(() => {
    if (recipe.id) {
      setTitle(recipe.title);
      setDescription(recipe.description);
      setRating(recipe.rating);
      setEffort(recipe.effort);
      setImagePath(recipe.image ?? '');
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

    const { slug } = router.query;

    if (!Array.isArray(slug)) {
      return;
    }

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

    return () => {
      dispatch(clearRecipe());
    };
  }, [dispatch, query]);

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
        measurementtypeid: recipeIngredient.measurementtype?.id,
        measurementunitid: recipeIngredient.measurementunit?.id
      })),
      recipeinstructions: recipeInstructions.map((recipeInstruction) => recipeInstruction.title),
      recipetimers: recipeTimers
    };

    try {
      setIsSubmitting(true);

      if (isAddMode) {
        await dispatch(createRecipe({ body }));
      } else {
        await dispatch(updateRecipe({ recipeId: 2, body }));
      }
    } finally {
      setIsSubmitting(false);
      router.push('/recipes');
    }
  }

  let dropzoneContent = (
    <DropBox
      sx={{
        border: `1px solid ${isDragActive ? theme.palette.action.active : 'transparent'}`,
        backgroundColor: isDragActive ? theme.palette.action.hover : 'inherit'
      }}
      {...getRootProps()}
    >
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
      <DropBox sx={{ opacity: 0.7 }}>
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

  return (
    <PageContainer>
      <Toast
        open={openErrorToast}
        onClose={() => setOpenErrorToast(false)}
        severity="error"
        message={errorRecipe?.message ?? ''}
      />
      <Paper classes={{ root: 'main' }}>
        {isLoadingRecipe ? (
          <LoadingStack className="w-full" justifyContent="center" alignItems="center">
            <EllipsisLoader />
          </LoadingStack>
        ) : (
          <Stack direction="column" spacing={2}>
            <Stack direction={isMediumScreen ? 'column' : 'row'} spacing={1} justifyContent="space-between">
              <Stack direction="column" className="w-full" spacing={1}>
                <TextField
                  label="Title"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
                <TextField
                  label="Description"
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  multiline
                  rows={isMediumScreen ? 2 : 11}
                  required
                />
              </Stack>
              <DropzoneBox sx={{ minWidth: isMediumScreen ? 'unset' : '403px' }}>
                <Typography variant="h6">Image</Typography>
                {dropzoneContent}
                <Divider className="mb-3">OR</Divider>
                <Stack alignItems="center">
                  <TextField
                    label="Enter a URL to an image"
                    name="image url"
                    value={imagePath}
                    disabled={Boolean(acceptedImage) || Boolean(rejectedImage)}
                    onChange={(event) => setImagePath(event.target.value)}
                  />
                </Stack>
              </DropzoneBox>
            </Stack>
            <Stack direction={isMediumScreen ? 'column' : 'row'} spacing={1} justifyContent="space-between">
              <Autocomplete
                multiple
                limitTags={3}
                className="w-full"
                options={categories}
                getOptionLabel={(option) => option.value}
                value={recipeCategories || []}
                renderInput={(params) => <TextField {...params} label="Categories *" />}
                onChange={(_, value: Category[]) => setRecipeCategories(value)}
              />
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
                  <StyledRating value={rating} onChange={(_, value) => value && setRating(value)} size="large" />
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography component="legend" color={theme.palette.text.secondary}>
                    Difficulty
                  </Typography>
                  <EffortRating
                    value={effort}
                    onChange={(_, value) => value && setEffort(value)}
                    size="large"
                    icon={<TbRectangleFilled />}
                    emptyIcon={<TbRectangle />}
                    max={3}
                  />
                </Stack>
              </RatingStack>
            </Stack>
            <RecipeIngredients items={recipeIngredients} handleSetItems={(value) => setRecipeIngredients(value)} />
            <RecipeInstructions items={recipeInstructions} handleSetItems={(value) => setRecipeInstructions(value)} />
            <RecipeTimers items={recipeTimers} handleSetItems={(value) => setRecipeTimers(value)} />
            <Stack direction="row" spacing={2}>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                disabled={isLoadingRecipe}
                onClick={() => {
                  if (window.history.length === 1) {
                    router.push('/recipes');
                  } else {
                    router.back();
                  }
                }}
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
        )}
      </Paper>
    </PageContainer>
  );
}
