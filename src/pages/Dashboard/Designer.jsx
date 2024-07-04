import { Button, Col, Form, Input, Modal, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
// import Search from "antd/es/transfer/search";

function Designer() {
  const [form] = Form.useForm();
  const user = useSelector(selectUser);

  //state chua data
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [filteredData, setFilteredData] = useState([]);

  //function get data
  const fetchData = async () => {
    const response = await api.get("/order/listOrderTask");
    console.log(response.data);
    setData(response.data);
    // setFilteredData(response.data);
  };
  //chay moi khi load trang web, []: chay 1 lan
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

  const handleDesigner = async (value) => {
    console.log(value);
    try {
      const response = await api.put(`/order/TaskDesigner/${value.id}`,{
        image
      });
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
      title: "Customer name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Product name",
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
      title: "Total",
      dataIndex: "total",
      key: "total",
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
          <Button onClick={() => handleDesigner(values)} type="primary">
            Done
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Row>
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

export default Designer;
