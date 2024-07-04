import { Button, Col, Form, Input, Modal, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
// import Search from "antd/es/transfer/search";

function Stone() {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stone, setStone] = useState({});
  const [title, setTitle] = useState("ADD NEW STONE");

  //state chua data
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [filteredData, setFilteredData] = useState([]);

  //function get data
  const fetchData = async () => {
    const response = await api.get("/stone");
    console.log(response.data);
    setData(response.data);
    // setFilteredData(response.data);
  };
  //chay moi khi laod trang web, []: chay 1 lan
  useEffect(() => {
    fetchData();
  }, [isModalOpen]);

  const handleDisable = async (values) => {
    console.log(values);
    //call api disable stone
    const response = await api.patch(`/stone/${values.id}`);
    //loc ra all data, loai bo data vua bi xoa
    // setData(data.filter((data) => data.id != values.id));
    fetchData();
  };

  const handleUpdate = async (values) => {
    setIsModalOpen(true);
    setTitle("Update stone");
    form.setFieldsValue(values);
    setStone(values);
  };

  const handleSearch = async (value) => {
    console.log(value);
    try {
      const response = await api.get(`/stone/search?param=${value}`);
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
      title: "Stone Name",
      dataIndex: "name",
      key: "name",
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
        <div style={{ display: "flex", justifyContent: "center", gap: "13px" }}>
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
    setStone({});
    setTitle("ADD NEW STONE");
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    if (stone.id == null) {
      //call api add stone
      const response = await api.post("/stone", values);
      // add xong -> render lai man hinh moi nhat thi state phai thay doi
      setData([...data, response.data]);
      setIsModalOpen(false);
      console.log(response);
    } else {
      //call api update stone
      const response = await api.put(`/stone/${stone.id}`, {
        status: stone.status,
        name: values.name,
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
  const validateStoneName = async (rules, value) => {
    if (!value) {
      throw new Error("validate category name,please input again!!!");
    }
  };

  return (
    <div>
      <Row className="Modal-header" justify={"space-between"}>
        <Col>
          <Button type="primary" onClick={showModal}>
            Add new stone
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
            label="Stone Name"
            name="name"
            rules={[
              {
                require: true,
                message: "Please input stone name!!!",
                validator: validateStoneName,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                require: true,
                message: "Please input price!!!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label="Price"
            name="price"
            rules={
              stone.id == null
                ? [
                    {
                      require: true,
                      message: "Please input price of stone!!!",
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

export default Stone;
