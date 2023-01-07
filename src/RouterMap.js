import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Write from './pages/Write/Write';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import { useCurUser } from './hooks';

const Layout = () => {
  // const { curUser } = useCurUser();
  // return curUser ? (
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
  // ) : (
  //   <Navigate to={'/login'} />
  // );
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
        path: '/write?/:id',
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
