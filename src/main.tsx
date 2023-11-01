import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import App from './App.tsx'
import './index.css'
import { Signup } from './components/SignUp.tsx';
import { Dashboard } from './components/Dashboard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/new',
    element: <Signup />
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <RouterProvider {...{router}} />
    </SnackbarProvider>
  </React.StrictMode>,
)
