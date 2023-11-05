import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './index.css'
import { Signup } from './components/SignUp.tsx';
import { Dashboard } from './components/dashboard/Dashboard.tsx';
import { Login } from './components/Login.tsx';
import { FileUpload } from './components/FileUpload.tsx';
import { ViewFiles } from './components/ViewFiles.tsx';
import { FileOpenView } from './components/FileOpenView.tsx';
import App from './App.tsx';
import { AuthProvider } from './components/auth/AuthContext.tsx';
import { Logout } from './components/Logout.tsx';



const theme = createTheme({
   direction: 'rtl',
   // other theme properties
});

const routerFromElements = createRoutesFromElements(
<Route path="/" element={<App />}>
      <Route index element={<Navigate to="/login" />} />
      <Route path="login" element={<Login />} />
      <Route path="new" element={<Signup />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Navigate to="upload" />} />
        <Route path="upload" element={<FileUpload />} />
        <Route path="files">
          <Route index element={<Navigate to="1" />} />
          <Route path=":pageNumber" element={<ViewFiles />} />
        </Route>
        <Route path="view">
        <Route path=":fileId" element={<FileOpenView />} />
        </Route>
      </Route>
      <Route path="logout" element={<Logout />} />
    </Route>
);

const router = createBrowserRouter(routerFromElements)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
