import React, { Component } from 'react'
import { Radio } from 'antd';
import axios from 'axios'
import { Dropdown } from 'antd';
import { Menu } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
const { TextArea } = Input;

export class list extends Component {
    componentDidMount() {
        this.getlist()
        this.getart()
    }
    state = {
        value: 1,
        list: [],
        artcle: [],
        value1: 0,
        ji:false,
        wenji:'',
        jic :'',
        zhang:false,
        wen:'',
        wencon:''
    }
    async getlist() {
        const res = await axios.get('http://localhost:3000/list')
        this.setState({
            list: res.data
        })
    }
    async getart() {
        const res = await axios.get('http://localhost:3000/article')
        this.setState({
            artcle: res.data
        })
        console.log(this.state.artcle);

    }
    qie = (e) => {
        this.setState({
            value: e.target.value
        }, () => {
            console.log(this.state.value);

        })
        //判断当前是否被选中
        if (e.target.checked) {
            console.log(e.target.value);
        }
    }
    h = (e,item) => {
        this.setState({
            value1: e.target.value,
            jic: item.content
        })
    }

    async del(item) {
        const res = await axios.delete(`http://localhost:3000/article/${item.id}`)
        this.getart()
        this.getlist()
    }
    async dela(item) {
        const res = await axios.delete(`http://localhost:3000/list/${item.id}`)
        this.getlist()
        this.getart()
    }
    xji=()=>{
        this.setState({
            ji:true
        })
    }
    bang=(e)=>{
        this.setState({
            wenji:e.target.value
        })
    }
    async add(){
        const res = await axios.post('http://localhost:3000/list',{
            name:this.state.wenji,
            id: Date.now(),

        })
        this.setState({
            ji:false
        })
        this.getlist()
    }
    xiu=(e)=>{
        this.setState({
            jic:e.target.value
        })
    }
    async edit(item){
        item.content = this.state.jic
        const res = await axios.put(`http://localhost:3000/article/${item.id}`,item)
        this.getart()
        this.getlist()
    }
    wz=(e)=>{
        this.setState({
            wen:e.target.value
        })
    }
    async addz(){
        this.setState({
            zhang:true,
            value1:0
        })
    }
    con=(e)=>{
        this.setState({
            wencon:e.target.value
        })
    }
    async ad(){
        const res = await axios.post('http://localhost:3000/article',{
            title:this.state.wen,
            content:this.state.wencon,
            id: Date.now(),
            list_id:this.state.value
        })
        this.setState({
            zhang:false
            
        })
        this.getart()
        this.getlist()
    }

    render() {
        return (
            <div style={{ display: "flex" }}>
                <div style={{ width: "200px", height: "1000px", border: "1px solid black", background: "#404040", textAlign: "center", color: "white" }}>
                    <p onClick={()=>this.xji()}>+新建文集</p>
                    <p><Input  value={this.state.wenji} onChange={(e)=>this.bang(e)} onPressEnter={()=>this.add()} style={{display: this.state.ji?"inline":"none"}} placeholder="请输入文集"  /></p>
                    <p>
                        <Radio.Group orientation='vertical' style={{ background: "#404040" }} value={this.state.value}>

                            {
                                this.state.list.map((item, index) => {
                                    return <Radio.Button onChange={(e) => this.qie(e)} style={{ background: "#404040", border: "none" }} value={item.id} key={index}> {item.name}<span style={{ display: item.id == this.state.value ? "inline" : "none", marginLeft: "100px" }}>
                                        <Dropdown menu={{
                                            items: [
                                                {
                                                    label: '删除',
                                                    key: '1'
                                                },
                                            ], onClick: () => this.dela(item)
                                        }}>

                                            设置

                                        </Dropdown>
                                    </span></Radio.Button>
                                })
                            }

                        </Radio.Group>
                    </p>

                </div>
                <div style={{ width: "200px", height: "1000px", textAlign: "center" }}>
                    <p onClick={()=>this.addz()}>+新建文章</p>
                    <p> <Input  style={{display:this.state.zhang?"inline":"none"}} value={this.state.wen} onChange={(e)=>this.wz(e)} placeholder="请输入文章" /></p>
                    <p>
                        <Radio.Group orientation='vertical' value={this.state.value1}>

                            {
                               this.state.artcle.map((item, index) => {
                                    if (item.list_id == this.state.value) {
                                        return <Radio.Button onChange={(e) => this.h(e,item)} style={{ border: "none" }} value={item.id} key={index}> {item.title}<span style={{ display: item.id == this.state.value1 ? "inline" : "none", marginLeft: "100px" }}>
                                            <Dropdown menu={{
                                                items: [
                                                    {
                                                        label: '删除',
                                                        key: '1'
                                                    },
                                                ], onClick: () => this.del(item)
                                            }}>

                                                设置

                                            </Dropdown>
                                        </span></Radio.Button>
                                    }
                                })
                            }

                        </Radio.Group>
                    </p>
                </div>
                <div>
                    {
                        this.state.artcle.map((item, index) => {
                           
                            if (item.id == this.state.value1) {
                                return <div key={item.id}>
                                    <TextArea value={this.state.jic} onChange={(e)=>this.xiu(e)}  rows={6}></TextArea>
                                    <Button onClick={()=>this.edit(item)}>保存</Button>
                                </div>
                            }
                        })
                    }
                    <TextArea style={{display:this.state.zhang?"inline":"none"}} value={this.state.wencon} onChange={(e)=>this.con(e)}></TextArea>
                    <Button onClick={()=>this.ad()}  style={{display:this.state.zhang?"inline":"none"}}>添加</Button>
                </div>
            </div>
        )
    }
}

export default list
