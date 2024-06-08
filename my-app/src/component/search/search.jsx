import { useLocation } from "react-router-dom";
import { RightOutlined } from '@ant-design/icons'
import { NavLink } from "react-router-dom";
import { Row, Col } from 'antd'
import { useEffect, useState } from "react";
import axios from "axios";



const Search = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    const [data, setData] = useState();


    useEffect(() => {
        axios.get(`http://localhost/doan2/phpbackend/getsearch.php?search=${query}`)
            .then(res => {
                setData(res.data)
                window.scrollTo(0, 0);
            })
            .catch(error => {
                console.log(error);
            });
    }, [query]);

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
                        <li style={{ color: '#e95221' }}>
                            <p>Tìm kiếm sản phẩm [{query}]</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container">
                <h1>Tìm kiếm sản phẩm [{query}]</h1>
                <div className="product-view">
                    <Row>
                        {data && data.length > 0 ? (
                            data.map((item, index) => {
                                const formattedPrice = parseFloat(item.giasanpham);

                                return (
                                    <Col key={index} style={{ paddingLeft: '10px', paddingRight: '10px', maxWidth: '20%' }} span={6} >
                                        <div className="product-thumbail">
                                            <NavLink to="" className="img-thumb">
                                                <img style={{ width: '200px', height: '210px' }} src={item.url_hinhanh} alt="" />
                                            </NavLink>
                                        </div>
                                        <div className="product_info">
                                            <h3 className="product_name">
                                                <NavLink to={`/product_detail/${item.idsanpham}`}>{item.tensanpham}</NavLink>
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
            </div>
        </>
    )
}
export default Search;