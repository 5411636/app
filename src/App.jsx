import React, { Component } from 'react'
import { Input } from 'antd';
import { Button } from 'antd';
import axios from 'axios';
import { Radio } from 'antd';
export default class App extends Component {
    componentDidMount() {
        this.getlist()
    }

    state = {
        xian: false,
        username: "",
        password: "",
        list: [],
        id: 1,
        value: 'A',
        right: 0,
        error: 0,
        dao: 3
    }
    namechange = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    passwordchange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    async login(e) {
        const res = await axios.get('http://localhost:3000/login', {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })


        if (res.data.length > 0) {


            this.setState({
                xian: true
            })
            this.getlist()
        }
    }
    async getlist() {
        const res = await axios.get("http://localhost:3000/list", {
            params: {
                id: this.state.id
            }
        })
        console.log(res);

        this.setState({
            list: res.data
        })
    }
    xuan = (e) => {

        this.setState({
            value: e.target.value
        })


    }

    async submit(answer, e) {

        const timer = setInterval(async () => {
            this.setState({
                dao: this.state.dao - 1
            })


            if (this.state.dao === 0) {
                clearInterval(timer)

                this.setState({
                    id: this.state.id + 1
                })

                const res = await axios.get('http://localhost:3000/list', {
                    params: {
                        id: this.state.id + 1,
                    }
                })
                this.setState({
                    list: res.data
                })
                if (answer === this.state.value) {
                    this.setState({
                        right: this.state.right + 1
                    })
                } else {
                    this.setState({
                        error: this.state.error + 1
                    })
                }
                this.setState({
                    dao: 3
                })
            }


        }, 3000);



    }

    render() {
        return (
            <div style={{ display: "flex" }}>
                <div style={{ width: "500px", height: "500px", border: "2px solid black" }}>
                    <div style={{ display: this.state.xian ? "none" : "block" }}>
                        <h1>登录</h1>
                        <p style={{ width: "100%", textAlign: "center" }}>用户名<Input value={this.state.username} onChange={(e) => this.namechange(e)} style={{ width: "300px" }} /></p>
                        <p style={{ width: "100%", textAlign: "center" }}>密码<Input value={this.state.password} onChange={(e) => this.passwordchange(e)} style={{ width: "300px" }} /></p>
                        <p style={{ width: "100%", textAlign: "center" }}><Button onClick={(e) => this.login(e)} type="primary">登录</Button></p>
                    </div>
                    <div style={{ display: this.state.xian ? "block" : "none" }}>
                        用户名:admin
                    </div>
                </div>
                <div style={{ width: "500px", height: "500px", border: "2px solid black" }}>
                    <div style={{ display: this.state.xian ? "none" : "block" }}>
                        请登录
                    </div>
                    <div style={{ display: this.state.xian ? "block" : "none" }}>
                        <ul style={{
                            // 去掉ul的默认样式
                            listStyle: "none",
                            // 去掉ul的padding和margin
                            padding: "0",
                            margin: "0"
                        }}>
                            {
                                this.state.list.map((item) => (
                                    <li key={item.id}>
                                        <h1>{item.question}</h1>
                                        <Radio.Group
                                            vertical
                                            onChange={(e) => this.xuan(e)}
                                            value={this.state.value}
                                            options={[
                                                { value: 'A', label: 'A' },
                                                { value: 'B', label: 'B' },
                                                { value: 'C', label: 'C' },
                                                { value: 'D', label: 'D' },
                                            ]}
                                        ></Radio.Group>
                                        <button onClick={(e) => this.submit(item.answer, e)}>提交</button>

                                    </li>
                                ))
                            }
                            <p>共有{this.state.id}/4题 答对{this.state.right}题 答错{this.state.error}题 倒计时{this.state.dao}</p>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
