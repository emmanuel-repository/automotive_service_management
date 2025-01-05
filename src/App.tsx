import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/auth-module/Login'
import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';

const Layout = lazy(() => import("./main/Layout"));
const MainCar = lazy(() => import("./pages/panel-user-module/Car/MainCar"));

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { 
      path: "manager", 
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        { path: "car", element: <MainCar /> },
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
