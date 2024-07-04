import { Button, Col, Form, Input, Modal, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "./config/axios";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
// import Search from "antd/es/transfer/search";

function Category() {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState({});
  const [title, setTitle] = useState("ADD NEW CATEGORY");

  //state chua data
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [filteredData, setFilteredData] = useState([]);

  //function get data
  const fetchData = async () => {
    const response = await api.get("/category");
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
    //call api disable material
    const response = await api.patch(`/category/${values.id}`);
    //loc ra all data, loai bo data vua bi xoa
    // setData(data.filter((data) => data.id != values.id));
    fetchData();
  };

  const handleUpdate = async (values) => {
    setIsModalOpen(true);
    setTitle("Update category");
    form.setFieldsValue(values);
    setCategory(values);
  };

  const handleSearch = async (value) => {
    console.log(value);
    try {
      const response = await api.get(`/category/search?param=${value}`);
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
    setCategory({});
    setTitle("ADD NEW CATEGORY");
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    if (category.id == null) {
      //call api add category
      const response = await api.post("/category", values);
      // add xong -> render lai man hinh moi nhat thi state phai thay doi
      setData([...data, response.data]);
      setIsModalOpen(false);
      console.log(response);
    } else {
      //call api update category
      const response = await api.put(`/category/${category.id}`, {
        status: category.status,
        name: values.name,
      });

      // setData([...data, response.data]);
      setIsModalOpen(false);
      console.log(response);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const validateMaterialName = async (rules, value) => {
    if (!value) {
      throw new Error("validate category name,please input again!!!");
    }
  };

  return (
    <div>
      <Row className="Modal-header" justify={"space-between"}>
        <Col>
          <Button type="primary" onClick={showModal}>
            Add new category
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
            label="Material Name"
            name="name"
            rules={[
              {
                require: true,
                message: "Please input material name!!!",
                validator: validateMaterialName,
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
