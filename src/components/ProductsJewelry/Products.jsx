import React, { useEffect, useState } from "react";
import ProductSlider from "./ProductSlider";
import "./Products.scss";
import api from "../../config/axios";

const products = [
  {
    name: "Nhẫn Vàng Hồng 14k Đính Đá Sapphire HAG 000HD000391",
    imgSrc: "/Public/R1.png",
  },
  { name: "Nhẫn Vàng Nguyên Khối HAG 000VF000267", imgSrc: "/Public/R1.png" },
  {
    name: "Nhẫn Vàng 24k Đính Kim Cương HAG 000MD000123",
    imgSrc: "/Public/R1.png",
  },
  {
    name: "Nhẫn Vàng Trắng 18K Đính Đá ECZ HAG 000AD000567",
    imgSrc: "/Public/R1.png",
  },
  { name: "Nhẫn Kim Cương Vàng 18k HAG 000PC000380", imgSrc: "/Public/R1.png" },
  {
    name: "Nhẫn Vàng Hồng 14k Đính Đá Ruby HAG 000HD000392",
    imgSrc: "/Public/R1.png",
  },
  { name: "Nhẫn Bạc 925 Đính Đá CZ HAG 000VF000268", imgSrc: "/Public/R1.png" },
  {
    name: "Nhẫn Vàng 24k Đính Đá Quý HAG 000MD000124",
    imgSrc: "/Public/R1.png",
  },
];

const necklaces = [
  { name: "Dây chuyền vàng 18k HAG 000NC000001", imgSrc: "/Public/R1.png" },
  { name: "Dây chuyền bạc 925 HAG 000NC000002", imgSrc: "/Public/R1.png" },
  { name: "Dây chuyền vàng 24k HAG 000NC000003", imgSrc: "/Public/R1.png" },
  { name: "Dây chuyền vàng 18k HAG 000NC000004", imgSrc: "/Public/R1.png" },
  { name: "Dây chuyền vàng 18k HAG 000NC000005", imgSrc: "/Public/R1.png" },
  { name: "Dây chuyền bạc 925 HAG 000NC000006", imgSrc: "/Public/R1.png" },
  { name: "Dây chuyền vàng 24k HAG 000NC000007", imgSrc: "/Public/R1.png" },
  { name: "Dây chuyền vàng 18k HAG 000NC000008", imgSrc: "/Public/R1.png" },
];

const Products = () => {
  //state chua data
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [filteredData, setFilteredData] = useState([]);

  //function get data
  const fetchData = async () => {
    const response = await api.get("product-template");
    console.log(response.data);
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="product-container">
      <h2>Bộ Sưu Tập</h2>
      <h3>Nhẫn</h3>
      <ProductSlider products={data} />
      <div className="additional-image">
        <img src="/Public/Poster1.png" alt="Additional Image" />
      </div>
      <h3 className="necklace-title">Dây Chuyền</h3>{" "}
      {/* Thêm class "necklace-title" */}
      <ProductSlider products={necklaces} />
      <div className="additional-image">
        <img src="/Public/Poster1.png" alt="Additional Image" />
      </div>
    </div>
  );
};

export default Products;
