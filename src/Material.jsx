import { Button, Form, Input, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "./config/axios";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

function Material() {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [material, setMaterial] = useState({});
  const [title, setTitle] = useState("ADD NEW MATERIAL");

  //state chua data
  const [data, setData] = useState([]);
  //function get data
  const fetchData = async () => {
    const response = await api.get("/material");
    console.log(response.data);
    setData(response.data);
  };
  //chay moi khi laod trang web, []: chay 1 lan
  useEffect(() => {
    fetchData();
  }, [isModalOpen]);

  const handleDisable = async (values) => {
    console.log(values);
    //call api disable material
    const response = await api.patch(`/material/${values.id}`);
    //loc ra all data, loai bo data vua bi xoa
    // setData(data.filter((data) => data.id != values.id));
    fetchData();
  };

  const handleUpdate = async (values) => {
    setIsModalOpen(true);
    setTitle("Update material");
    form.setFieldsValue(values);
    setMaterial(values);
    // console.log(values);
    //call api update product
    // const response = await api.put(`/material/${values.id}`);
    // //loc ra all data, loai bo data vua bi xoa
    // setData(data.filter((data) => data.id != values.id));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Material Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
        <div style={{ display: "flex", gap: "8px" }}>
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
    setMaterial({});
    setTitle("ADD NEW MATERIAL");
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    if (material.id == null) {
      const response = await api.post("/material", values);
      // add xong -> render lai man hinh moi nhat thi state phai thay doi
      setData([...data, response.data]);
      setIsModalOpen(false);
      console.log(response);
    } else {
      const response = await api.put(`material/${material.id}`, {
        status: material.status,
        name: values.name,
        weight: values.weight,
        price: values.price,
      });

      // setData([...data, response.data]);
      setIsModalOpen(false);
      console.log(response);
    }
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
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Material Name"
            name="name"
            rules={[
              {
                require: true,
                message: "Please input material name!!!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Weight"
            name="weight"
            rules={
              material.id == null
                ? [
                    {
                      require: true,
                      message: "Please input weight of material!!!",
                    },
                  ]
                : []
            }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={
              material.id == null
                ? [
                    {
                      require: true,
                      message: "Please input weight of material!!!",
                    },
                  ]
                : []
            }
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

export default Material;
