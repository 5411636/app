import React, { Component } from 'react'
import axios from 'axios'
import { Button, Table } from 'antd'
import { Modal } from 'antd';
import { Input } from 'antd';
import { Cascader } from 'antd';
import { Select } from 'antd';
import { Pagination } from 'antd';
//中文转首字母
import pinyin from 'js-pinyin'
export class list extends Component {
    componentDidMount() {
        this.getlist(),
        //初始化拼音库配置
        pinyin.setOptions({
            style: pinyin.STYLE_NORMAL,
            heteronym: true
        })

    }
    state = {
        list: [],
        columns: [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '编码',
                dataIndex: 'code',
                key: 'code',
                //排序
                sorter: (a, b) => a.code - b.code
            },
            {
                title: "状态",
                dataIndex: "state",
                key: "state",
                render: (text) => {
                    return text == true ? "启用" : "禁用"

                }
            },
            {
                title: "地区",
                dataIndex: "address",
                key: "address"
            },
            {
                title: "操作",
                dataIndex: "state",
                key: "state",
                render: (text, record) => {
                    return <div>
                        <button>{text == true ? "禁用" : "启用"}</button>

                    </div>
                }
            }
        ],
        selectonkey: '',
        isModalOpen: false,
        name: '',
        zhu: "",
        addr: '',
        options: [
            {
                value: '地址一',
                label: '地址一',
                'aria-label': '地址一',

                children: [
                    {
                        value: '子地址一',
                        label: '子地址一'
                    }
                ]
            },
            {
                value: '地址二',
                label: '地址二',
                children: [
                    {
                        value: '子地址二',
                        label: '子地址二'
                    }
                ]
            }
        ],
        code: '',
        page: 1,
        size: 3,
        total: 0,
        rowid: 0,
        sou:'',
        states:false,
        form : [],
        isModalOpen1: false,
        id: 0,
        ad :[]
    }
    getname = (name) => {
        //拼音转首字母 大写
        return pinyin(name, { style: pinyin.STYLE_FIRST_LETTER }).join('').toUpperCase()
        
    }
    async getlist() {
        const params = {
            _page: this.state.page,
            _limit: this.state.size
        }
        if(this.state.sou != ''){
            params.name_like = this.state.sou
        }
        let res = await axios.get('http://localhost:3000/list', { params })
        this.setState({
            list: res.data,
            selectonkey: res.data[0].id,
            total: res.headers['x-total-count'],
            rowid: res.data[0].id,
            states:res.data[0].state
        })

    }
    onRow = (record, index) => {

        return {
            onClick: event => {
                this.setState({
                    selectonkey: record.id,
                    rowid: record.id,
                    states:record.state
                })
            },
        };


    }
    rowkey = (record) => {
        //选中切换背景色
        return record.id == this.state.selectonkey ? 'aaa' : '';
    }
    tan = () => {
        this.setState({
            isModalOpen: true
        })
    }
    handleOk = async () => {
        const res = await axios.post('http://localhost:3000/list', {
            name: this.state.name,
            zhu: this.state.zhu,
            address: this.state.addr,
            code: this.state.code,
            state: false,
            id: Date.now()
        })
        this.setState({
            isModalOpen: false,

        })
        this.getlist()

    }
    handleCancel = () => {
        this.setState({
            isModalOpen: false,
        });
    }
    n = (e) => {
        this.setState({
            name: e.target.value,
            zhu: this.getname(e.target.value)
        })
    }
    onChange = (value) => {
        
        //addr等于渲染后的值
        this.setState({
            addr: value[1],
            
        }, () => {
            console.log(this.state.addr);
           
            
        })


    }
    displayRender = (label) => {
        return label[label.length - 1];
    }
    pa = (e) => {
        this.setState({
            page: e
        }, () => {
            this.getlist()
        })

    }
    del = async () => {
        await axios.delete(`http://localhost:3000/list/${this.state.rowid}`)
        this.getlist()
    }
     sear = async  ()=> {
        this.getlist()
    }
    huan = async () => {
        const res = await axios.patch(`http://localhost:3000/list/${this.state.rowid}`,{
            state:!this.state.states
        })
        this.setState({
            states:!this.state.states
        })
        this.getlist()
    }
    edit = () => {
        this.setState({
            isModalOpen1: true,
        })
        this.state.list.map((item) => {
            if (item.id == this.state.rowid) {
                this.setState({
                    name: item.name,
                    zhu: item.zhu,
                    addr: item.address,
                    code: item.code,
                    id: item.id,
                    states:item.state
                })
            }
        })
    }
    gai = async () => {
        const res = await axios.patch(`http://localhost:3000/list/${this.state.id}`,{
            name: this.state.name,
            zhu: this.state.zhu,
            address: this.state.addr,
            code: this.state.code,
            state: this.state.states,
        })
        this.setState({
            isModalOpen1: false,
        })
        this.getlist()
    }
    render() {
        return (
            <div>
                <Button onClick={this.tan}>添加</Button>
                <Button onClick={this.del}>删除</Button>
                <Button onClick={this.edit}>修改</Button>

                <Button onClick={this.huan}>{this.state.states == true ? "禁用" : "启用"}</Button>

                <p><Input value={this.state.sou} onChange={(e)=>this.setState({sou:e.target.value})} style={{ width: '200px' }}></Input>
                    <Button onClick={this.sear}>搜索</Button></p>

                <Table pagination={false} rowKey={'id'} dataSource={this.state.list} columns={this.state.columns} rowClassName={this.rowkey} onRow={this.onRow} />;
                <Modal
                    title="Basic Modal"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={this.state.isModalOpen}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>姓名:<Input value={this.state.name} onChange={(e) => { this.n(e) }}></Input></p>
                    <p>助记码:<Input value={this.state.zhu} ></Input></p>
                    <Cascader  displayRender={this.displayRender} options={this.state.options} onChange={this.onChange} placeholder="Please select" />
                    <p>编码:<Input value={this.state.code} onChange={(e) => { this.setState({ code: e.target.value }) }}></Input></p>

                </Modal>
                <Modal
                    title="Basic Modal"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={this.state.isModalOpen1}
                    onOk={this.gai}
                    onCancel={this.handleCancel}
                >
                    <p>姓名:<Input value={this.state.name} onChange={(e) => { this.n(e) }}></Input></p>
                    <p>助记码:<Input value={this.state.zhu} onChange={(e) => { this.setState({ zhu: e.target.value }) }}></Input></p>
                    <Cascader defaultValue={this.state.addr}  displayRender={this.displayRender} options={this.state.options} onChange={this.onChange} placeholder="Please select" />
                    <p>编码:<Input value={this.state.code} onChange={(e) => { this.setState({ code: e.target.value }) }}></Input></p>

                </Modal>
                <Pagination defaultCurrent={this.state.page} total={this.state.total} pageSize={this.state.size} onChange={(e) => this.pa(e)} />


                <style>
                    {
                        `
                    .aaa{
                    background-color: #fcc;
                    }
                    `
                    }
                </style>
            </div>

        )
    }
}

export default list
