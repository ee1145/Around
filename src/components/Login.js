import React from "react";
import { Form, Input, Button, message } from "antd";
//这个UserOutlined, LockOutlined是两个小图标
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../constants";

function Login(props) {
    const { handleLoggedIn } = props;

    //这里是一个回调函数, 当调用这个函数的时候, 我们能拿到form表单里面的所有value
    const onFinish = (values) => {
        //这里是values的两个key
        const { username, password } = values;
        const opt = {
            method: "POST",
            url: `${BASE_URL}/signin`,
            data: {
                username: username,
                password: password
            },
            headers: { "Content-Type": "application/json" }
        };
        //发送到后端去, 这里opt是axios这个函数的参数
        axios(opt)
            .then((res) => {
                //通信正常并且后端给我返回了数据
                if (res.status === 200) {
                    const { data } = res;
                    //send the data to app, 子向父传, 三部曲
                    props.handleLoggedIn(data);
                    message.success("Login succeed! ");
                }
            })
            .catch((err) => {
                console.log("login failed: ", err.message);
                //给用户提醒一下登录失败了铁子
                message.error("Login failed!");
            });
    };

    return (
        // 刚刚点完bottom之后在这里触发
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
            {/*获取Form.Item里面填写的内容*/}
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your Username!"
                    }
                ]}
            >
                {/*这个地方是用来接受用户的名称和密码*/}
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!"
                    }
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            {/*这是一个表格的Item, 里面有一个button, 类型是submit 故事从这里开始*/}
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
    );
}

export default Login;