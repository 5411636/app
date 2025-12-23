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
      { label: '', value: '' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ]

  }

  
  async getlist() {
    const prams = {

    }
    if (this.state.search != '') {
      prams.name = this.state.search
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


  render() {
    return (

      <div>
        {/* 搜索 */}

        <div><Input placeholder='请输入小区名或地址' value={this.state.search} onChange={(e) => this.changesearch(e)} style={{ width: '200px' }} /> <Button onClick={() => this.searchval()}>搜索</Button></div>
        {/* 筛选 */}
        <Radio.Group
          block
          options={this.state.options}
          defaultValue="Apple"
          optionType="button"
          buttonStyle="solid"
          style={{width: '100px'}}
        />
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


