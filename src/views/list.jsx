import React, { Component } from 'react'
import axios from 'axios'
import { Input, Button } from 'antd'
import { Radio } from 'antd';

export class list extends Component {
    componentDidMount() {
        this.getlist()
    }

    state = {
        list: [],
        fang: '',
        jilu: JSON.parse(localStorage.getItem('jilu')) || [],
        ji: '不限',
        options: [
            { label: '不限', value: '不限' },
            { label: '北京', value: '北京' },
            { label: '上海', value: '上海' },
            { label: '广州', value: '广州' },
            { label: '深圳', value: '深圳' },
        ],
        sor:'asc'

    }


    async getlist() {
        const params = {
            _sort: 'price',
            _order: this.state.sor
        }
        if (this.state.fang != '') {
            params.name_like = this.state.fang
        }
        if (this.state.ji != '不限') {
            params.address = this.state.ji
        }
        const res = await axios.get('http://localhost:3000/list', { params })
        this.setState({
            list: res.data
        })
        
    }
    sou = (e) => {
        this.setState({
            fang: e.target.value
        })
    }
    shua = () => {
        this.getlist()
    }
    s = () => {
        //搜索记录 本地存储 前面添加
        let jilu = this.state.jilu
        jilu.unshift(this.state.fang)
        this.setState({
            jilu
        })
        localStorage.setItem('jilu', JSON.stringify(jilu))
        this.getlist()
    }
    clear = () => {
        this.setState({
            jilu: [],
            fang: ''
        })
        localStorage.removeItem('jilu')
        this.getlist()
    }
    so = () => {
        this.setState({
            sor: this.state.sor == 'asc' ? 'desc' : 'asc'
        }, () => {
            this.getlist()            
        })
    }
    c = () => {
        this.setState({
            fang: '',
            ji: '不限'
        }, () => {
            this.getlist()
        })
        localStorage.removeItem('jilu')
        this.setState({
            jilu: []
        })
    }
    render() {
        return (
            <div>
                <Input value={this.state.fang} onChange={(e) => this.sou(e)} style={{ width: '200px' }} placeholder="请输入楼房名称" />
                <Button type="primary" onClick={() => this.s()}>搜索</Button><br></br>
                {this.state.jilu.map((item, index) => {
                    return item
                })
                }
                <Button type="primary" onClick={() => this.clear()}>清空搜索历史</Button>
                <Radio.Group
                    block
                    options={this.state.options}
                    defaultValue={this.state.ji}
                    value={this.state.ji}
                    optionType="button"
                    buttonStyle="solid"
                    style={{
                        width: '400px',
                    }}
                    onChange={(e) => {
                        this.setState({
                            ji: e.target.value
                        }, () => {
                            console.log(this.state.ji);
                            this.getlist()
                        })
                    }}
                /><br></br>
                <Button type="primary" onClick={() => this.so()}>价格排序</Button>
                <p onClick={()=> this.c()}>清空条件</p>

                <div>
                    {
                        this.state.list.map((item, index) => {
                            return <div key={item.id} style={{ display: 'flex' }}>
                                <img style={{ width: '100px', height: '100px' }} src={item.img} alt="" />
                                <div style={{ marginLeft: '20px' }}>
                                    <h3>{item.name} </h3>
                                    <p>{item.hu} {item.address}</p>
                                </div>
                                <div style={{ marginLeft: '20px' }}>
                                    <p style={{ color: 'red', fontSize: '20px' }}>{item.price}/元</p>
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
        )
    }
}

export default list
