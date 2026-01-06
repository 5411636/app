import React, { Component } from 'react'
import { Input } from 'antd';
import { Button } from 'antd';
import axios from 'axios';
const navigator = (url) => {
    window.location.href = url
}
export class login extends Component {
    state = {
        username : '',
        password: ''
    }
    u = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    p = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    async login() {
        const res = await axios.get('http://localhost:3000/login',{
            params:{
                username: this.state.username,
                password: this.state.password
            }
        })
        if(res.data.length >0) {
            alert('登录成功')
            localStorage.setItem('token',res.data[0].token)
            localStorage.setItem('username',this.state.username)
            navigator('/list')
        }
    }
  render() {
    return (
      <div style={{width: '100%', textAlign: 'center'}}>
        <h1>登录</h1>
        <p>用户名：<Input value={this.state.username} onChange={(e)=>this.u(e)} placeholder="请输入账号" style={{width: '300px'}} /></p>
        <p>密码：  <Input value={this.state.password} onChange={(e)=>this.p(e)} placeholder="请输入密码" type="password" style={{width: '300px'}}/></p>
        <p><Button onClick={()=>this.login()} disabled={this.state.username == '' || this.state.password==''}>登录</Button></p>
      </div>
    )
  }
}

export default login
