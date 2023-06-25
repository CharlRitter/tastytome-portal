import React, { useState } from 'react';
import { Button, Grid, Paper, TextField } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import PageContainer from '@/components/pagecontainer';

export default function Contact() {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
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
      <Paper classes={{ root: 'main' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Name" variant="outlined" required fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" variant="outlined" type="email" required fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Message" variant="outlined" multiline rows={4} required fullWidth />
            </Grid>
            <Grid item xs={12}>
              <ReCAPTCHA
                sitekey="YOUR_RECAPTCHA_SITE_KEY"
                size="invisible"
                onChange={() => setIsCaptchaVerified(true)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </PageContainer>
  );
}
