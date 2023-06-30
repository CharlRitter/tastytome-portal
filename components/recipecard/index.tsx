import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Stack, Typography } from '@mui/material';
import { FaCopy, FaEllipsisV, FaPlus, FaShareAlt, FaTrash } from 'react-icons/fa';
import { RecipeSpeedDial, RecipeSpeedDialAction, RecipeSpeedDialIcon, RecipeSpeedDialWrapper } from './styled';

export default function RecipeCard(props: { isListLayout: boolean }) {
  const { isListLayout } = props;
  const speedDialActions = [
    { icon: <FaShareAlt />, name: 'Share', ariaLabel: 'share' },
    { icon: <FaCopy />, name: 'Duplicate', ariaLabel: 'duplicate' },
    { icon: <FaTrash />, name: 'Delete', ariaLabel: 'delete' }
  ];
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);

  return (
    <Card classes={{ root: 'main' }} sx={{ display: 'flex', flexDirection: isListLayout ? 'grid' : 'column' }}>
      {isListLayout ? (
        <CardMedia component="img" image="/images/pancakes.jpg" alt="recipe" height="200" sx={{ width: '300px' }} />
      ) : (
        <CardMedia component="img" image="/images/pancakes.jpg" alt="recipe" height="200" />
      )}
      <Stack direction="column" width="100%">
        <CardHeader
          action={
            <RecipeSpeedDialWrapper>
              <RecipeSpeedDial
                ariaLabel="recipe actions"
                icon={<RecipeSpeedDialIcon icon={<FaEllipsisV />} openIcon={<FaPlus />} />}
                open={openSpeedDial}
                onClick={() => setOpenSpeedDial(!openSpeedDial)}
                onOpen={() => setOpenSpeedDial(true)}
                onClose={() => setOpenSpeedDial(false)}
                direction="down"
              >
                {speedDialActions.map((action) => (
                  <RecipeSpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    aria-label={action.ariaLabel}
                    onClick={() => setOpenSpeedDial(false)}
                  />
                ))}
              </RecipeSpeedDial>
            </RecipeSpeedDialWrapper>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup
            of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
      </Stack>
    </Card>
  );
}
