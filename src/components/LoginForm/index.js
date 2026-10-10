import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';
import emailValidator from 'email-validator';

export default function LoginForm() {
  const [showAlert, setShowAlert] = useState('');
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });

  const validateForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = (data.get('email') || '').toString().trim();
    const password = (data.get('password') || '').toString();
    const nextErrors = { email: '', password: '' };

    if (!email || !emailValidator.validate(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters long.';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      nextErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    setFormErrors(nextErrors);
    const isValid = !nextErrors.email && !nextErrors.password;
    setShowAlert(isValid ? 'Login Successful' : '');

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm(event);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email' || name === 'password') {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (showAlert) {
      setShowAlert('');
    }
    if (name === 'password' && value && value.length < 8 && value.length > 0) {
      setFormErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters long.' }));
    }
  };

  return (
    <>
      {showAlert &&
        <Snackbar
          open={Boolean(showAlert)}
          autoHideDuration={6000}
          onClose={() => setShowAlert('')}
          message={showAlert}
        >
          <Alert severity="success">{showAlert}</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(formErrors.email)}
              helperText={formErrors.email || ' '}
              onChange={handleFieldChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(formErrors.password)}
              helperText={formErrors.password || ' '}
              onChange={handleFieldChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
