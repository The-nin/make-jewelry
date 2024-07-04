import { Button, Form, Input, Row } from "antd";
import "./message.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import "./message.scss";

function ChangePassword() {
  const navigate = useNavigate();

  // const handleForgotPass = async () => {
  //   const result = await signInWithPopup(auth, new GoogleAuthProvider());
  //   const token = result.user.accessToken;
  //   try {
  //     const response = await api.put("/reset-password", {
  //       token: token,
  //     });
  //     console.log(response.data);
  //     dispatch(login(response.data));
  //     localStorage.setItem("token", response.data.token);
  //     toast.success("Reset password successfully");
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleForgotPass = async (values) => {
    try {
      const response = await api.post("/reset-password", values);
      toast.success("Reset password successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data || "Fail to reset password");
    }
  };

  return (
    <div className="background">
      <Row className="reset">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleForgotPass}
          autoComplete="off"
        >
          <h1>Change password!!!</h1>
          <Form.Item label="Password" name="newpassword">
            <Input.Password placeholder="Enter your password" required />
          </Form.Item>

          <Form.Item
            label="Confirm"
            name="confirmPassword"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newpassword") == value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Confirm password field not match password field"
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Enter your password" required />
          </Form.Item>

          <Button block htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </Row>
    </div>
  );
}

export default ChangePassword;
