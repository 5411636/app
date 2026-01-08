// src/store/arraySlice.js
import { createSlice } from '@reduxjs/toolkit';

// 从本地存储中读取初始数据（数据持久化）
const STORAGE_KEY = 'searchHistory';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('读取本地搜索历史失败:', e);
    return [];
  }
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('保存本地搜索历史失败:', e);
  }
};

// 初始状态：从本地恢复
const initialState = {
  data: loadFromStorage() // 用于存储目标数组
};

export const arraySlice = createSlice({
  name: 'array', // Slice名称（唯一）
  initialState,
  reducers: {
    // Action 1：设置（覆盖）整个数组
    setArray: (state, action) => {
      // action.payload 就是要存入的数组
      state.data = action.payload;
      saveToStorage(state.data);
    },
    // Action 2：在数组前面追加元素（新的在前，旧的在后）
    appendArray: (state, action) => {
      // 把新元素/新数组追加到数组前面，实现“向前添加”
      state.data = [...action.payload, ...state.data];
      saveToStorage(state.data);
    }
  }
});

// 导出Action（供组件调用）
export const { setArray, appendArray } = arraySlice.actions;

// 导出reducer（供Store配置）
export default arraySlice.reducer;