// //import React from 'react';
// import PropTypes from "prop-types";
// // import "./Navbar.scss";
// import "./index.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSignOutAlt,
//   faShoppingCart,
//   faSearch,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function Navbar() {
//   const PrevArrow = ({ className, style, onClick }) => {
//     return (
//       <button
//         className={`${className} custom-prev-arrow`}
//         style={{ ...style, left: "50px" }}
//         onClick={onClick}
//       >
//         Pre
//       </button>
//     );
//   };

//   PrevArrow.propTypes = {
//     className: PropTypes.string,
//     style: PropTypes.object,
//     onClick: PropTypes.func,
//   };

//   const NextArrow = ({ className, style, onClick }) => {
//     return (
//       <button
//         className={`${className} custom-next-arrow`}
//         style={{ ...style, right: "50px" }}
//         onClick={onClick}
//       >
//         Next
//       </button>
//     );
//   };

//   NextArrow.propTypes = {
//     className: PropTypes.string,
//     style: PropTypes.object,
//     onClick: PropTypes.func,
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     prevArrow: <PrevArrow />,
//     nextArrow: <NextArrow />,
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-lg">
//         <div className="container">
//           <a className="navbar-brand fw-bold fs-4" href="#">
//             Happy Golden
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav mx-auto mb-3 mb-lg-0">
//               <li className="nav-item">
//                 <a className="nav-link home" aria-current="page" href="#">
//                   Home
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   Category
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   Product
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   Contact
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   Blog
//                 </a>
//               </li>
//             </ul>
//             <form className="d-flex">
//               <div className="input-group">
//                 <input
//                   className="form-control"
//                   type="search"
//                   placeholder="Search"
//                   aria-label="Search"
//                 />
//                 <button className="btn btn-outline-dark" type="submit">
//                   <FontAwesomeIcon icon={faSearch} />
//                 </button>
//               </div>
//             </form>
//             <div className="buttons ms-2">
//               <a href="#" className="btn btn-outline-dark me-1">
//                 <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//               </a>
//               <a href="#" className="btn btn-outline-dark ms-1">
//                 <FontAwesomeIcon icon={faShoppingCart} /> Cart (0)
//               </a>
//               <a href="#" className="btn btn-outline-dark ms-2">
//                 <FontAwesomeIcon icon={faUser} /> My Account
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <Slider className="slider-container" {...settings}>
//         <div>
//           <img
//             src="/Public/bg.jpg"
//             className="img-fluid full-screen-img"
//             alt="Description of the image"
//           />
//         </div>
//         <div>
//           <img
//             src="/Public/bg2.jpg"
//             className="img-fluid full-screen-img"
//             alt="Description of the image"
//           />
//         </div>
//         <div>
//           <img
//             src="/Public/bg3.jpg"
//             className="img-fluid full-screen-img"
//             alt="Description of the image"
//           />
//         </div>
//       </Slider>
//     </div>
//   );
// }

// export default Navbar;

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faShoppingCart,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Layout, Menu, Input, Button, Row, Col } from "antd";
import "./index.scss";

const { Header } = Layout;
const { Search } = Input;

function Navbar() {
  const PrevArrow = ({ className, style, onClick }) => {
    return (
      <button
        className={`${className} custom-prev-arrow`}
        style={{ ...style, left: "50px" }}
        onClick={onClick}
      >
        Pre
      </button>
    );
  };

  PrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };

  const NextArrow = ({ className, style, onClick }) => {
    return (
      <button
        className={`${className} custom-next-arrow`}
        style={{ ...style, right: "50px" }}
        onClick={onClick}
      >
        Next
      </button>
    );
  };

  NextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="container">
          <Row justify="space-between" align="middle">
            <Col>
              <a className="navbar-brand" href="#">
                Happy Golden
              </a>
            </Col>
            <Col>
              <Menu
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                className="navbar-nav menu"
              >
                <Menu.Item key="1">
                  <a className="nav-link home" href="#">
                    Home
                  </a>
                </Menu.Item>
                <Menu.Item key="2">
                  <a className="nav-link" href="#">
                    Category
                  </a>
                </Menu.Item>
                <Menu.Item key="3">
                  <a className="nav-link" href="#">
                    Product
                  </a>
                </Menu.Item>
                <Menu.Item key="4">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </Menu.Item>
                <Menu.Item key="5">
                  <a className="nav-link" href="#">
                    Blog
                  </a>
                </Menu.Item>
              </Menu>
            </Col>
            <Col>
              <Search
                placeholder="Search"
                onSearch={(value) => console.log(value)}
                style={{ width: 200 }}
                enterButton={<FontAwesomeIcon icon={faSearch} />}
              />
            </Col>
            <Col>
              <div className="buttons">
                <Button
                  type="default"
                  icon={<FontAwesomeIcon icon={faSignOutAlt} />}
                  className="me-1"
                >
                  Logout
                </Button>
                <Button
                  type="default"
                  icon={<FontAwesomeIcon icon={faShoppingCart} />}
                  className="ms-1"
                >
                  Cart (0)
                </Button>
                <Button
                  type="default"
                  icon={<FontAwesomeIcon icon={faUser} />}
                  className="ms-2"
                >
                  My Account
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Header>
      <div className="slider-container full-width-container">
        <Slider {...settings}>
          <div>
            <img
              src="/Public/bg.jpg"
              className="img-fluid full-screen-img"
              alt="Description of the image"
            />
          </div>
          <div>
            <img
              src="/Public/bg2.jpg"
              className="img-fluid full-screen-img"
              alt="Description of the image"
            />
          </div>
          <div>
            <img
              src="/Public/bg3.jpg"
              className="img-fluid full-screen-img"
              alt="Description of the image"
            />
          </div>
        </Slider>
      </div>
    </Layout>
  );
}

export default Navbar;
