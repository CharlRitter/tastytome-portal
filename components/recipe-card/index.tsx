import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Skeleton,
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
  Button
} from '@mui/material';
import { FaChevronDown, FaChevronRight, FaCopy, FaShareAlt, FaTrash } from 'react-icons/fa';
import { TbRectangle, TbRectangleFilled } from 'react-icons/tb';
import { AbbreviateTitle, FormatDate, StringToColor } from '@/utils/common';
import { deleteRecipe } from '@/slices/recipeSlice';
import { RecipeCategory } from '@/types/recipe';
import { DifficultyRating, StyledRating } from '@/public/theme/globalStyled';
import { RecipeSpeedDial, RecipeSpeedDialAction, RecipeSpeedDialIcon } from './styled';

export default function RecipeCard(props: {
  isListLayout: boolean;
  title: string;
  dateCreated: string;
  description: string;
  recipeCategories: RecipeCategory[];
  recipeID: number;
  imagePath?: string | null;
  rating?: number;
  effort?: number;
  loading?: boolean;
}): ReactElement {
  const { title, dateCreated, description, recipeCategories, imagePath, recipeID, loading, rating, effort } = props;

  const theme = useTheme();
  const dispatch = useDispatch();
  const [openSpeedDial, setOpenSpeedDial] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const isListLayout = useMediaQuery('(max-width: 899px)') ? false : props.isListLayout;

  const buttonActions = [
    { icon: <FaShareAlt />, title: 'Share', ariaLabel: 'share', command: () => {} },
    {
      icon: <FaCopy />,
      title: 'Duplicate',
      ariaLabel: 'duplicate',
      command: () => router.push(`/recipes/add/${recipeID}`)
    },
    { icon: <FaTrash />, title: 'Delete', ariaLabel: 'delete', command: () => setDeleteConfirmation(true) }
  ];

  return loading ? (
    <Card>
      <Stack direction={isListLayout ? 'row' : 'column'} width="100%">
        <Stack direction={isListLayout ? 'row' : 'column'} width="100%">
          <Skeleton variant="rounded" width={isListLayout ? 300 : 'unset'} height={isListLayout ? 250 : 300} />
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
          <Button onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
          <Button onClick={() => dispatch(deleteRecipe(recipeID))} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Stack direction={isListLayout ? 'row' : 'column'} width="100%">
        <CardActionArea onClick={() => router.push(`/recipes/${recipeID}`)}>
          <Stack direction={isListLayout ? 'row' : 'column'} width="100%">
            {imagePath ? (
              <CardMedia
                component="img"
                image={imagePath}
                alt="recipe"
                height={isListLayout ? '250px' : '300px'}
                sx={{ width: isListLayout ? '300px' : 'unset' }}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: StringToColor(title),
                  width: isListLayout ? '300px' : 'unset',
                  height: isListLayout ? '250px' : '300px'
                }}
                variant="square"
              >
                <Typography variant="h2">{AbbreviateTitle(title)}</Typography>
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
                      <Typography>{FormatDate(dateCreated)}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" className="mb-4">
                      <StyledRating name="read-only" value={rating} readOnly size="large" />
                      <DifficultyRating
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
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
            </Stack>
          </Stack>
        </CardActionArea>
        <CardActions
          sx={{
            height: isListLayout ? 'unset' : '50px',
            justifyContent: isListLayout ? 'center' : 'unset',
            width: isListLayout ? '50px' : 'unset'
          }}
          className="pb-0 pt-0 flex items-center"
        >
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
