import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Table,
  message,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "./config/axios";
import moment from "moment"; // 292.3K (gzipped: 71.6K)

function Product_template() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Material",
      dataIndex: "materialId",
      key: "materialId",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
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
            label="Price"
            name="price"
            rule={[
              {
                require: true,
                message: "Please input product price",
              },
            ]}
          >
            <Input />
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
            <DatePicker format="YYYY-MM-DD" />
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
            label="Weight"
            name="weight"
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
            label="Quantity"
            name="quantity"
            rule={[
              {
                require: true,
                message: "Please input quantity of product",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rule={[
              {
                require: true,
                message: "Please input product image",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Meterial"
            name="materialId"
            rule={[
              {
                require: true,
                message: "Please input product meterial",
              },
            ]}
          >
            <Select placeholder="Select material">
              <Select.Option value="1">Gold 24K</Select.Option>
              <Select.Option value="2">Gold 22K</Select.Option>
              <Select.Option value="3">Gold 18K</Select.Option>
              <Select.Option value="4">Gold 14K</Select.Option>
              <Select.Option value="5">Gold 10K</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rule={[
              {
                require: true,
                message: "Please input product category",
              },
            ]}
          >
            <Select placeholder="Select category">
              <Select.Option value="1">Ring</Select.Option>
              <Select.Option value="2">Necklace</Select.Option>
              <Select.Option value="3">Pendant</Select.Option>
              <Select.Option value="4">Earring</Select.Option>
              <Select.Option value="5">Bangles</Select.Option>
              <Select.Option value="6">Bracelet</Select.Option>
            </Select>
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
