import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Upload,
  message,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "./config/axios";
import moment from "moment"; // 292.3K (gzipped: 71.6K)
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const { Option } = Select;

function Product_template() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [material, setMaterial] = useState([]);
  const [category, setCategory] = useState([]);
  const [stone, setStone] = useState([]);

  //state chua data
  const [data, setData] = useState([]);
  //function get data
  const fetchData = async () => {
    const response = await api.get("/product-template");
    console.log(response.data);
    setData(response.data);
  };
  //chay moi khi load trang web, []: chay 1 lan
  useEffect(() => {
    fetchData();
  }, []);

  const fetchAll = async () => {
    try {
      const [materialResponse, categoryResponse, stoneResponse] =
        await Promise.all([
          api.get("/material"),
          api.get("/category"),
          api.get("/stone"),
        ]);

      setMaterial(materialResponse.data);
      setCategory(categoryResponse.data);
      setStone(stoneResponse.data);

      console.log([
        materialResponse.data,
        categoryResponse.data,
        stoneResponse.data,
      ]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDisable = async (values) => {
    console.log(values);
    //call api disable product
    const response = await api.patch(`/product-template/${values.id}`);
    //loc ra all data, loai bo data vua bi xoa
    // setData(data.filter((data) => data.id != values.id));
    fetchData();
  };

  const handleUpdate = async (values) => {
    console.log(values);
    //call api update product
    const response = await api.put(`/product-template/${values.id}`);
    //loc ra all data, loai bo data vua bi xoa
    setData(data.filter((data) => data.id != values.id));
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <img width={200} height={150} src={image} alt="" />;
      },
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      key: "thickness",
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

          <Button onClick={() => handleDisable(values)} danger type="primary">
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
    var responseDate = moment(values.date).format("YYYY-MM-DD");

    const response = await api.post("/product-template", values);
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
        Add new product
      </Button>
      <Modal
        footer={false}
        title="ADD NEW PRODUCT"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        style={{
          textAlign: "center",
        }}
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
            textAlign: "center",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              {
                require: true,
                message: "Please input product name!!!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="material"
            name="materialId"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select placeholder="Select material" style={{ width: "100%" }}>
              {material.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="stone" name="stoneId">
            <Select placeholder="Select stone" style={{ width: "100%" }}>
              {stone.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="category"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select placeholder="Select category" style={{ width: "100%" }}>
              {category.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rule={[
              {
                require: true,
                message: "Please input product date",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Size"
            name="size"
            rule={[
              {
                require: true,
                message: "Please input product size",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rule={[
              {
                require: true,
                message: "Please input product size",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Weight of stone"
            name="weightStone"
            rule={[
              {
                require: true,
                message: "Please input product weight",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Thickness"
            name="thickness"
            rule={[
              {
                require: true,
                message: "Please input product discribe",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rule={[
              {
                require: true,
                message: "Please input product discribe",
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

export default Product_template;
