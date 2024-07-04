import React, { useEffect } from "react";
import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  useEffect(() => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const handleScroll = () => {
      const scrollTotal =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (document.documentElement.scrollTop / scrollTotal > 0.2) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollToTopBtn.addEventListener("click", scrollToTop);
    window.addEventListener("scroll", handleScroll);

    return () => {
      scrollToTopBtn.removeEventListener("click", scrollToTop);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About us</h4>
          <ul>
            <li>
              <b>Happy Golden</b>
            </li>
            <li>
              <b>Adrress</b>: 999 Pasteur, District 3, Hồ Chí Minh City
            </li>
            <li>
              <b>Phone </b>: 0342065777
            </li>
            <li>
              <b>Email</b>:{" "}
              <a href="mailto:HappyGolden@gmail.com">HappyGolden@gmail.com</a>
            </li>
            <li>
              <b>Website</b>:{" "}
              <a
                href="http://localhost:5173/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://happygolden.vn
              </a>
            </li>
          </ul>
          <h4>Contact us:</h4>
          <div className="social-icons">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://web.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>

        <div className="footer-section info-section">
          <h4>Information</h4>
          <ul>
            <li>
              <a href="#"> Purchases policy</a>
            </li>
            <li>
              <a href="#"> Payment policy</a>
            </li>
            <li>
              <a href="#"> Warranty policy</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Get more information</h4>
          <p>
            Receive information about the newest product, promotions and more.
          </p>
          <div className="newsletter-signup">
            <form action="">
              <input type="email" placeholder="Enter your email..." />
              <button type="button">Submit</button>
            </form>
          </div>
          <div className="for-payment">
            <h4>Payment method</h4>
            <img
              src="/Public/payment.png"
              alt="Payment Methods"
              className="payment-image"
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <button id="scrollToTopBtn" className="scroll-to-top">
          <i className="arrow-up"></i>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
