import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.less';

// 热更新
if (module.hot) {
  module.hot.accept(err => {
    if(err) {
      console.log(err);
    }
  })
}
window.onload = () => {
  import(/* webpackPrefetch: true */ './pages/Post/Post');
  import(/* webpackPrefetch: true */ './pages/Write/Write');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
