import React from 'react';
import { NavLink } from 'react-router-dom';
import navbar from './navbar.css'
import { CaretDownOutlined } from '@ant-design/icons';
import Subnav from './subnav';


const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">TRANH CHỦ</NavLink>
        </li>
        <li>
          <NavLink to="/">SẢN PHẨM
            <CaretDownOutlined />
            <Subnav/>
            </NavLink>
        </li>
        <li>
          <NavLink to="/">SALE OFF</NavLink>
        </li>
        <li>
          <NavLink to="/test">TIN TỨC</NavLink>
        </li>
        <li>
          <NavLink to="/">CHÍNH SÁCH NHƯỢNG QUYỀN</NavLink>
        </li>
        <li>
          <NavLink to="/news">HƯỚNG DẪN
            <CaretDownOutlined />
          </NavLink>
        </li>
        <li>
          <NavLink to="/news">GIỚI THIỆU</NavLink>
        </li>
        <li>
          <NavLink to="/news">LIÊN HỆ</NavLink>
        </li>
        {/* Các mục khác */}
      </ul>
    </nav>
  );
};

export default Navbar;