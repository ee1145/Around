import React from "react";
import { Form, Input, Button, message } from 'antd';
//数据请求引入axios
import axios from 'axios';

import { BASE_URL } from "../constants";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 16,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Register(props) {
    const [form] = Form.useForm();

    const onFinish = values => {
        //1.首先获得user的信息, 第二步是把user info给server, 第三步是解析一下response
        //那这个有几种case呢? 三种: 成功->跳转; 失败->提醒一下user
        console.log('Received values of form: ', values);
        const { username, password } = values;
        //配置项
        const opt = {
            method: 'POST',
            url: `${BASE_URL}/signup`,
            data: {
                username: username,
                password: password
            },
            headers: { 'content-type': 'application/json'}
        };

        axios(opt)
            .then( response => {
                console.log(response)
                // case1: registered success
                if(response.status === 200) {
                    message.success('Registration succeed!');
                    //有了browserRouter包裹, 这里的props.history相当于一个全局变量
                    props.history.push('/login');
                }
            })
            .catch( error => {
                console.log('register failed: ', error.message);
                message.success('Registration failed!');
                // throw new Error('Signup Failed!')
            })
    };


    // 这里是UI设计
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            className="register"
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="register-btn">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Register;