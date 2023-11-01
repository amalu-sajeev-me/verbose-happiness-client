import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material/styles';


import App from './App.tsx'
import './index.css'
import { Signup } from './components/SignUp.tsx';
import { Dashboard } from './components/dashboard/Dashboard.tsx';
import { Login } from './components/Login.tsx';
import { FileUpload } from './components/FileUpload.tsx';



const theme = createTheme({
   direction: 'rtl',
   // other theme properties
});

const routerFromElements = createRoutesFromElements(
<Route path="/" >
      <Route index element={<Navigate to="/login" />} />
      <Route path="login" element={<Login />} />
      <Route path="new" element={<Signup />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Navigate to="upload" />} />
        <Route path="upload" element={<FileUpload />} />
        {/* <Route path="files" element={<FilesComponent />} /> */}
      </Route>
    </Route>
);

const router = createBrowserRouter(routerFromElements)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
