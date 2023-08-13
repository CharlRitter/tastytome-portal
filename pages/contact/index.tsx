import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Button, Grid, Paper, TextField } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import PageContainer from '@/components/page-container';

export default function Contact(): ReactElement {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const handleSubmit = (event) => {
    // TODO
    event.preventDefault();

    if (!isCaptchaVerified) {
      // Captcha not verified, display error or prevent form submission
    }

    // Handle form submission logic here
  };

  return (
    <PageContainer>
      <Paper classes={{ root: 'main' }} component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              required
              fullWidth
              onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              required
              fullWidth
              onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              required
              fullWidth
              onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setMessage(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" size="invisible" onChange={() => setIsCaptchaVerified(true)} />
          </Grid>
          <Grid item xs={12}>
            <Button type="button" variant="contained" color="primary" disabled={!name || !email || !message}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}
