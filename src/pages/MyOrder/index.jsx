import { Button, Card, Col, Form, Row } from "antd";
import "./index.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import api from "../../config/axios";

function MyOrder() {
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/order/GetOrderByAccountId");
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
        setOrders([]);
      }
      console.log(orders);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleCusCheck = async (values) => {
    try {
      const res = await api.put(`/order/checkAcceptCustomer/${values.id}`);
      console.log(res.data);
    } catch (error) { 
      console.error("Error updating order", error);
    }
  };

  return (
    <div className="order-background">
      <Navbar />
      <h2 className="header">MY ORDER</h2>

      <div className="myOrder">
        <Row>
          <Col>
            {orders.map((order) => (
              <Card key={order.id} className="product-card">
                <img
                  width={150}
                  height={100}
                  src={order.image}
                  alt={order.productName}
                  className="product-image"
                />
                <div className="product-info">
                  <h2>{order.productName}</h2>
                  <p>{order.orderDate}</p>
                </div>
                <Button>Detail</Button>
                <Button onClick={() => handleCusCheck()} type="primary">
                  Accept
                </Button>
              </Card>
            ))}
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  );
}
export default MyOrder;

// import React, { useEffect, useState } from "react";
// import { Button, Card, Col, Row } from "antd";
// import api from "../../config/axios";
// import "./ProductGrid.css";
// import Footer from "../../components/Footer/Footer";
// import Navbar from "../../components/Navbar/Navbar";

// const MyOrder = () => {
//   const [orders, setOrders] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await api.get("/order/GetOrderByAccountId");
//       setOrders(response.data);
//       console.log(orders);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleCusCheck = async (values) => {
//     const res = await api.put(`/order/checkAcceptCustomer/${values.id}`);
//     console.log(res.data);
//   };

//   return (
//     <div>
//       <Navbar />

//       <div className="product-grid">
//         <Row>
//           <Col>
//             {orders.map((order) => (
//               <Card key={order.id} className="product-card">
//                 <img
//                   width={150}
//                   height={100}
//                   src={order.image}
//                   alt={order.productName}
//                   className="product-image"
//                 />
//                 <div className="product-info">
//                   <h2>{order.productName}</h2>
//                   <p>{order.orderDate}</p>
//                 </div>
//                 <Button>Detail</Button>
//                 <Button onClick={() => handleCusCheck()} type="primary">
//                   Accept
//                 </Button>
//               </Card>
//             ))}
//           </Col>
//         </Row>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default MyOrder;
