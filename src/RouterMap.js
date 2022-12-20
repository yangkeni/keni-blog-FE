import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Write from './pages/Write/write';

const Layout = () => {
  return (
    <>
      aaa
      <Outlet />
      bbb
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post/:id',
        element: <Post />,
      },
      {
        path: '/write',
        element: <Write />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
