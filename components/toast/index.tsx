import { Alert, Snackbar, Typography } from '@mui/material';
import React, { JSX } from 'react';

export type ToastParams = {
  open: boolean;
  message: string;
  severity: 'error' | 'info' | 'success' | 'warning';
};

export type ToastProps = {
  onClose: () => void;
} & ToastParams;

export function Toast(props: ToastProps): JSX.Element {
  const { open, onClose, message, severity } = props;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        <Typography>{message}</Typography>
      </Alert>
    </Snackbar>
  );
}
