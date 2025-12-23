import React from 'react'
import { Component } from 'react'
import axios from 'axios'
import { Table, Button, Flex } from 'antd'

const columns = [
    { title: '菜品名称', dataIndex: 'name', key: 'name'},
    { title: '菜品分类', dataIndex: 'fen' , key: 'fen'},
    { title: '菜品价格', dataIndex: 'price', key: 'price' },
    { title: '菜品状态', dataIndex: 'state', key: 'state',
        render: (text) => {
            return text === true ? '上架' : '下架'
        }
     },
   
    
];



export default class App extends Component {
    componentDidMount() {
        this.getlist()
    }
    state = {
        list: [],
        selectedRowKeys: []
    }


    async getlist() {
        const res = await axios.get('http://localhost:3000/list')
        this.setState({
            list: res.data
        })
        console.log(this.state.list);
    }
    render() {
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.setState({
                    selectedRowKeys
                })
            },
            hideDefaultSelections: true,
            selections:[
                {
                    key: 'all-data',
                    text: 'Select All Data',
                    onSelect: () => {
                        this.setState({
                            selectedRowKeys: [...Array(46).keys()]
                        })
                    }
                },
                //反选
                {
                    key: 'invert',
                    text: 'Select Invert',
                    onSelect: () => {
                        const selectedRowKeys = this.state.list.map((item) => item.id)
                        this.setState({
                            selectedRowKeys: selectedRowKeys.filter((item) => !this.state.selectedRowKeys.includes(item))
                        })
                    }
                }
                
                
                
            ]

        }
        return (
            <div>
                <Table rowSelection={rowSelection} columns={columns} rowKey="id" dataSource={this.state.list} 
                />
            </div>
        )
    }
}
