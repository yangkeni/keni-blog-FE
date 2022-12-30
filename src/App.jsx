import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { RecoilRoot } from 'recoil';
import router from './RouterMap';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm, // 深色模式的antd
      }}
    >
      <RecoilRoot>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </RecoilRoot>
    </ConfigProvider>
  );
};

export default App;
