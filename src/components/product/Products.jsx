import React, { useState, useEffect } from "react";
import "./Products.scss";

const products = [
  { name: "Nhẫn Kim Cương 18k HAG 000PC000379", imgSrc: "/Public/R1.png" },
  { name: "Nhẫn Vàng Hồng 14k Đính Đá Sapphire HAG 000HD000391", imgSrc: "" },
  { name: "Nhẫn Vàng Nguyên Khối HAG 000VF000267", imgSrc: "" },
  { name: "Nhẫn Vàng 24k Đính Kim Cương HAG 000MD000123", imgSrc: "" },
  { name: "Nhẫn Vàng Trắng 18K Đính Đá ECZ HAG 000AD000567", imgSrc: "" },
  { name: "Nhẫn Kim Cương Vàng 18k HAG 000PC000380", imgSrc: "" },
  { name: "Nhẫn Vàng Hồng 14k Đính Đá Ruby HAG 000HD000392", imgSrc: "" },
  { name: "Nhẫn Bạc 925 Đính Đá CZ HAG 000VF000268", imgSrc: "" },
  { name: "Nhẫn Vàng 24k Đính Đá Quý HAG 000MD000124", imgSrc: "" },
];

const Product = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const itemsPerPage = 4;
  const totalItems = products.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => {
        if (prevIndex >= totalItems - itemsPerPage) {
          return 0; // Quay lại ảnh đầu tiên khi đạt đến ảnh cuối cùng
        }
        return prevIndex + 1;
      });
    }, 3000); // Trượt sau mỗi 3 giây

    return () => clearInterval(interval);
  }, [totalItems, itemsPerPage]);

  const handlePrevClick = () => {
    setSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setSlideIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalItems - itemsPerPage)
    );
  };

  return (
    <div className="product-container">
      <h2>Products Sample</h2>
      <h3>Ring</h3>
      <div className="slider">
        <button
          className={`slider-button left ${slideIndex === 0 ? "disabled" : ""}`}
          onClick={handlePrevClick}
          disabled={slideIndex === 0}
        >
          &lt;
        </button>
        <div className="product-list-wrapper">
          <div
            className="product-list"
            style={{
              transform: `translateX(-${slideIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {products.map((product, index) => (
              <div key={index} className="product-item">
                <div className="product-image">
                  <img src={product.imgSrc} alt={product.name} />
                </div>
                <div className="product-name">
                  <h4>{product.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className={`slider-button right ${
            slideIndex >= totalItems - itemsPerPage ? "disabled" : ""
          }`}
          onClick={handleNextClick}
          disabled={slideIndex >= totalItems - itemsPerPage}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Product;
