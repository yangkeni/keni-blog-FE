import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
// import Post from './pages/Post/Post';
// import Write from './pages/Write/Write';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import { useCurUser } from './hooks';

const Write = React.lazy(() => import('./pages/Write/Write'));

const Post = React.lazy(() => import('./pages/Post/Post'));

// const Register = React.lazy(() => import('./pages/Register/Register'));
const Login = React.lazy(() => import('./pages/Login/Login'));


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
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Post />
          </React.Suspense>
        ),
      },
      {
        path: '/write/:id?',
        // element: <Write />,
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Write />
          </React.Suspense>
        ),
      },
    ],
  },
  // {
  //   path: '/register',
  //   element: (
  //     <React.Suspense fallback={<div>Loading...</div>}>
  //       <Register />
  //     </React.Suspense>
  //   ),
  // },
  {
    path: '/login',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Login />
      </React.Suspense>
    ),
  },
]);

export default router;
