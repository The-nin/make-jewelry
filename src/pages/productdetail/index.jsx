import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axios";

function ProductDetail() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);

  //function get data
  const fetchData = async () => {
    const response = await api.get("/category");
    console.log(response.data);
    setData(response.data);
    // setFilteredData(response.data);
  };
  //chay moi khi laod trang web, []: chay 1 lan
  useEffect(() => {
    fetchData();
  }, [isModalOpen]);

  return <div>ProductDetail</div>;
}

export default ProductDetail;
