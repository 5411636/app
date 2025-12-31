import React, { Component } from 'react'
import { NavBar } from 'react-vant';
import { Form, Input } from 'react-vant';
import { ActionBar } from 'react-vant';
import { Radio } from 'react-vant';
import axios from 'axios'
const navigator = (url) => {
    window.location.href = url
}
export class add extends Component {
    state = {
        name: '',
        check: false,
        phone: '',
        address: '',
        xaddress: ''

    }
    formref = React.createRef();
    n = (value) => {
        this.setState({
            name: value
        })
    }
    p = (value) => {
        this.setState({
            phone: value
        })
    }
    a = (value) => {
        this.setState({
            address: value
        })
    }
    x = (value) => {
        this.setState({
            xaddress: value
        })
    }
    async tiao(){
        const res = await axios.post('http://localhost:3000/list',{
            name:this.state.name,
            phone:this.state.phone,
            address:this.state.address,
            xaddress:this.state.xaddress,
            state:this.state.check,
            img: "/public/2.png",
            id:Date.now()
        })
        //跳转
        navigator('/')
    }
    

    render() {
        return (
            <div>
                <NavBar
                    title="添加地址"
                    leftText="返回"
                    rightText="按钮"
                />
                <Form ref={this.formref}>
                    <Form.Item
                        name='name'
                        label='收货人'
                         rules={[{ required: true, message: '请填写收货人' }]}
                    >
                        <Input value={this.state.name} onChange={(value)=>this.n(value)} placeholder='请输入收货人' />
                    </Form.Item>
                    <Form.Item
                        name='phone'
                        label='手机号'
                         rules={[{ required: true, message: '请填写手机号' }]}
                    >
                        <Input value={this.state.phone} onChange={(value)=>this.p(value)} placeholder='请输入手机号' />
                    </Form.Item>
                    <Form.Item
                        name='address'
                        label='收货地址'
                         rules={[{ required: true, message: '请填写收货地址' }]}
                    >
                        <Input value={this.state.address} onChange={(value)=>this.a(value)} placeholder='请输入收货地址' />
                    </Form.Item>
                    <Form.Item
                        name='xaddress'
                        label='详细地址'
                         rules={[{ required: true, message: '请填写详细地址' }]}
                    >
                        <Input value={this.state.xaddress} onChange={(value)=>this.x(value)} placeholder='请输入详细地址' />
                    </Form.Item>
                </Form>
                
                <Radio checked={this.state.check}>是否是默认地址</Radio>
                <div className='demo-action-bar'>
                    <ActionBar>
                        <ActionBar.Button
                            type='danger'
                            text='立即添加'
                            onClick={() => this.tiao()}
                        />
                    </ActionBar>
                </div>
                {this.state.name}
            </div>
        )
    }
}

export default add
