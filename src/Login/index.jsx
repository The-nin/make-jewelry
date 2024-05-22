import React from 'react'
import"./index.scss"
import {  Button, Col, Input, Row } from 'antd'
import { Form } from 'react-router-dom'
  function Login() {
  return (
    <Row class= "login">
        <Col span={16} class="login__background">
            <img src="https://media.cnn.com/api/v1/images/stellar/prod/230515143657-0707.jpg?q=w_1480,c_fill/f_webp" 
            alt="" />
        </Col>
        <Col span={8} className="login__wrapper">
          <Form 
          class="login__form"
          labelCol={{
            span : 24,
          }}
          >
            <Form.Item label= "Username" name="username">
              <Input />
            </Form.Item>

            <Form.Item label= "Password" name="password">
              <Input.Password />
            </Form.Item>
            
            <Button type="primary">Login</Button>           
          </Form>
          <button className="login__google" onClick={handleLoginGoogle}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png"
            alt=""
            width={20}/>
            Login with Google
          </button>
        </Col>
    </Row>
  )
}

export default Login