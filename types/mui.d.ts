import { CommonColors } from '@mui/material/styles/createPalette';
import { customCommonColors } from '@/public/theme/colours';

type CustomCommonColors = typeof customCommonColors;

declare module '@mui/material/styles/createPalette' {
  interface CommonColors extends CustomCommonColors {}
}
