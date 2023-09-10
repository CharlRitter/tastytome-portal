import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import router from 'next/router';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
  CardActionArea,
  useMediaQuery,
  Chip,
  CardActions,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Skeleton,
  Snackbar,
  Alert
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FaChevronDown, FaChevronRight, FaCopy, FaEdit, FaTrash } from 'react-icons/fa';
import { TbRectangle, TbRectangleFilled } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '@/reducers/hooks';
import { abbreviateTitle, formatDate, stringToColor } from '@/utils/common';
import { clearRecipes, deleteRecipe } from '@/slices/recipeSlice';
import { StatusTypes } from '@/constants/general';
import { Recipe, RecipeCategory } from '@/types/recipe';
import { RootState } from '@/reducers/store';
import { SliceItem } from '@/types/common';
import { EffortRating, StyledRating } from '@/public/theme/globalStyled';
import { RecipeSpeedDial, RecipeSpeedDialAction, RecipeSpeedDialIcon } from './styled';

interface RecipeCardProps {
  isListLayout: boolean;
  title: string;
  dateCreated: string;
  description: string;
  recipeCategories: RecipeCategory[];
  recipeId: number;
  imagePath?: string | null;
  rating?: number;
  effort?: number;
  loading?: boolean;
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
}

export default function RecipeCard(props: RecipeCardProps): ReactElement {
  const {
    title,
    dateCreated,
    description,
    recipeCategories,
    imagePath,
    recipeId,
    rating,
    effort,
    loading,
    setRecipes
  } = props;

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { status: statusRecipe, error: errorRecipe } = useAppSelector(
    (state: RootState): SliceItem<Recipe> => state.recipe.recipe
  );
  const [openSpeedDial, setOpenSpeedDial] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [openErrorRecipeDelete, setOpenErrorRecipeDelete] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const isListLayout = useMediaQuery('(max-width: 899px)') ? false : props.isListLayout;

  const isLoadingRecipe = statusRecipe === StatusTypes.Pending;
  const isErrorRecipe = statusRecipe === StatusTypes.Rejected;

  const buttonActions = [
    {
      icon: <FaEdit />,
      title: 'Edit',
      ariaLabel: 'edit',
      command: () => {
        dispatch(clearRecipes());
        router.push(`/recipes/edit/${recipeId}`);
      }
    },
    {
      icon: <FaCopy />,
      title: 'Duplicate',
      ariaLabel: 'duplicate',
      command: () => {
        dispatch(clearRecipes());
        router.push(`/recipes/add/${recipeId}`);
      }
    },
    { icon: <FaTrash />, title: 'Delete', ariaLabel: 'delete', command: () => setDeleteConfirmation(true) }
  ];

  async function dispatchDelete() {
    try {
      setIsDeleting(true);
      setDeleteConfirmation(false);
      await dispatch(deleteRecipe({ recipeId }));
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    if (isDeleting && isLoadingRecipe && isErrorRecipe) {
      setOpenErrorRecipeDelete(true);
    }
  }, [isErrorRecipe, isLoadingRecipe, isDeleting]);

  return loading ? (
    <Card>
      <Snackbar open={openErrorRecipeDelete} autoHideDuration={6000} onClose={() => setOpenErrorRecipeDelete(false)}>
        <Alert onClose={() => setOpenErrorRecipeDelete(false)} severity="error">
          <Typography>Could not delete recipe — {errorRecipe?.message}</Typography>
        </Alert>
      </Snackbar>
      <Stack direction={isListLayout ? 'row' : 'column'} width="100%">
        <CardActionArea>
          <Stack direction={isListLayout ? 'row' : 'column'} width="100%" height="100%">
            <Skeleton variant="rounded" width={isListLayout ? 300 : 'unset'} height={isListLayout ? '100%' : 300} />
            <Stack direction="column" width={`calc(100% - ${isListLayout ? '300px' : 'unset'})`}>
              <CardHeader
                subheader={
                  <>
                    <Stack justifyContent="space-between" alignItems="center" direction="row">
                      <Skeleton variant="text" height={32} width="40%" />
                      <Skeleton variant="text" height={25} width={120} />
                    </Stack>
                    <Stack justifyContent="space-between" className="mb-4" direction="row">
                      <Skeleton variant="text" height={30} width={150} />
                      <Skeleton variant="text" height={30} width={90} />
                    </Stack>
                    <Stack className="gap-1" direction="row">
                      <Skeleton variant="text" height={32} width={80} />
                      <Skeleton variant="text" height={32} width={80} />
                      <Skeleton variant="text" height={32} width={80} />
                    </Stack>
                  </>
                }
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <Skeleton variant="text" height={60} />
                </Typography>
              </CardContent>
            </Stack>
          </Stack>
        </CardActionArea>
        <CardActions className="pb-0 items-start">
          <Skeleton className="my-2" variant="circular" height={40} width={40}>
            <RecipeSpeedDial ariaLabel="loading" />
          </Skeleton>
        </CardActions>
      </Stack>
    </Card>
  ) : (
    <Card>
      <Dialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete this recipe? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <LoadingButton onClick={() => dispatchDelete()} autoFocus loading={isDeleting} disabled={isDeleting}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Stack direction={isListLayout ? 'row' : 'column'} width="100%">
        <CardActionArea
          onClick={() => {
            dispatch(clearRecipes());
            router.push(`/recipes/view/${recipeId}`);
          }}
        >
          <Stack direction={isListLayout ? 'row' : 'column'} width="100%" height="100%">
            {imagePath ? (
              <CardMedia
                component="img"
                image={imagePath}
                alt="recipe"
                height={isListLayout ? '100%' : '300px'}
                sx={{ width: isListLayout ? '300px' : '100%' }}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: stringToColor(title),
                  height: isListLayout ? '100%' : '300px',
                  width: isListLayout ? '300px' : '100%'
                }}
                variant="square"
              >
                <Typography variant="h2">{abbreviateTitle(title)}</Typography>
              </Avatar>
            )}
            <Stack direction="column" width="100%">
              <CardHeader
                subheader={
                  <>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h5" color={theme.palette.common.white}>
                        {title}
                      </Typography>
                      <Typography>{formatDate(dateCreated)}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" className="mb-4">
                      <StyledRating name="read-only" value={rating} readOnly size="large" />
                      <EffortRating
                        name="read-only"
                        value={effort}
                        readOnly
                        size="large"
                        icon={<TbRectangleFilled />}
                        emptyIcon={<TbRectangle />}
                        max={3}
                      />
                    </Stack>
                    {recipeCategories.map((recipeCategory) => (
                      <Chip
                        className="mr-1"
                        key={recipeCategory.id}
                        label={recipeCategory.category.value}
                        variant="outlined"
                      />
                    ))}
                  </>
                }
              />
              <CardContent>
                <Typography sx={{ minHeight: '60px' }} variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
            </Stack>
          </Stack>
        </CardActionArea>
        <CardActions className="pb-0 items-center">
          <RecipeSpeedDial
            ariaLabel="recipe actions"
            icon={<RecipeSpeedDialIcon icon={isListLayout ? <FaChevronDown /> : <FaChevronRight />} />}
            open={openSpeedDial}
            onClick={() => setOpenSpeedDial(!openSpeedDial)}
            onOpen={() => setOpenSpeedDial(true)}
            onClose={() => setOpenSpeedDial(false)}
            direction={isListLayout ? 'down' : 'right'}
          >
            {buttonActions.map((action) => (
              <RecipeSpeedDialAction
                key={action.title}
                icon={action.icon}
                tooltipTitle={action.title}
                aria-label={action.ariaLabel}
                onClick={() => {
                  setOpenSpeedDial(false);
                  action.command();
                }}
              />
            ))}
          </RecipeSpeedDial>
        </CardActions>
      </Stack>
    </Card>
  );
}
