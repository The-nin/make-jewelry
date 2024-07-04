import { Button, Col, Form, Input, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { SearchOutlined } from "@ant-design/icons";

// import Search from "antd/es/transfer/search";

function OrderApproval() {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState({});

  //state chua data
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  //function get data
  const fetchData = async () => {
    const response = await api.get("/order/listOrderWaitAcceptManager");
    console.log(response.data);
    setData(response.data);
  };
  //chay moi khi laod trang web, []: chay 1 lan
  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (values) => {
    try {
      const res = await api.put(
        `/order/ChangeStatusProcessOrder?id=${values.id}&status=true`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };

  const handleReject = async (values) => {
    const res = await api.put(
      `order/ChangeStatusProcessOrder/?id=${values.id}?status=false`
    );
    console.log(res);
  };

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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      render: (values) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "13px" }}>
          <Button onClick={() => handleAccept(values)} type="primary">
            Accept
          </Button>

          <Button
            onClick={() => handleReject(values)}
            danger
            primary
            type="primary"
          >
            Reject
          </Button>
        </div>
      ),
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

export default OrderApproval;
