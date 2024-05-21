import React from 'react';
import { Col, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Search from 'antd/es/transfer/search.js';
import logo from '../../assest/img/logo.svg';
import '../header/header.css';
import { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { UserOutlined, ShoppingCartOutlined, FileSearchOutlined } from '@ant-design/icons'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { NavLink } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons'
import { UserAddOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react';
import { LogoutOutlined } from '@ant-design/icons'





const HeaderComponent = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const client = localStorage.getItem('client');
    if (client) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('client');
    setIsLoggedIn(false);
  };
  return (
    <div>
      <div className="Header">
        <img style={{ width: '60px', height: '60px' }} src={logo} alt="" />

        <Col className='Search' span={14}>
          <ButtonInputSearch
            size='large'
            placeholder='Nhập tên sản phẩm...'
            textbutton='Tìm kiếm'
          />

        </Col>
        <Col className='UserD' span={5}>
          <div className="btn-user">
            {isLoggedIn ? (
              <div>
                <Button className='btn-dropdown'>
                  <span className='Circle'>
                    <UserOutlined />
                  </span>
                  <span>TÀI KHOẢN</span>
                </Button>
                <div className="dropdown-user">
                  <li>
                    <p className='csslogin'>
                      <NavLink to="/profile">
                        <span>
                          <UserOutlined />
                          Thông tin cá nhân
                        </span>
                      </NavLink>
                    </p>
                  </li>
                  <li>
                    <p className='cssregis' onClick={handleLogout}>
                      <span>
                        <LogoutOutlined />
                        Đăng xuất
                      </span>
                    </p>
                  </li>
                </div>
              </div>
            ) : (
              <div>
                <Button className='btn-dropdown'>
                  <span className='Circle'>
                    <UserOutlined />
                  </span>
                  <span>TÀI KHOẢN</span>
                </Button>
                <div className="dropdown-user">
                  <li>
                    <p className='csslogin'>
                      <NavLink to="/login">
                        <span>
                          <UserOutlined />
                          Đăng nhập
                        </span>
                      </NavLink>
                    </p>
                  </li>
                  <li>
                    <p className='cssregis'>
                      <NavLink to="/register">
                        <span>
                          <UserOutlined />
                          Đăng ký
                        </span>
                      </NavLink>
                    </p>
                  </li>
                </div>
              </div>
            )}
          </div>

          <div className="btn-search">
            <Button className='btn-dropdown'>
              <span className='Circle'>
                <FileSearchOutlined />
              </span>
              <span>TRA CỨU</span>
            </Button>
          </div>

          <div className="btn-cart">
            <Button className='btn-dropdown'>
              <span className='Circle'>
                <ShoppingCartOutlined />
              </span>
              <NavLink to="/cart">
                <span>GIỎ HÀNG</span>
              </NavLink>
            </Button>
          </div>
        </Col>
      </div>
    </div>
  );
};
export default HeaderComponent;