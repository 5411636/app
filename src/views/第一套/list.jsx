import React, { Component } from 'react'
import { Input } from 'antd';
import { Button } from 'antd';
import axios from 'axios'
export class list extends Component {
    componentDidMount() {
        this.getlist()
        this.getfu()
    }
    state = {
        username : JSON.parse(localStorage.getItem('username')),
        list : [],
        name: '',
        fu: []
    }
    async getlist(){
        const res = await axios.get('http://localhost:3000/list')
        this.setState({
            list : [...res.data].reverse()
        })

    }
    async getfu(){
        const res = await axios.get('http://localhost:3000/fu')
        this.setState({
            fu : res.data
        })

    }
    bian = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    async add(){
     
        const res = await axios.post('http://localhost:3000/list',{
            name : this.state.username,
            time : new Date().toLocaleString(),
            content : this.state.name,
            id: new Date().getTime()
        })
        this.setState({
            name : ''
        })
        this.getlist()

    }
    async del(id){
        const res = await axios.delete(`http://localhost:3000/list/${id}`)
        this.getlist()
    }
    async hui(id){
        const res = await axios.post('http://localhost:3000/fu',{
            name : this.state.username,
            time : new Date().toLocaleString(),
            content : this.state.name,
            id: new Date().getTime(),
            list_id:id
        })
        this.setState({
            name : ''
        })
        this.getlist()
        this.getfu()
    }
    async del1(id){
        const res = await axios.delete(`http://localhost:3000/fu/${id}`)
        this.getfu()
    }
  render() {
    return (
      <div>
        <p>用户名：{this.state.username}</p>
        <Input value={this.state.name} onChange={(e)=>this.bian(e)} placeholder="请输入留言" style={{width: '200px'}} />
        <Button onClick={()=>this.add()}>添加</Button>
        {
            this.state.list.map((item,index)=>{
                return <ul key={index}>
                    <li>{item.name}</li>
                    <li>{item.content}</li>
                    <li>{item.time}</li>
                    <Button onClick={()=>this.del(item.id)}>删除</Button>
                    <Button onClick={()=>this.hui(item.id)}>回复</Button>
                    {
                        this.state.fu.map((item2,index2)=>{
                            if(item2.list_id == item.id){
                                return <ul key={index2}>
                                    <li>{item2.name}</li>
                                    <li>{item2.content}</li>
                                    <li>{item2.time}</li>
                                    <Button onClick={()=>this.del1(item2.id)}>删除</Button>
                                </ul>
                            }
                        })
                        
                    }
                </ul>
            })
        }
      </div>
    )
  }
}

export default list
