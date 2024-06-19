//import React from 'react';
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-section">
            <h1>Happy Golden</h1>
            <p>Email: HappyGolden@gmail.com</p>
            <p>Address: 30 Nguyen Hue, District 1, HCMC</p>
            <p>Phone Number: +84 76530821 </p>
            <p>&copy; Copyright 2024. HappyGolden.store</p>
          </div>

          <div className="footer-section">
            <h3>CUSTOMER SERVICES</h3>
            <p>Instructions on how to order Manufacture Product</p>
            <p>Instructions for payment</p>
            <p>Frequently asked questions</p>
            <h3>Purchasing policy</h3>
            <p>Product Warranty Policy</p>
            <p>Customer Privacy Policy</p>
          </div>

          <div className="footer-section">
            <h3>Social Media</h3>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fas fa-envelope"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
