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

export default (props) => {
    const history = useHistory();

    const signUp = (e) => {
        firebase.auth().createUserWithEmailAndPassword(e.email, e.password).then((res) => {
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
            paddingTop: 40,
            paddingBottom: 40,
            alignItems: 'center'
        }}>
        <h1>SIGNUP</h1>
        <Form
            {...layout}
            style={{
                width: 400,
                marginTop: 20
            }}
            onFinish={signUp}>
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