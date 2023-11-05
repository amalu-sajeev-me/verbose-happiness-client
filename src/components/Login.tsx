
import { Copyright } from './Copyright';
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { IApiResponse, useAxios } from '../hooks/useAxios';
import { Loader } from './Loader';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useAuth } from './auth/AuthContext';

export const Login = function () {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const { login, isAuthenticated } = useAuth();
  const api = useAxios();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try { 
      event.preventDefault();
      setLoading(true);
      const data = new FormData(event.currentTarget);
      const payload = {
          email: data.get('email'),
          password: data.get('password'),
      };
      const apiResponse = (await api.post(`/user/login`, payload, { validateStatus: Boolean }));
      const {responseData} = apiResponse.data as IApiResponse<Record<'token', string>>;
      if (apiResponse.status === 200) {
        login(responseData.token);
        navigate('/dashboard');
      } else throw new Error('invalid credentials')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'error occured';
      setLoading(false);
      enqueueSnackbar({
        variant: 'error',
        message: errorMessage
      });
    }
    
  };

  return isAuthenticated
    ? (<Navigate to="/dashboard" />)
    : (
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/new">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
        <Loader open={loading} />
      </Container>
  );
}