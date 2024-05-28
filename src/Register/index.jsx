import { Button, Form, Input, Row } from "antd";
import api from "../config/anxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  async function handleRegister(values) {
    try {
      console.log(values);
      const response = await api.post("/register", values);
      console.log(response);
      toast.success("Create account successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  return (
    <Row className="register">
      <Form onFinish={handleRegister}>
        <h1 className="header">Sign up</h1>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone">
          <Input />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Sign up
        </Button>
      </Form>
    </Row>
  );
}

export default Register;
