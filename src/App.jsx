import React, { Component } from 'react'
import axios from 'axios'
import { Input } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
export default class App extends Component {
    componentDidMount(){
      this.getlist()
    }
     state = {
        list:[],
        shi:'',
        ceid:0,
        ceti:''
    }
    async getlist (){
      const res = await axios.get('http://localhost:3000/list')
      this.setState({
        list:res.data
      })
      
      
    }
    async onChange(e,item){
        const res = await axios.patch(`http://localhost:3000/list/${item.id}`,{
          state:e.target.checked
        })
        this.getlist()
    }
    bang(e){
      this.setState({
        shi:e.target.value
      })
    }
    async an(e){
        const res = await axios.post('http://localhost:3000/list',{
          title:this.state.shi,
          state:false,
          id:Date.now()
        })
        this.getlist()
        this.state.shi = ''
    }
    async del(e,id){
        const res = await axios.delete(`http://localhost:3000/list/${id}`)
        this.getlist()
        
    }
    async ci(e,item){
        this.setState({
            ceid:item.id,
            ceti:item.title
        })
        
    }
    async bang(e){
        this.setState({
            ceti:e.target.value
        })
    }
    async gai(e,id){
        const res = await axios.patch(`http://localhost:3000/list/${id}`,{
          title:this.state.ceti
        })
        this.getlist()
        this.setState({
            ceid:0

        })
    }
     
    
    
  render() {
    const unchecked = this.state.list.filter(item=>!item.state).length
    const checked = this.state.list.filter(item=>item.state).length
    return(
      <div>
        <h1>正在进行中 {unchecked}</h1>
       <Input placeholder="请输入事件" value={this.state.shi} onChange={(e)=>this.bang(e)} onPressEnter={(e)=>this.an(e)} style={{width:'400px'}}  />
       
       <ul>
        {
            this.state.list.map((item,index)=>{
              return(
                <li key={index} style={{
                    display:item.state?'none':'block'
                }}>
                  <Checkbox checked={item.state} onChange={(e)=>this.onChange(e,item)}></Checkbox>
                  <span style={{
                    display:item.id===this.state.ceid?'none':'inline'
                  }} onClick={(e)=>this.ci(e,item)}>{item.title}</span>
                  <Input onPressEnter={(e)=>this.gai(e,item.id)}  onChange={(e)=>this.bang(e)} value={this.state.ceti} style={{
                    display:item.id===this.state.ceid?'inline':'none',
                    width:'200px'
                  }}/>
                  <button onClick={(e)=>this.del(e,item.id)}>删除</button>
                </li> 
              )
            })
        }
       </ul>
       <h1>已完成 {checked}</h1>
       <ul>
        {
            this.state.list.map((item,index)=>{
              return(
                <li key={index} style={{
                    display:!item.state?'none':'block' 
                }}>
                  <Checkbox checked={item.state} onChange={(e)=>this.onChange(e,item)}></Checkbox>
                  <span>{item.title}</span>
                </li>
              )
            })
        }
       </ul>
      </div>
    )
  }
}
