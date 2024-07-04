import { Button, Col, Divider, Form, Input, Row } from "antd";
import {
  GoogleAuthProvider,
  // signInWithCustomToken,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";
import "./index2.scss";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { toast } from "react-toastify";
import { HomeOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../redux/features/counterSlice";

// import { useDispatch, useSelector } from "react-redux";
// import { selectUser } from "../redux/features/counterSlice";
// import { buildErrorMessage } from "vite";

function Test() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLoginGoogle = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const token = result.user.accessToken;
    try {
      const response = await api.post("/login-google", {
        token: token,
      });
      console.log(response.data);
      dispatch(login(response.data));
      localStorage.setItem("token", response.data.token);
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  // //su dung, cap nhat user
  // const dispatch = useDispatch();

  // save data user into redux
  // dispatch(login(response.data))

  //delete data user out of redux when log out
  // dispatch(logout())

  // //lay user ra tu redux
  // const user = useSelector(selectUser);

  const navigate = useNavigate();
  async function handleLogin(values) {
    console.log(values);
    // try {
    //   console.log(values);
    //   const response = await api.post("/login", values);
    //   console.log(response.data);
    //   dispatch(login(response.data));
    //   localStorage.setItem("token", response.data.token);
    //   toast.success("Login successfully");
    //   navigate("/");
    // } catch (error) {
    //   toast.error(error.response.data);
    // }
    try {
      const response = await api.post("/login", values).then((userApi) => {
        // console.log(response);
        console.log(userApi);
        console.log(userApi.data);
        localStorage.setItem("token", userApi.data.token);
        dispatch(login(userApi.data));
        if (userApi.data.role === "CUSTOMER") {
          navigate("/");
        } else if (userApi.data.role === "ADMIN") {
          navigate("/dashboard");
        } else if (userApi.data.role === "MANAGER") {
          navigate("/dashboard");
        } else if (userApi.data.role === "SELLER") {
          navigate("/dashboard");
        } else if (userApi.data.role === "DESIGNER") {
          navigate("/dashboard");
        } else if (userApi.data.role === "MAKER_PRODUCT") {
          navigate("/dashboard");
        }
        console.log(user.fullname);
        toast.success("Login successfully");
      });
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

        <Col span={8} className="login__wrapper">
          <div>
            <Link to={"/"} className="backToHome">
              <i className="icon">
                <HomeOutlined />
              </i>
            </Link>
            <Form
              className="login__form"
              labelCol={{
                span: 24,
              }}
              onFinish={handleLogin}
            >
              <h1 className="header">Sign in</h1>
              <Form.Item name="phone">
                <Input placeholder="Phone number" prefix={<PhoneOutlined />} />
              </Form.Item>

              <Form.Item name="password">
                <Input.Password
                  placeholder="Password"
                  required
                  prefix={<LockOutlined />}
                ></Input.Password>
              </Form.Item>

              <Link className="forgotpass" to="/forgot-password">
                Forgot password?
              </Link>

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

export default Test;
