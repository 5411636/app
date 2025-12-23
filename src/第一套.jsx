import { Component } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, Flex } from 'antd'
import { Radio } from 'antd'
import { Image } from 'antd'
import { Form, Input } from 'antd'
import axios from 'axios'
import './App.css'

//类组件
export default class App extends Component {
  componentDidMount() {
    this.getlist()
  }
  state = {
    list: [],
    search: '',
     options : [
      { label: '全部', value: '全部' },
      { label: '北京', value: '北京' },
      { label: '上海', value: '上海' },
      { label: '广州', value: '广州' },
      { label: '深圳', value: '深圳' },
    ],
    shai:'全部',
    di:0,
    gao:0,
    suo:false,
    
  }

  
  async getlist() {
    const prams = {

    }
    if (this.state.search != 0) {
      prams.name = this.state.search
    }
    if(this.state.shai!='全部'){
      prams.address=this.state.shai

    }
    if(this.state.gao!=0){
   
      prams.mian_lte = this.state.gao
      prams.mian_gte = this.state.di
    }
    
    const res = await axios.get('http://localhost:3000/list', { params: prams })
    this.setState({
      list: res.data
    })

    console.log(this.state.list);

  };

  changesearch(e) {
    this.setState({
      search: e.target.value
    })
  }
  searchval() {
    this.getlist()
  }
  shai(e){
    this.setState({
      shai:e.target.value
    },()=>{
      this.getlist()
    })
    console.log(111);
  }
  bangdi(e){
    this.setState({
      di:e.target.value
    })
  }
  jia(e){
    this.setState({
      gao:e.target.value
    })
  }

  render() {
    return (

      <div>
        {/* 搜索 */}

        <div><Input placeholder='请输入小区名或地址' value={this.state.search} onChange={(e) => this.changesearch(e)} style={{ width: '200px' }} /> <Button onClick={() => this.searchval()}>搜索</Button></div>
        {/* 筛选 */}
        <Radio.Group
          block
          options={this.state.options}
          defaultValue="全部"
          optionType="button"
          buttonStyle="solid"
          style={{width: '300px'}}
          onChange={(e)=>this.shai(e)}
         
         
        />
        
        <Input value={this.state.di} onChange={(e)=>this.bangdi(e)} style={{width:'200px'}}/>---<Input style={{width:'200px'}} value={this.state.gao} onChange={(e)=>this.jia(e)}/>
       <Button>面积排序</Button>
        <ul style={
          {
            // 去掉ul的默认样式
            listStyle: 'none',
            padding: 0,
            margin: 0,

          }
        }>
          {this.state.list.map((item) => (
            <li key={item.id}>
              <div style={
                {
                  display: 'flex',
                  margin: '20px 0',
                }
              }>
                <Image
                  width={120}
                  alt="basic"
                  src={item.img}
                  height={100}
                />
                <div >
                  <p>{item.name}</p>
                  <p>{item.jian}</p>
                </div>
                <div style={{
                  marginLeft: '20px',
                }}>
                  <h3>{item.mian}m2</h3>
                </div>
              </div>
            </li>
          ))
          }
        </ul>
      </div>
    )
  }

}


