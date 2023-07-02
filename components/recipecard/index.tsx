import React, { useState } from 'react';
import router from 'next/router';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
  CardActionArea,
  useMediaQuery
} from '@mui/material';
import { FaChevronDown, FaChevronRight, FaCopy, FaShareAlt, FaTrash } from 'react-icons/fa';
import { RecipeCardActions, RecipeSpeedDial, RecipeSpeedDialAction, RecipeSpeedDialIcon } from './styled';

export default function RecipeCard(props: {
  isListLayout: boolean;
  title: string;
  dateCreated: string;
  description: string;
  imagePath: string;
  recipeID: number;
}) {
  const { title, dateCreated, description, imagePath, recipeID } = props;
  const [openSpeedDial, setOpenSpeedDial] = useState<boolean>(false);
  const isListLayout = useMediaQuery('(max-width: 899px)') ? false : props.isListLayout;

  const buttonActions = [
    { icon: <FaShareAlt />, title: 'Share', ariaLabel: 'share' },
    { icon: <FaCopy />, title: 'Duplicate', ariaLabel: 'duplicate' },
    { icon: <FaTrash />, title: 'Delete', ariaLabel: 'delete' }
  ];

  return (
    <Card>
      <Stack direction={isListLayout ? 'row' : 'column'}>
        <CardActionArea onClick={() => router.push(`/recipes/${recipeID}`)}>
          <Stack direction={isListLayout ? 'row' : 'column'}>
            <CardMedia
              component="img"
              image={imagePath}
              alt="recipe"
              height={isListLayout ? '250px' : '300px'}
              sx={{ width: isListLayout ? '300px' : 'unset' }}
            />
            <Stack direction="column">
              <CardHeader title={title} subheader={dateCreated} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
            </Stack>
          </Stack>
        </CardActionArea>
        <RecipeCardActions islistlayout={isListLayout ? 'true' : ''}>
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
