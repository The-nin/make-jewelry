import { Button, Col, Form, Input, Row } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import "./index2.scss";
function Test() {
  const handleLoginGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(credential);
        console.log(result);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <Row className="login">
      <Col span={16} className="login__background">
        <img
          src="https://media.cnn.com/api/v1/images/stellar/prod/230515143657-0707.jpg?q=w_1480,c_fill/f_webp"
          alt=""
        />
      </Col>
      <Col span={8} className="login__wrapper">
        <Form
          className="login__form"
          labelCol={{
            span: 24,
          }}
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>

          <Button type="primary">Login</Button>
        </Form>
        <button className="login__google" onClick={handleLoginGoogle}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png"
            alt=""
            width={30}
          />
          Login with Google
        </button>
      </Col>
    </Row>
  );
}

export default Test;
