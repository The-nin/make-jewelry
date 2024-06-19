import { Button, Form, Input, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../config/axios";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

function AllAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //state chua data
  const [data, setData] = useState([]);
  //function get data
  const fetchData = async () => {
    const response = await api.get("/list-account");
    console.log(response.data);
    setData(response.data);
  };
  //chay moi khi laod trang web, []: chay 1 lan
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (values) => {
    console.log(values);
    //call api disable account
    const response = await api.patch(`/disable-account/${values.id}`);
    //loc ra all data, loai bo data vua bi xoa
    setData(data.filter((data) => data.id != values.id));
  };

  const handleUpdate = async (values) => {
    console.log(values);
    //call api update product
    const response = await api.put(`/update-account/${values.id}`);
    //loc ra all data, loai bo data vua bi xoa
    setData(data.filter((data) => data.id != values.id));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "",
      render: (values) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button onClick={() => handleUpdate(values)} type="primary">
            Update
          </Button>

          <Button onClick={() => handleDelete(values)} danger type="primary">
            Disable
          </Button>
        </div>
      ),
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);

    const response = await api.post("/admin-only", values);
    // add xong -> render lai man hinh moi nhat thi state phai thay doi
    setData([...data, response.data]);
    setIsModalOpen(false);
    console.log(response);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add new material
      </Button>
      <Modal
        footer={false}
        title="ADD NEW ACCOUNT"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                require: true,
                message: "Please input fullname!!!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[
              {
                require: true,
                message: "Please input your birth!!!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                require: true,
                message: "Please input address!!!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                require: true,
                message: "Please input gender!!!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                require: true,
                message: "Please input email!!!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                require: true,
                message: "Please input password!!!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                require: true,
                message: "Please input phone!!!",
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
      </Modal>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default AllAccount;
