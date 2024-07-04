// import React, { useState, useEffect } from "react";
// import { Row, Col, Button, Card, Image, Layout, List } from "antd";
// import Navbar from "../../components/Navbar/Navbar";
// import Footer from "../../components/Footer/Footer";
// import "./Cart.scss";
// import { ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// import { Content } from "antd/es/layout/layout";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     // This would normally fetch data from an API or local storage
//     const initialCartItems = [
//       {
//         id: "AFEC000459D2DA1",
//         name: "Bông tai kim cương",
//         price: 38050000,
//         quantity: 1,
//         image:
//           "https://tnj.vn/75169-large_default/nhan-bac-nu-dinh-da-10mm-nn0440.jpg",
//         description:
//           "Bông tai kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
//         code: "AFEC000459D2DA1",
//       },
//       {
//         id: "AFPB001948F2HA1",
//         name: "Mặt dây nữ kim cương",
//         price: 17370000,
//         quantity: 1,
//         image:
//           "https://lili.vn/wp-content/uploads/2022/10/Day-chuyen-bac-unisex-dinh-kim-cuong-Moissanite-dang-chuoi-da-LILI_054275_2.jpg",
//         description:
//           "Mặt dây nữ kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
//         code: "AFPB001948F2HA1",
//       },
//       {
//         id: "AFPB001948F8BA1",
//         name: "Dây chuyền nữ kim cương",
//         price: 27790000,
//         quantity: 1,
//         image:
//           "https://lili.vn/wp-content/uploads/2022/06/Mat-day-chuyen-bac-nu-dinh-kim-cuong-Moissanite-tron-cach-dieu-LILI_413898_6-150x150.jpg",
//         description:
//           "Dây chuyền nữ kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
//         code: "AFPB001948F8BA1",
//       },
//     ];
//     setCartItems(initialCartItems);
//   }, []);

//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   const shippingCost = 0; // Miễn phí vận chuyển

//   const removeItem = (id) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id, amount) => {
//     setCartItems((prevItems) => {
//       return prevItems.reduce((acc, item) => {
//         if (item.id === id) {
//           const newQuantity = item.quantity + amount;
//           if (newQuantity > 0) {
//             acc.push({ ...item, quantity: newQuantity });
//           }
//         } else {
//           acc.push(item);
//         }
//         return acc;
//       }, []);
//     });
//   };

//   return (
//     <div className="cart-page-container">
//       <Navbar />

//       <Layout className="cart-container">
//         <Content>
//           <Row>
//             <Col md={8} className="cart-col8">
//               <h5>
//                 <ShoppingCartOutlined /> Giỏ hàng ({totalItems} sản phẩm)
//               </h5>
//               <div className="cart-continue-btn">
//                 <Button variant="light" className="w-100 mt-2" type="button">
//                   <ArrowLeftOutlined /> Tiếp tục mua hàng
//                 </Button>
//               </div>

//               <Card>
//                 <List variant="flush">
//                   {cartItems.map((item) => (
//                     <List.Item key={item.id} className="cart-order-item">
//                       <div className="cart-product-details">
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           className="cart-product-image"
//                         />
//                         <div className="cart-order-item-details">
//                           <h5>{item.name}</h5>
//                           <p>MSP: {item.code}</p>
//                           <div className="cart-quantity-control">
//                             {/* <ButtonGroup>
//                                                         <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</Button>
//                                                         <span className="quantity">{item.quantity}</span>
//                                                         <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, 1)}>+</Button>
//                                                     </ButtonGroup> */}
//                           </div>
//                           <div className="cart-price-info">
//                             <span className="cart-price-text">
//                               Giá tiền:{" "}
//                               <span style={{ color: "red" }}>
//                                 {item.price.toLocaleString()}đ
//                               </span>
//                             </span>
//                             <span>
//                               Tạm tính:{" "}
//                               <span style={{ color: "red" }}>
//                                 {(item.price * item.quantity).toLocaleString()}đ
//                               </span>
//                             </span>
//                           </div>
//                           <span>
//                             Thành tiền:{" "}
//                             <span style={{ color: "red" }}>
//                               {(item.price * item.quantity).toLocaleString()}đ
//                             </span>
//                           </span>
//                           <p>Mô tả: {item.description}</p>
//                           <span
//                             style={{
//                               color: "#ce0303",
//                               cursor: "pointer",
//                               textDecoration: "underline",
//                             }}
//                             onClick={() => removeItem(item.id)}
//                           >
//                             Xóa
//                           </span>
//                         </div>
//                       </div>
//                     </List.Item>
//                   ))}
//                 </List>
//               </Card>
//             </Col>
//             <Col md={4} className="cart-col4">
//               <div className="cart-summary">
//                 <Card>
//                   <Card.Header>
//                     <h4>Tổng Tiền</h4>
//                   </Card.Header>
//                   <Card.Body>
//                     <h5>
//                       Tạm tính:{" "}
//                       <span style={{ color: "black", float: "right" }}>
//                         {total.toLocaleString()} VNĐ
//                       </span>
//                     </h5>
//                     <hr className="cart-solid"></hr>
//                     <h5>
//                       Vận chuyển:{" "}
//                       <span style={{ color: "black", float: "right" }}>
//                         Miễn phí vận chuyển
//                       </span>
//                     </h5>
//                     <hr className="cart-solid"></hr>
//                     <h5>
//                       Thanh toán:{" "}
//                       <span style={{ color: "black", float: "right" }}>
//                         {total.toLocaleString()} VNĐ
//                       </span>
//                     </h5>
//                     <div className="d-flex">
//                       <input
//                         type="text"
//                         className="form-control mr-2"
//                         placeholder="Mã giảm giá/Quà tặng"
//                       />
//                       <Button
//                         style={{ background: "#614A4A" }}
//                         className="cart-apply-button"
//                       >
//                         Áp dụng
//                       </Button>
//                     </div>
//                     <Button
//                       style={{ background: "#ce0303", marginTop: "15px" }}
//                       className="w-100 cart-btn-proceed-to-checkout"
//                       type="submit"
//                     >
//                       Tiến hành đặt hàng
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </div>
//             </Col>
//           </Row>
//         </Content>
//       </Layout>

