import { Button, Col, Form, Input, Modal, Row, Select, Table } from "antd";
import api from "../../config/axios";
// import {
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
import { useEffect, useState } from "react";

function ListOfOrder() {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalStaffOpen, setIsModaStaffOpen] = useState(false);
  // const [material, setMaterial] = useState({});
  // const [title, setTitle] = useState("ADD NEW MATERIAL");
  const [staffs, setStaffs] = useState([]);
  const [data, setData] = useState([]);
  const [newdata, setNewData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [staffsRole, setStaffsRole] = useState([]);

  const [orderId, setOrderId] = useState(0);
  const [staffId, setStaffId] = useState(0);

  const fetchData = async () => {
    const response = await api.get("/order/listOrderRequest");
    setData(response.data);
    setNewData(response.data);
  };

  const fetchDataStaff = async () => {
    const response = await api.get("/listStaff");
    console.log(response.data);
    setStaffsRole(response.data);
    setStaffs(response.data);
    console.log(response.data.staffsRole);
  };

  // const handleDetailStaff = async (values) => {
  //   const response = await api.get("/listStaff");
  //   setIsModaStaffOpen(true);
  // };

  useEffect(() => fetchDataStaff(), [isModalStaffOpen]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (id) => {
    console.log(id);

    // setData(data.filter((data) => data != dataAssign));
    const response = await api.put(`/order/Send-Work/${orderId}`, {
      staffId: id,
    });
    console.log(response.data);
    setNewData(data.filter((item) => item.id != orderId));
    setIsModalOpen(false);
  };

  const handleAssignStaff = async (values) => {
    console.log(values);
    setOrderId(values.id);
    setIsModalOpen(true);

    if (values.status == "INIT") {
      setStaffsRole(staffs.filter((staff) => staff.role == "SELLER"));
    }
    if (values.status == "APPROVAL_CUSTOMER") {
      setStaffsRole(staffs.filter((staff) => staff.role == "DESIGNER"));
    }
    if (values.status == "APPROVAL3D_CUSTOMER") {
      setStaffsRole(staffs.filter((staff) => staff.role == "MAKER_PRODUCT"));
    }
  };

  const handleDetails = () => {
    setIsModalOpen(false);
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
    {
      title: "",
      render: (values) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "13px" }}>
          <Button onClick={() => handleAssignStaff(values)} type="primary">
            Assign
          </Button>
        </div>
      ),
    },
  ];

  const columnsStaff = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Staff Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
  ];

  const columnsAsignStaff = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Staff Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "",
      dataIndex: "id",
      render: (value) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "13px" }}>
          <Button onClick={() => handleAssign(value)} type="primary">
            Assign
          </Button>
          {/* <Button onClick={() => handleDetailStaff(values)} type="primary">
            Detail staff
          </Button> */}
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
    setIsModaStaffOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModaStaffOpen(false);
  };

  // const onFinish = async (values) => {
  //   if (material.id == null) {
  //     const response = await api.post("/material", values);
  //     setData([...data, response.data]);
  //     setIsModalOpen(false);
  //   } else {
  //     const response = await api.put(`/material/${material.id}`, {
  //       status: material.status,
  //       name: values.name,
  //       weight: values.weight,
  //       price: values.price,
  //     });
  //     setIsModalOpen(false);
  //   }
  // };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    setNewData(data.filter((item) => item.status == value));
    console.log(value);
  };
  return (
    <div>
      <Row>
        <Col span={24}>
          <Select
            defaultValue="All"
            style={{
              width: 180,
            }}
            onChange={handleChange}
            options={[
              {
                value: "INIT",
                label: "Assign to seller",
              },
              {
                value: "APPROVAL_CUSTOMER",
                label: "Assign to designer",
              },
              {
                value: "APPROVAL3D_CUSTOMER",
                label: "Assign to production",
              },
            ]}
          />
          <div
            style={{ height: "600px", overflowY: "scroll", marginTop: "10px" }}
          >
            <Table dataSource={newdata} columns={columns} pagination={false} />
          </div>
        </Col>
      </Row>

      <Modal
        footer={false}
        title="Oder List"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table columns={columnsAsignStaff} dataSource={staffsRole} />
      </Modal>

      <Modal
        footer={false}
        title="Staff List"
        open={isModalStaffOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table columns={columnsStaff} dataSource={staffs} />
      </Modal>
    </div>
  );
}

export default ListOfOrder;
