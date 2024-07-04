import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../hooks/useUpload";
import api from "../../config/axios";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./index.scss";
import { useEffect, useState } from "react";
const formItem = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = async (values) => {
  values.accountId = 0;
  console.log(values);
  const imgUrl = await uploadFile(values.image[0].originFileObj);
  console.log(imgUrl);
  console.log("Success:", {
    quantity: values.quantity,
    materialId: values.materialId,
    categoryId: values.categoryId,
    stoneId: values.stoneId,
    accountId: values.accountId,
    productName: values.productName,
    weightStone: values.weightStone,
    size: values.size,
    description: values.description,
    thickness: values.thickness,
    image: imgUrl,
  });
  try {
    const response = await api.post("/order", {
      quantity: values.quantity,
      materialId: values.materialId,
      categoryId: values.categoryId,
      stoneId: values.stoneId,
      accountId: values.accountId,
      productName: values.productName,
      weightStone: values.weightStone,
      size: values.size,
      description: values.description,
      thickness: values.thickness,
      image: imgUrl,
    });

    console.log(response);
  } catch (error) {
    console.error("Error submitting order:", error);
  }
};
const RequestProduct = () => {
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderReq, setOrderReq] = useState({});
  const [material, setMaterial] = useState([]);
  const [category, setCategory] = useState([]);
  const [stone, setStone] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  console.log(dataSource);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchData = async () => {
    const response = await api.get("/order");
    console.log(response.data);
    setDataSource(response.data);
  };
  useEffect(() => {
    fetchData();
  }, [isModalOpen]);

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
  // const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  //   {
  //     title: "Product Name",
  //     dataIndex: "productName",
  //     key: "productName",
  //   },
  //   {
  //     title: "Image",
  //     dataIndex: "image",
  //     key: "image",
  //     render: (image) => {
  //       return <img width={150} src={image} alt="" />;
  //     },
  //   },
  //   {
  //     title: "Material",
  //     dataIndex: "materialId",
  //     key: "materialId",
  //   },
  //   {
  //     title: "Stone",
  //     dataIndex: "stoneId",
  //     key: "stoneId",
  //   },
  //   {
  //     title: "Category",
  //     dataIndex: "categoryId",
  //     key: "categoryId",
  //   },
  //   {
  //     title: "Quantity",
  //     dataIndex: "quantity",
  //     key: "quantity",
  //   },
  //   {
  //     title: "Weight of stone",
  //     dataIndex: "weightStone",
  //     key: "weightStone ",
  //   },
  //   {
  //     title: "Size",
  //     dataIndex: "size",
  //     key: "size",
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //   },
  //   {
  //     title: "Thickness",
  //     dataIndex: "thickness",
  //     key: "thickness",
  //   },
  // ];
  
  return (
    <div className="request-background">
      <Navbar />
      {/* <Modal
        title="List of order"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1500}
      >
        <Table dataSource={dataSource} columns={columns} />
      </Modal> */}

      {/* <Button
        style={{ marginTop: "20px" }}
        onClick={() => setIsModalOpen(true)}
      >
        Show Order
      </Button> */}

      <div className="bookingRequest">
        <Row className="book">
          <Form
            {...formItem}
            variant="filled"
            // style={{
            //   maxWidth: 300,
            // }}
            onFinish={onFinish}
            className="book-form"
          >
            <h1 className="header">BOOKING REQUEST</h1>
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
              <Select placeholder="Select material" style={{ width: "100%" }}>
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
              <Select placeholder="Select material" style={{ width: "100%" }}>
                {category.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="productName"
              name="productName"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input.TextArea style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              label="weightStone"
              name="weightStone"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              label="size"
              name="size"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              label="thickness"
              name="thickness"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
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
              wrapperCol={{
                offset: 6,
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

      <Footer />
    </div>
  );
};

export default RequestProduct;
