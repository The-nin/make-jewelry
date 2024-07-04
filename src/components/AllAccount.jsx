import { Button, Col, Form, Input, Modal, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../config/axios";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

function AllAccount() {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState({});
  const [title, setTitle] = useState("ADD NEW ACCOUNT");

  //state chua data
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  //function get data
  const fetchData = async () => {
    const response = await api.get("/list-account");
    console.log(response.data);
    setData(response.data);
  };
  //chay moi khi laod trang web, []: chay 1 lan
  useEffect(() => {
    fetchData();
  }, [isModalOpen]);

  const handleDelete = async (values) => {
    console.log(values);
    //call api disable account
    const response = await api.patch(`/disable-account/${values.id}`);
    fetchData();
  };

  const handleUpdate = async (values) => {
    console.log(values);
    setIsModalOpen(true);
    setTitle("Update account");
    form.setFieldsValue(values);
    setAccounts(values);
  };

  const handleSearch = async (value) => {
    console.log(value);
    try {
      const response = await api.get(`/search-account?param=${value}`);
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <span>
            {status ? (
              <CheckCircleOutlined style={{ color: "green" }} />
            ) : (
              <CloseCircleOutlined style={{ color: "red" }} />
            )}
          </span>
        );
      },
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

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
    setAccounts({});
    setTitle("ADD NEW ACCOUNT");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    if (accounts.id == null) {
      const response = await api.post("/admin-only", values);
      // add xong -> render lai man hinh moi nhat thi state phai thay doi
      setData([...data, response.data]);
      setIsModalOpen(false);
      console.log(response);
    } else {
      const response = await api.put(`/update-account/${accounts.id}`, {
        status: accounts.status,
        fullName: values.fullName,
        birthday: values.birthday,
        address: values.address,
        gender: values.gender,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      setIsModalOpen(false);
      console.log(response);
    }
  };

  return (
    <div>
      <Row className="Modal-header" justify={"space-between"}>
        <Col>
          <Button type="primary" onClick={showModal}>
            Add new account
          </Button>
        </Col>

        <Col>
          <div className="SearchBar" style={{ float: "right" }}>
            <Input
              placeholder="Search"
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={(e) => handleSearch(searchText, e)}
              enterButton={<SearchOutlined />}
              value={searchText}
              suffix={<SearchOutlined />}
            />
          </div>
        </Col>
      </Row>

      <Modal
        footer={false}
        title={title}
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
            label="Role"
            name="role"
            rules={[
              {
                require: true,
                message: "Please input account role!!!",
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
