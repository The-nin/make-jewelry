import { Button, Col, Divider, Form, Input, Row } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import api from "../config/anxios";
import { toast } from "react-toastify";

function Login() {
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

  const navigate = useNavigate();
  async function handleLogin(values) {
    console.log(values);
    try {
      const response = await api.post("/login", values);
      console.log(response);
      toast.success("Login successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  }
  return (
    <div className="background">
      <Row className="login">
        <Col span={14} className="login__background">
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20230717/pngtree-3d-depiction-of-exquisite-precious-stone-adorned-jewelry-image_3892959.jpg"
            alt=""
          />
        </Col>
        {/* <Divider
          className="border"
          type="vertical"
          style={{ borderColor: "black" }}
        ></Divider> */}
        <Col span={8} className="login__wrapper">
          <div>
            <Form
              className="login__form"
              labelCol={{
                span: 24,
              }}
              onFinish={handleLogin}
            >
              <h1 className="header">Sign in</h1>
              <Form.Item name="phone">
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item name="password">
                <Input.Password
                  placeholder="Password"
                  required
                ></Input.Password>
              </Form.Item>
              <div>
                <a href="/ForgotPassword">Forgot password?</a>
              </div>
              <div className="button">
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ marginRight: "10px" }}
                >
                  Login
                </Button>
                <Button type="primary">
                  <a href="./Register/">Sign up</a>
                </Button>
              </div>
            </Form>
            <br />
            <button className="login__google" onClick={handleLoginGoogle}>
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt=""
                width={28}
              />
              <p className="text">Login with Google</p>
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
