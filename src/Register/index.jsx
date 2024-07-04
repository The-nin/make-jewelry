import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import api from "../config/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import moment from "moment";
import { LeftCircleOutlined } from "@ant-design/icons";

function Register() {
  const navigate = useNavigate();
  async function handleRegister(values) {
    try {
      values.dob = moment(values.dob).format("YYYY-MM-DD");
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
    <div className="Reg_background">
      <Row className="register">
        <Form
          className="register__form"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={handleRegister}
        >
          <div className="header-container">
            <Link to={"/login"}>
              <i className="icon">
                <LeftCircleOutlined />
              </i>
            </Link>
            <h1 className="header">Sign up</h1>
          </div>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="Enter phone number" required />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Enter your password" required />
          </Form.Item>

          <Form.Item
            label="Confirm password"
            name="confirm password"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") == value) {
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

          <Form.Item label="Full name" name="fullname">
            <Input placeholder="Enter your full name" required />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input placeholder="Enter your Email" />
          </Form.Item>

          <Form.Item label="Adress" name="address">
            <Input placeholder="Enter your adress" />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Select placeholder="Select your gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date of Birth" name="dob">
            <DatePicker
              picker="date"
              placeholder="YYYY-MM-DD"
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
            ></DatePicker>
          </Form.Item>

          <Button block htmlType="submit" type="primary">
            Sign up
          </Button>
        </Form>
      </Row>
    </div>
  );
}

export default Register;
