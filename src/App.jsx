import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from "antd";
import router from './RouterMap';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </ConfigProvider>
  );
};

export default App;
