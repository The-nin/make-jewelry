import React, { useState } from "react";
import { Layout, Menu, Input, Button, Dropdown, Col, Row } from "antd";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import LoginOutlined from "@ant-design/icons/LoginOutlined";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../redux/features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "antd/es/menu/MenuItem";
const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);

  const handleLogout = () => {
    console.log(user);
    dispatch(logout());
    navigate("/login");
  };

  const Menu1 = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="history-order" onClick={() => navigate("/my-order")}>
        My Order
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="layout">
      <Header className="navbar">
        <div className="logo">Happy Golden</div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[""]}
          className="menu"
        >
          <Menu.Item key="1" onClick={() => navigate("/")}>
            Home
          </Menu.Item>
          <Menu.SubMenu
            key="2"
            title="Collection"
            onTitleClick={() => navigate("/collections")}
          >
            <Menu.Item key="2-1">
              <a href="#">Nhẫn</a>
            </Menu.Item>
            <Menu.Item key="2-2">
              <a href="#">Dây Chuyền</a>
            </Menu.Item>
            <Menu.Item key="2-3">
              <a href="#">Khuyên Tai</a>
            </Menu.Item>
            <Menu.Item key="2-4">
              <a href="#">Vòng Tay</a>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu
            key="3"
            title="Booking"
            onTitleClick={() => navigate("/booking")}
          >
            <Menu.Item key="3-1">
              <a href="#">Gia Công Trang Sức</a>
            </Menu.Item>
            <Menu.Item key="3-2">
              <a href="#">Khắc Chữ</a>
            </Menu.Item>
            <Menu.Item key="3-3">
              <a href="#">Bảo Trì Và Làm Mới</a>
            </Menu.Item>
            <Menu.Item key="3-4">
              <a href="#">Kiểm Định Tuổi Vàng</a>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="4" title="Chính Sách Và Hướng Dẫn">
            <Menu.Item key="4-1">
              <a href="#">Chính Sách Đặt Hàng</a>
            </Menu.Item>
            <Menu.Item key="4-2">
              <a href="#">Chính Sách Thanh Toán</a>
            </Menu.Item>
            <Menu.Item key="4-3">
              <a href="#">Chính Sách Giao Hàng, Kiểm Hàng</a>
            </Menu.Item>
            <Menu.Item key="4-4">
              <a href="#">Chính Sách Bảo Mật</a>
            </Menu.Item>
            <Menu.Item key="4-5">
              <a href="#">Hướng Dẫn Đặt Hàng</a>
            </Menu.Item>
            <Menu.Item key="4-6">
              <a href="#">Hướng Dẫn Đo Size</a>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="5">
            <a href="#">Blog</a>
          </Menu.Item>
        </Menu>

        <div className="navbar-actions">
          <Input
            className="search-input"
            placeholder="Search"
            prefix={<SearchOutlined />}
          />

          {user ? (
            <Row xs={3} className="Header-login">
              <Col>
                <Button type="text" icon={<ShoppingCartOutlined />} />
              </Col>

              <Col>
                <Dropdown overlay={Menu1} trigger={["hover"]}>
                  <Button type="text" icon={<UserOutlined />} />
                </Dropdown>
              </Col>
            </Row>
          ) : (
            <Row xs={3} className="Header-login">
              <Link to={"/login"}>
                <Button text={"Đăng nhập"}>Sign in</Button>
              </Link>
              <Link to={"/register"}>
                <Button text={"Đăng ký"}>Sign up</Button>
              </Link>
            </Row>
          )}

          {/* {user ? (
            <Row xs={3} className="Header-login">
              <Link to={"/login"}>
                <Button text={"Đăng nhập"}>Sign in</Button>
              </Link>
              <Link to={"/register"}>
                <Button text={"Đăng ký"}>Sign up</Button>
              </Link>
            </Row>
          ) : (
            <Row xs={3} className="Header-login">
              <Col>
                <Button type="text" icon={<ShoppingCartOutlined />} />
              </Col>
              <Col>
                <Dropdown overlay={Menu1} trigger={["hover"]}>
                  <Button type="text" icon={<UserOutlined />} />
                </Dropdown>
              </Col>
            </Row>
          )} */}
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
