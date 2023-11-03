
import { Link, useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    ThemeProvider,
    Typography,
    createTheme
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { Copyright } from './Copyright';
import { useState } from 'react';
import { useAxios } from '../hooks/useAxios';
import { Loader } from './Loader';
import { IAPIResponse } from '../types/APIResponse.type';

const defaultTheme = createTheme();

export const Signup = function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
    const api = useAxios();
    const navigate = useNavigate();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      setButtonDisabled(true);
      setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        email: data.get('email'),
        password: data.get('password'),                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    }
    try {
        const {data: apiResponse} = await api.post(`/user/new`, payload, {validateStatus: () => true});
        const { statusCode, responseData } = apiResponse as IAPIResponse;
          if (statusCode === 200) {
          setLoading(false);
          enqueueSnackbar(
            {
              variant: 'success',
              message: 'succesfully created account'
            });
          setTimeout(() => {
              navigate('/');
          }, 1000);
        } else {
            const { info } = responseData.error as { message: string;  info: string};
            throw new Error(info);
        }
    } catch (error) {
        const errmessage = error instanceof Error ? error.message : '';
      setLoading(false);
      setButtonDisabled(false);
        enqueueSnackbar({
              variant: 'error',
              message: errmessage
        });
      }
        
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={buttonDisabled}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Loader open={loading} />
    </ThemeProvider>
  );
}