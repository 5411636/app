// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import arrayReducer from './arraySlice';

export const store = configureStore({
  reducer: {
    array: arrayReducer // 仅保留数组模块
  }
});