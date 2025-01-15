import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ErrorPage from '../Pages/ErrorPage'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import SignUp from '../Pages/SignUp/SignUp'
import DashboardLayout from '../layouts/DashboardLayout'
import PrivateRoute from './PrivetRoutes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      
      
      
    ],
  },
])
