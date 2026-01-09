import  { useEffect, useState } from 'react'
import axios from 'axios'
import { ProductCard } from 'react-vant';
import { Tabs } from 'react-vant'
import { Popup } from 'react-vant';
import { List } from 'react-vant';
import { Search } from 'react-vant';
const navigator = (url) => {
  window.location.href = url
}
const list = () => {
  const [list, setList] = useState([]);
  const [popupState, setPopupState] = useState('');
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [total, setTotal] = useState(0);
  const [finished, setFinished] = useState(false);
  const name = JSON.parse(localStorage.getItem('name'))

  const getlist = async () => {
    const params = {
      _page: page,
      _limit: limit,
    }
    if(name != ''){
      params.name_like = name
    }
    const res = await axios.get('http://localhost:3000/list' ,{ params })
    setList([...list, ...res.data])
    setTotal(Number(res.headers['x-total-count']))
    if (list.length < total) {
      setFinished(true)
    }
    setPage(page + 1)

  };

  useEffect(() => {
    getlist();
  }, []);

  const onClose = () => {
    setPopupState('');
  };

  const huan = () => {
    setIndex(7);
    setPopupState('');
  };

  const onLoad = () => {
    const timer = setInterval(() => {
      getlist();
      if(list.length >= total){
        clearInterval(timer)
      }
    }, 1000);
  };

  const tiao = () => {
    navigator('/search');
  };

  return (
    <div>
      <Search
        showAction
        label="地址"
        actionText={<div onClick={tiao}>搜索</div>}
        placeholder="请输入搜索关键词"
      />
      <Tabs active={index} swipeable>
        <Tabs.TabPane title={'首页'}>
          <button onClick={() => setPopupState('top')}>更多</button>
          <List
            loadingText="加载中"
            offset="1"
            finishedText="没有更多数据了"
            finished={finished}
            onLoad={onLoad}
          >
            {list.map((item) => (
              <ProductCard
                title={item.name}
                thumb={item.img}
                key={item.id}
              />
            ))}
          </List>
        </Tabs.TabPane>
        <Tabs.TabPane title={`动画`}>下划线标签页 1</Tabs.TabPane>
        <Tabs.TabPane title={`番剧`}>下划线标签页 11</Tabs.TabPane>
        <Tabs.TabPane title={`国创`}>下划线标签页 111</Tabs.TabPane>
        <Tabs.TabPane title={`舞蹈`}>舞蹈</Tabs.TabPane>
        <Tabs.TabPane title={`生活`}>舞蹈</Tabs.TabPane>
        <Tabs.TabPane title={`美食`}>舞蹈</Tabs.TabPane>
        <Tabs.TabPane title={`军事`}>军事</Tabs.TabPane>
        <Tabs.TabPane title={`音乐`}>舞蹈</Tabs.TabPane>
        <Tabs.TabPane title={`学习`}>舞蹈</Tabs.TabPane>
      </Tabs>
      <Popup
        visible={popupState === 'top'}
        style={{ height: '30%' }}
        position="top"
        onClose={onClose}
      >
        <div>
          <Tabs defaultActive={index} swipeable>
            <Tabs.TabPane title={'首页'}></Tabs.TabPane>
            <Tabs.TabPane title={`动画`}></Tabs.TabPane>
            <Tabs.TabPane title={`番剧`}></Tabs.TabPane>
            <Tabs.TabPane title={`国创`}></Tabs.TabPane>
            <Tabs.TabPane title={`生活`}></Tabs.TabPane>
            <Tabs.TabPane title={`美食`}></Tabs.TabPane>
          </Tabs>
          <span onClick={huan}>军事</span>
          <span>音乐</span>
          <span>学习</span>
        </div>
      </Popup>
    </div>
  );
};

export default list
