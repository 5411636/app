import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'react-vant';
import { setArray, appendArray } from '../store/arraySlice';
const navigator = (url) => {
  window.location.href = url;
}
const SearchPage = () => {
  const dispatch = useDispatch();
  const historylist = useSelector((state) => state.array.data);
  const [value, setValue] = useState('');

  const handleSearch = (value) => {

    if (value) {
      dispatch(appendArray([value]));
      setValue('');
    }
    //当数组超过10条时删除最后一条
    if (historylist.length > 9) {
      dispatch(setArray(historylist.slice(0, 9)));
    }
    localStorage.setItem('name', JSON.stringify(value));
    navigator('/')
  }
  const clear = () => {
    dispatch(setArray([]));
  }
  const qian = (item) => {
    //点击时将本条数据放到数组最前面
    dispatch(setArray([item, ...historylist.filter((i) => i !== item)]));
    localStorage.setItem('name', JSON.stringify(item));
    navigator('/')
  }

 

  return (
    <div style={{ padding: '12px' }}>
      <Search
        value={value}
        onChange={setValue}
        showAction
        placeholder="请输入搜索关键词"
        onSearch={handleSearch}
        actionText={
          <div onClick={() => handleSearch(value)}>搜索</div>
        }
      />
      <div>
        历史记录 &nbsp; <span onClick={clear}>清空历史记录</span>
        <p>
          {
          
            historylist.map((item, index) => {
              return  <span onClick={()=>qian(item)} style={{marginLeft:'20px'}} key={index}>{item}</span>
            })
          }
        </p>
      </div>

    </div>
  );
};

export default SearchPage;