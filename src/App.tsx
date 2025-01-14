import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { Login } from './pages/auth-module/Login';
import './App.css';

const Layout = lazy(() => import("./main/Layout"));
const MainCar = lazy(() => import("./pages/panel-user-module/Car/MainCar"));
const MainService = lazy(() => import("./pages/panel-user-module/MaintenanceService/MainService"));

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
      path: "manager",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        { path: "car", element: <MainCar /> },
        { path: "services/:id", element: <MainService /> },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
