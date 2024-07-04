import { Button, Form, Input, Row } from "antd";
import { toast } from "react-toastify";
import api from "../config/axios";
import "./message.scss";

function ResetPassword() {
  const onFinish = async (values) => {
    try {
      const response = await api.post("/forgot-password", values);
      toast.success("Please check your Email, Message has been send");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="background">
      <Row className="reset">
        <h1>INPUT YOUR E-MAIL</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
}

export default ResetPassword;
