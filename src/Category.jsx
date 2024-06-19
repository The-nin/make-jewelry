import { Button, Form, Input, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "./config/axios";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  //state chua data
  const [data, setData] = useState([]);
  //function get data
  const fetchData = async () => {
    const response = await api.get("/category");
    console.log(response.data);
    setData(response.data);
  }; //200
  //chay moi khi laod trang web, []: chay 1 lan
  useEffect(() => {
    fetchData();
  }, []);

  const handleDisable = async (values) => {
    console.log(values);
    //call api disable category
    const response = await api.patch(`/category/${values.id}`);
    //loc ra all data, loai bo data vua bi xoa
    // setData(data.filter((data) => data.id != values.id));

    fetchData();
  };

  const handleUpdate = async (values) => {
    console.log(values);
    //call api update product
    const response = await api.put(`/category/${values.id}`);
    //loc ra all data, loai bo data vua bi xoa
    // setData(data.filter((data) => data.id != values.id));
  }; //400

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <span>
            {status ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          </span>
        );
      },
    },
    {
      title: "",
      render: (values) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <Button onClick={() => handleUpdate(values)} type="primary">
            Update
          </Button>

          <Button onClick={() => handleDisable(values)} danger type="primary">
            Disable
          </Button>
        </div>
      ),
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);

    const response = await api.post("/category", values);
    // add xong -> render lai man hinh moi nhat thi state phai thay doi
    setData([...data, response.data]);
    setIsModalOpen(false);
    console.log(response);
  }; //200
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateCategoryName = async (rule, value) => {
    if (!value) {
      throw new Error("validate category name,please input again!!!");
    }
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add new category
      </Button>
      <Modal
        footer={false}
        title="ADD NEW CATEGORY"
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
            label="Category Name"
            name="name"
            rules={[
              {
                require: true,
                message: "Please input your category name!!!",
                validator: validateCategoryName,
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

export default Category;
