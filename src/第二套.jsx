import React from 'react'
import { Component } from 'react'
import axios from 'axios'
import { Table, Button, Flex } from 'antd'
import { Pagination } from 'antd';
import { Input } from 'antd';


export default class App extends Component {
    componentDidMount() {
        this.getlist()
    }

    columns = [
        { title: '菜品名称', dataIndex: 'name', key: 'name' },
        { title: '菜品分类', dataIndex: 'fen', key: 'fen' },
        { title: '菜品价格', dataIndex: 'price', key: 'price' },
        {
            title: '菜品状态', dataIndex: 'state', key: 'state',
            render: (text) => {
                return text === true ? '上架' : '下架'
            }
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'state',
            render: (text, record) => {
                return <div><button>编辑</button><button onClick={()=>this.del(record.id)}>删除</button><button onClick={() => this.changestate(record.id, record)}>{record.state === true ? '下架' : '上架'}</button></div>
            }
        }


    ];
    state = {
        list: [],
        selectedRowKeys: [],
        page: 1,
        pageSize: 3,
        total: 0,
        sou:''
    }
    async changestate(id, row) {
        row.state = !row.state
        const res = await axios.put(`http://localhost:3000/list/${id}`, row)
        this.getlist()
    }

    async getlist() {
        const params = {
            _page : this.state.page,
            _limit: this.state.pageSize
        }
        if(this.state.sou !== ''){
            params.name_like = this.state.sou
        }
        const res = await axios.get('http://localhost:3000/list',{params})
        this.setState({
            list: res.data,
            total: res.headers['x-total-count'] * 10
        })

        console.log(this.state.list);
    }
    async delall(selectedRowKeys){
       selectedRowKeys.forEach(async (item)=>{
           const res = await axios.delete(`http://localhost:3000/list/${item}`)
           this.getlist()
       })
        
        
    }
    async xiaall(selectedRowKeys){
        selectedRowKeys.forEach(async (item)=>{
            const res = await axios.patch(`http://localhost:3000/list/${item}`,{
                state:false
            })
            this.getlist()
        })
    }
    async shangall(selectedRowKeys){
        selectedRowKeys.forEach(async (item)=>{
            const res = await axios.patch(`http://localhost:3000/list/${item}`,{
                state:true
            })
            this.getlist()
        })
    }
    async del(id) {
        const res = await axios.delete(`http://localhost:3000/list/${id}`)
        this.getlist()
    }
    async ye(e) {
        this.setState({
            page: e
        }, () => {
            this.getlist()
        })
    }
    async bang(e){
        this.setState({
            sou:e.target.value
        })
    }
    async sh(){
        this.getlist()
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
            selections: [
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
                <Input placeholder="请输入菜品名称" value={this.state.sou} onChange={(e)=>this.bang(e)} style={{width:"200px"}} /> <button onClick={()=>this.sh()}>搜索</button>
                <button onClick={()=>this.delall(this.state.selectedRowKeys)}>批量删除</button>
                <button onClick={()=>this.xiaall(this.state.selectedRowKeys)}>批量下架</button>
                <button onClick={()=>this.shangall(this.state.selectedRowKeys)}>批量上架</button>
                <Table rowSelection={rowSelection} columns={this.columns} rowKey="id" dataSource={this.state.list}
                

                />
                <Pagination defaultCurrent={this.state.page} total={this.state.total} pageSize={this.state.pageSize} onChange={(e)=>this.ye(e)}/>
            </div>
        )
    }
}
