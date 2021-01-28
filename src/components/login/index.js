import React from 'react';
import { Button, Form, Input, notification } from 'antd';
// firebase
import firebase from '../../config/firebase';
// router
import { useHistory } from 'react-router-dom';

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};

export default () => {
    const history = useHistory();

    const login = (e) => {
        firebase.auth().signInWithEmailAndPassword(e.email, e.password).then((res) => {
            history.push('BlockChainCard')
        }).catch((e) => {
            notification.open({
                message: "Error",
                description: e.message,
            });
        })
    }

    return <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 100,
            paddingBottom: 40,
            alignItems: 'center'
        }}>
        <h1>LOGIN</h1>
        <Form
            {...layout}
            style={{
                width: 400,
                marginTop: 20
            }}
            onFinish={login}>
            <Form.Item
                label="Email"
                name="email"
                rules={[{
                    required: true,
                    message: "Please enter email"
                }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Pass"
                name="password"
                rules={[{
                    required: true,
                    message: "Please enter password"
                }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                    SUBMIT
                </Button>
            </Form.Item>
        </Form>
    </div>
}