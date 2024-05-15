import { Col, Row } from 'antd';
import './ProductPage.css';
import { RightOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import ProductDetail from '../../../component/product_detail/productdetail';

const ProductPage = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [firstItem, setFirstItem] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost/reactt/phpbackend/getproduct.php?id=${id}`)
      .then(response => {
        setData(response.data);
        setFirstItem(response.data[0]);

      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="bread-crumb">
        <div className="container-bread-crumb">
          <ul className="breadcrumb">
            <li>
              <NavLink to="/" style={{ textDecoration: 'none' }}>
                <p>Trang chủ</p>
              </NavLink>
            </li>
            <RightOutlined />
            <li>
              <p>{firstItem.tenloai}</p>
            </li>
            <RightOutlined />
            <li>
              <p>{firstItem.tenctloai}</p>
            </li>  
          </ul>
        </div>
      </div>

      <Row className="bodywrap">
        <Col span={6}>
          <aside className="sidebar-product">
            <div className="section-box">
              <div className="filter-content"></div>
            </div>
          </aside>
        </Col>

        <Col className="category-wrap" span={17}>
          <div className="section-box-bg">
            <div className="title-page">
              <h2>{firstItem.tenctloai}</h2>
              <div id="sort-by">
                <label className="left">
                  <img src="https://cdn.shopvnb.com/themes/images/sort.png" alt="" />
                  Sắp Xếp:
                </label>
                <ul id="sortby">
                  <li>
                    <span>Mặc định</span>
                    <ul>
                      <li>Giá tăng dần</li>
                      <li>Giá giảm dần</li>
                      <li>Hàng mới nhất</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="product-view">
            <Row>
            {data && Array.isArray(data) && data.length > 0 ? (
                data.map((itemData, index) => {
                    //chuyển gia tu string sang float
                  const formattedPrice = parseFloat(itemData.giasanpham);
                  return (
                    <Col style={{ paddingLeft: '10px', paddingRight: '10px' }} span={6} key={index}>
                      <div className="product-thumbail">
                        <NavLink to="" className="img-thumb">
                          <img style={{ width: '200px', height: '210px' }} src={itemData.hinhanh} alt="" />
                        </NavLink>
                      </div>
                      <div className="product_info">
                        <h3 className="product_name">
                       <NavLink to={`/product_detail/${itemData.idsanpham}`}>{itemData.tensanpham}</NavLink>
                        </h3>
                        
                        <div className="price_box">
                            {/* chuyển đổi giá sang số thập phân */}
                          <span className="price">{formattedPrice.toLocaleString()}đ</span>
                          
                        </div>
                      </div>
                    </Col>
                  );
                })
              ) : (
                <p>Không có sản phẩm</p>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;