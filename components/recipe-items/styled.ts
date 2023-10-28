import { Autocomplete, Box, IconButton, TextField, styled } from '@mui/material';

export const ListContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  color: theme.palette.text.secondary,
  borderRadius: '5px',
  padding: '15px'
})) as typeof Box;

export const SendButton = styled(IconButton)(() => ({
  height: '40px'
})) as typeof IconButton;

export const AdditionalInputAutocomplete = styled(Autocomplete)(() => ({
  maxWidth: '200px',
  width: '100%'
})) as typeof Autocomplete;

export const AdditionalInputTextField = styled(TextField)(() => ({
  maxWidth: '200px',
  width: '100%'
})) as typeof TextField;
