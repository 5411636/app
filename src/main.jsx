// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // 引入Redux的Provider
import { store } from './store'; // 引入你配置的Redux store
import { RouterProvider } from 'react-router-dom'; // 你的路由组件
import router from './router/index'; // 你的路由配置

// 用Provider包裹RouterProvider，注入store到整个应用
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);