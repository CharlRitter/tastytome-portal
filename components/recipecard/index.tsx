import React, { ReactElement, useState } from 'react';
import router from 'next/router';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Skeleton,
  Stack,
  Typography,
  CardActionArea,
  useMediaQuery,
  Chip
} from '@mui/material';
import { FaChevronDown, FaChevronRight, FaCopy, FaShareAlt, FaTrash } from 'react-icons/fa';
import { AbbreviateTitle, StringToColor } from '@/utils/common';
import { RecipeCardActions, RecipeSpeedDial, RecipeSpeedDialAction, RecipeSpeedDialIcon } from './styled';

export default function RecipeCard(props: {
  isListLayout: boolean;
  title: string;
  dateCreated: string;
  description: string;
  categories: string[];
  recipeID: number;
  imagePath?: string;
  rating?: number;
  loading?: boolean;
}): ReactElement {
  const { title, dateCreated, description, categories, imagePath, recipeID, loading, rating } = props;
  const [openSpeedDial, setOpenSpeedDial] = useState<boolean>(false);
  const isListLayout = useMediaQuery('(max-width: 899px)') ? false : props.isListLayout;

  const buttonActions = [
    { icon: <FaShareAlt />, title: 'Share', ariaLabel: 'share' },
    { icon: <FaCopy />, title: 'Duplicate', ariaLabel: 'duplicate' },
    { icon: <FaTrash />, title: 'Delete', ariaLabel: 'delete' }
  ];

  return loading ? (
    <Card>
      <Stack direction={isListLayout ? 'row' : 'column'} width="100%">
        <Stack direction={isListLayout ? 'row' : 'column'} width="100%">
          <Skeleton variant="rounded" width={isListLayout ? 300 : 'unset'} height={isListLayout ? 250 : 300} />
          <Stack direction="column" width="100%">
            <CardContent>
              <Skeleton variant="text" height={50} width="50%" />
              <br></br>
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
                title={title}
                subheader={
                  <>
                    {dateCreated}
                    <br></br>
                    <Rating name="read-only" value={rating} readOnly />
                    <br></br>
                    {categories.map((category) => (
                      <Chip key={category} label={category} variant="outlined" />
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
        <RecipeCardActions
          sx={{
            height: isListLayout ? 'unset' : '50px',
            justifyContent: isListLayout ? 'center' : 'unset',
            width: isListLayout ? '50px' : 'unset'
          }}
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
                onClick={() => setOpenSpeedDial(false)}
              />
            ))}
          </RecipeSpeedDial>
        </RecipeCardActions>
      </Stack>
    </Card>
  );
}
