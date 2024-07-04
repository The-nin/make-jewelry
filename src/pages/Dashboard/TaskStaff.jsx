import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

function Seller() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const usered = useSelector(selectUser);

  const filterData = (listOrder) => {
    const filteredOrders = [];
    listOrder.forEach((item) => {
      console.log(item);
      item.processOrders.forEach((user) => {
        if (usered.id === user.id) {
          console.log("cccc")
          filteredOrders.push(item);
        }
      });
    });
    return filteredOrders;
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/order/listOrderTask");
      console.log(response.data);

      if (Array.isArray(response.data)) {
        setData(filterData(response.data));
      } else {
        console.error("Fetched data is not an array:", response.data);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeller = async (value) => {
    console.log(value);
    try {
      const response = await api.put(`/order/TaskSeller/${value.id}`);
      console.log(response.data);

      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error("Fetched data is not an array:", response.data);
      }
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
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
      render: (image) => <img width={200} height={150} src={image} alt="" />,
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
          <Button onClick={() => handleSeller(values)} type="primary">
            Done
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default Seller;
