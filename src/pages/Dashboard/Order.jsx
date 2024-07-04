import { Col, Form, Input, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { SearchOutlined } from "@ant-design/icons";

// import Search from "antd/es/transfer/search";

function Order() {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState({});

  //state chua data
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  //function get data
  const fetchData = async () => {
    const response = await api.get("/order");
    console.log(response.data);
    setData(response.data);
  };
  //chay moi khi laod trang web, []: chay 1 lan
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async (value) => {
    console.log(value);
    try {
      const response = await api.get(`/order/search?param=${value}`);
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
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
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
      title: "Order date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Start-making date",
      dataIndex: "handDate",
      key: "handDate",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div>
      <Row className="Modal-header" justify={"space-between"}>
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

      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default Order;
