import React, { Component } from 'react'

export class login extends Component {
  render() {
    return (
      <div style={{width:"100%",textAlign:"center"}}>
        <h1>登录</h1>
        <p><Input placeholder="请输入手机号" /></p>
        <Input placeholder="Basic usage" />
      </div>
    )
  }
}

export default login
