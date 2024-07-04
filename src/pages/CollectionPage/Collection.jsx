import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import api from "../../config/axios";
import "./Collection.scss";

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const Collection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/product-template");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div>
      <Navbar />

      <div className="product-grid">
        <Row>
          <Col>
            {products.map((products) => (
              <Card key={products.id} className="product-card">
                <img
                  width={150}
                  height={100}
                  src={products.image}
                  alt={products.productName}
                  className="product-image"
                />
                <div className="product-info">
                  <h2>{products.productName}</h2>
                  <p>{products.orderDate}</p>
                </div>
                <Button>Detail</Button>
              </Card>
            ))}
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default Collection;