//       <Footer />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, List, Image } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Cart.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // This would normally fetch data from an API or local storage
    const initialCartItems = [
      {
        id: "AFEC000459D2DA1",
        name: "Bông tai kim cương",
        price: 38050000,
        quantity: 1,
        image:
          "https://tnj.vn/75169-large_default/nhan-bac-nu-dinh-da-10mm-nn0440.jpg",
        description:
          "Bông tai kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
        code: "AFEC000459D2DA1",
      },
      {
        id: "AFPB001948F2HA1",
        name: "Mặt dây nữ kim cương",
        price: 17370000,
        quantity: 1,
        image:
          "https://lili.vn/wp-content/uploads/2022/10/Day-chuyen-bac-unisex-dinh-kim-cuong-Moissanite-dang-chuoi-da-LILI_054275_2.jpg",
        description:
          "Mặt dây nữ kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
        code: "AFPB001948F2HA1",
      },
      {
        id: "AFPB001948F8BA1",
        name: "Dây chuyền nữ kim cương",
        price: 27790000,
        quantity: 1,
        image:
          "https://lili.vn/wp-content/uploads/2022/06/Mat-day-chuyen-bac-nu-dinh-kim-cuong-Moissanite-tron-cach-dieu-LILI_413898_6-150x150.jpg",
        description:
          "Dây chuyền nữ kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
        code: "AFPB001948F8BA1",
      },
    ];
    setCartItems(initialCartItems);
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shippingCost = 0; // Miễn phí vận chuyển

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) => {
      return prevItems.reduce((acc, item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          if (newQuantity > 0) {
            acc.push({ ...item, quantity: newQuantity });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  return (
    <div className="cart-page-container">
      <Navbar />
      <div className="cart-container">
        <Row gutter={16}>
          <Col md={16} className="cart-col8">
            <h5>
              <ShoppingCartOutlined /> Giỏ hàng ({totalItems} sản phẩm)
            </h5>
            <div className="cart-continue-btn">
              <Button type="default" className="w-100 mt-2">
                Tiếp tục mua hàng
              </Button>
            </div>

            <Card>
              <List
                itemLayout="vertical"
                dataSource={cartItems}
                renderItem={(item) => (
                  <List.Item key={item.id} className="cart-order-item">
                    <div className="cart-product-details">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="cart-product-image"
                      />
                      <div className="cart-order-item-details">
                        <h5>{item.name}</h5>
                        <p>MSP: {item.code}</p>
                        <div className="cart-quantity-control">
                          <Button.Group>
                            <Button onClick={() => updateQuantity(item.id, -1)}>
                              -
                            </Button>
                            <span className="quantity">{item.quantity}</span>
                            <Button onClick={() => updateQuantity(item.id, 1)}>
                              +
                            </Button>
                          </Button.Group>
                        </div>
                        <div className="cart-price-info">
                          <span className="cart-price-text">
                            Giá tiền:{" "}
                            <span style={{ color: "red" }}>
                              {item.price.toLocaleString()}đ
                            </span>
                          </span>
                          <span>
                            Tạm tính:{" "}
                            <span style={{ color: "red" }}>
                              {(item.price * item.quantity).toLocaleString()}đ
                            </span>
                          </span>
                        </div>
                        <span>
                          Thành tiền:{" "}
                          <span style={{ color: "red" }}>
                            {(item.price * item.quantity).toLocaleString()}đ
                          </span>
                        </span>
                        <p>Mô tả: {item.description}</p>
                        <span
                          style={{
                            color: "#ce0303",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => removeItem(item.id)}
                        >
                          Xóa
                        </span>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col md={8} className="cart-col4">
            <div className="cart-summary">
              <Card>
                <Card.Meta title="Tổng Tiền" />
                <Card.Grid hoverable={false} style={{ width: "100%" }}>
                  <h5>
                    Tạm tính:{" "}
                    <span style={{ color: "black", float: "right" }}>
                      {total.toLocaleString()} VNĐ
                    </span>
                  </h5>
                  <hr className="cart-solid" />
                  <h5>
                    Vận chuyển:{" "}
                    <span style={{ color: "black", float: "right" }}>
                      Miễn phí vận chuyển
                    </span>
                  </h5>
                  <hr className="cart-solid" />
                  <h5>
                    Thanh toán:{" "}
                    <span style={{ color: "black", float: "right" }}>
                      {total.toLocaleString()} VNĐ
                    </span>
                  </h5>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control mr-2"
                      placeholder="Mã giảm giá/Quà tặng"
                    />
                    <Button
                      style={{ background: "#614A4A" }}
                      className="cart-apply-button"
                    >
                      Áp dụng
                    </Button>
                  </div>
                  <Button
                    style={{ background: "#ce0303", marginTop: "15px" }}
                    className="w-100 cart-btn-proceed-to-checkout"
                    type="submit"
                  >
                    Tiến hành đặt hàng
                  </Button>
                </Card.Grid>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}
