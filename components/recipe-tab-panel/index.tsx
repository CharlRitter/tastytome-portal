import { Box } from '@mui/material';
import React, { JSX, ReactNode } from 'react';

export type RecipeTabPanelProps = {
  children: ReactNode;
  index: number;
  value: number;
};

export function RecipeTabPanel(props: RecipeTabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <Box
      className="w-full"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}``
    </Box>
  );
}
