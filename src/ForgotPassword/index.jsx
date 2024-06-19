import { Button, Form, Input, Row } from "antd";

function ChangePassword() {
  return (
    <Row className="change_password">
      <Form>
        <h1>Change PASSWORD!!!</h1>
        <Form.Item>
          <Input placeholder="Enter new pass word" />
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

        <Button block htmlType="submit" type="primary">
          Submit
        </Button>
      </Form>
    </Row>
  );
}

export default ChangePassword;
