import React, { Component } from 'react'
import { NavBar } from 'react-vant';
import axios from 'axios'
import { Cell, Image } from 'react-vant';
import { Radio } from 'react-vant';
import { ActionBar } from 'react-vant';
//跳转 路由
import { Link } from 'react-router-dom'
const navigator = (url) => {
    window.location.href = url
}
export class list extends Component {
    componentDidMount() {
        this.getlist()
    }
    state = {
        list: [],
        guan: '管理',
        id: 0
    }
    async getlist() {
        const res = await axios.get('http://localhost:3000/list')
        this.setState({
            list: res.data
        })
    }
    async dian(item) {
        this.state.list.map(item1 => {
            if (item1.id !== item.id) {
                item1.state = false
            }
            if (item1.id === item.id) {
                item1.state = true
            }
            const res = axios.put(`http://localhost:3000/list/${item1.id}`, item1)
            return res
        }

        )
        this.getlist()



    }
    di(item) {
        this.setState({
            id: item.id
        })

    }
    tiao(){
        //跳转
        navigator('/add')
    }
    ed(item){
        localStorage.setItem('item',JSON.stringify(item))
        navigator('/edit')
    }
    async del(id){
        if(! window.confirm('确定删除吗'))return
        const res = await axios.delete(`http://localhost:3000/list/${id}`)
        this.getlist()
    }
    render() {
        return (
            <div>
                <NavBar
                    title="我的收货地址"
                    leftText="返回"
                    rightText={this.state.guan}
                />
                {
                    this.state.list.map(item => {
                        return (

                            <div key={item.id}>
                                <Cell
                                    center
                                    key={item.id}
                                    title={`${item.name} ${item.phone} ${item.state ? '默认' : ''}`}
                                    label={`${item.address} ${item.xaddress}`}
                                    icon={<Image width={44} height={44} src={item.img} round />}
                                    isLink
                                    onClick={() => this.di(item)}
                                />
                                <p style={{ display: this.state.id == item.id ? 'inline' : 'none' }}>
                                    <Radio checked={item.state} onClick={() => this.dian(item)} >默认地址</Radio>
                                    <span onClick={()=>this.del(item.id)}>删除</span><span onClick={()=>this.ed(item)}>编辑</span>
                                </p>
                            </div>


                        )
                    })
                }
                <div className='demo-action-bar'>
                    <ActionBar>
                        <ActionBar.Button
                            type='danger'
                            text='立即添加'
                            onClick={()=>this.tiao()}
                        />
                    </ActionBar>
                </div>
            </div>
        )
    }
}

export default list
