// ProductSlider.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductSlider = ({ products }) => {
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
  }, [totalItems]);

  const handlePrevClick = () => {
    setSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setSlideIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalItems - itemsPerPage)
    );
  };

  const navigate = useNavigate();
  return (
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
              <div
                className="product-image"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img src={product.image} alt={product.productName} />
              </div>
              <div className="product-name">
                <h4>{product.productName}</h4>
              </div>
              <div className="product-contact">
                <p>Liên hệ</p>
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
  );
};

export default ProductSlider;
