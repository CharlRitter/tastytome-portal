import React, { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { TbCircleCheck, TbCircleOff, TbRectangle, TbRectangleFilled, TbUpload } from 'react-icons/tb';
import {
  Alert,
  Autocomplete,
  Button,
  Divider,
  Paper,
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
import { createRecipe } from '@/slices/recipeSlice';
import { ListTypes } from '@/constants/general';
import { RecipeIngredient, RecipeInstruction, RecipeState, RecipeTimer } from '@/types/recipe';
import { Category, EnumState } from '@/types/enum';
import { DifficultyRating, StyledRating } from '@/public/theme/globalStyled';
import { DropBox, DropzoneBox, RatingStack } from '../styled';

export default function RecipeAction(): ReactElement {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { categories } = useSelector((state: { enum: EnumState }) => state.enum);
  const { loading: recipeLoading, error: recipeError } = useSelector((state: { recipe: RecipeState }) => state.recipe);

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
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(true);

  const { action } = router.query;
  const isViewMode = typeof action === 'string' && /^\d+$/.test(action);
  const isAddMode = action === 'add';
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

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

  useEffect(() => {
    setOpenSnackbar(recipeError !== null);
  }, [recipeError]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!isViewMode && !isAddMode) {
      router.push('/recipes');
    }
  }, [isViewMode, isAddMode, router]);

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

  return (
    <PageContainer>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          Could not add recipe — {recipeError}
        </Alert>
      </Snackbar>
      <Paper classes={{ root: 'main' }} component="form" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <Stack direction={isMediumScreen ? 'column' : 'row'} spacing={1} justifyContent="space-between">
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
          </Stack>
          <Stack direction={isMediumScreen ? 'column' : 'row'} spacing={1} justifyContent="space-between">
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
                <DifficultyRating
                  value={effort}
                  onChange={(event: ChangeEvent<HTMLInputElement>, value: number) => setEffort(value)}
                  size="large"
                  icon={<TbRectangleFilled />}
                  emptyIcon={<TbRectangle />}
                  max={3}
                />
              </Stack>
            </RatingStack>
          </Stack>
          <RecipeItemsList
            title="Ingredients *"
            items={recipeIngredients}
            type={ListTypes.Ingredients}
            handleSetItems={(value) => setRecipeIngredients(value)}
            label="ingredient"
          />
          <RecipeItemsList
            title="Instructions *"
            items={recipeInstructions}
            handleSetItems={(value) => setRecipeInstructions(value)}
            label="instruction"
          />
          <RecipeItemsList
            title="Timers"
            items={recipeTimers}
            type={ListTypes.Timers}
            handleSetItems={(value) => setRecipeTimers(value)}
            label="timer"
          />
          <Stack direction="row" spacing={2}>
            <Button type="button" variant="contained" color="secondary" onClick={() => router.push('/recipes')}>
              Cancel
            </Button>
            <LoadingButton
              type="button"
              variant="contained"
              disabled={canSubmit}
              loading={recipeLoading}
              // TODO Use member id once implemented
              onClick={() =>
                dispatch(
                  createRecipe({
                    id: 2,
                    data: {
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
                      recipeinstructions: recipeInstructions.map(
                        (recipeInstruction) => recipeInstruction.title as string
                      ),
                      recipetimers: recipeTimers as RecipeTimer[]
                    }
                  })
                ).then(() => {
                  router.push('/recipes');
                })
              }
            >
              Add Recipe
            </LoadingButton>
          </Stack>
        </Stack>
      </Paper>
    </PageContainer>
  );
}
