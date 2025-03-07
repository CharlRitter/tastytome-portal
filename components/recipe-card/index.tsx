import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import router from 'next/router';
import React, { JSX, useState } from 'react';
import { FaBookmark, FaChevronDown, FaChevronRight, FaCopy, FaEdit, FaTrash } from 'react-icons/fa';
import { TbRectangle, TbRectangleFilled } from 'react-icons/tb';

import { Toast, ToastParams } from '@/components/toast';
import { EffortRating, StyledRating } from '@/components/styled-components';
import { useAppDispatch } from '@/reducers/hooks';
import { deleteRecipe, removeRecipes } from '@/slices/recipeSlice';
import { RecipeCategory } from '@/types/recipe';
import { abbreviateTitle, formatDate, stringToColor } from '@/utils/common';

import { BookmarkedIcon, RecipeSpeedDial, RecipeSpeedDialAction, RecipeSpeedDialIcon } from './styled';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export type RecipeCardProps = {
  isListLayout: boolean;
  title: string;
  dateCreated: string;
  description: string;
  recipeCategories: RecipeCategory[];
  recipeId: number;
  imagePath: string | null;
  rating: number;
  effort: number;
  bookmarked: boolean;
};

export function RecipeCard(props: RecipeCardProps): JSX.Element {
  const {
    title,
    dateCreated,
    description,
    recipeCategories,
    imagePath,
    recipeId,
    rating,
    effort,
    bookmarked,
    isListLayout: propIsListLayout
  } = props;

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [openSpeedDial, setOpenSpeedDial] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastParams>({ open: false, message: '', severity: 'error' });
  const isLG = useMediaQuery(theme.breakpoints.down('lg'));

  const isListLayout = isLG ? false : propIsListLayout;

  const buttonActions = [
    {
      icon: <FaEdit />,
      title: 'Edit',
      ariaLabel: 'edit',
      command: () => router.push(`/recipes/edit/${recipeId}`)
    },
    {
      icon: <FaCopy />,
      title: 'Duplicate',
      ariaLabel: 'duplicate',
      command: () => router.push(`/recipes/add/${recipeId}`)
    },
    { icon: <FaTrash />, title: 'Delete', ariaLabel: 'delete', command: () => setDeleteConfirmation(true) }
  ];

  async function dispatchDelete() {
    setIsDeleting(true);
    setDeleteConfirmation(false);

    const action = await dispatch(deleteRecipe({ recipeId }));
    dispatch(removeRecipes(recipeId));

    if (isRejectedWithValue(action)) {
      setToast({
        open: true,
        message: `Error while deleting recipe - ${action.error.message}`,
        severity: 'error'
      });
    }

    setIsDeleting(false);
  }

  return (
    <Card>
      <Toast
        open={toast.open}
        onClose={() => setToast({ open: false, message: '', severity: 'error' })}
        severity={toast.severity}
        message={toast.message}
      />
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
            router.push(`/recipes/view/${recipeId}`);
          }}
        >
          <Stack direction={isListLayout ? 'row' : 'column'} width="100%" height="100%">
            {bookmarked && (
              <BookmarkedIcon color="primary">
                <FaBookmark />
              </BookmarkedIcon>
            )}
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
                <Typography
                  sx={{ maxHeight: '20px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                  variant="body2"
                  color="text.secondary"
                >
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
