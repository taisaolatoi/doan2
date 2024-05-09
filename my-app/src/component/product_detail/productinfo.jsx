import { NavLink } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { Col, Row } from 'antd'
const ProductInfo = ({ product }) => {
    const formattedPrice = parseFloat(product.giasanpham);
    const formattedOldPrice = parseFloat(product.giacu);
    const isAvailable = product.soluong > 0;
    return (
        <>
            <div className="bread-crumb">
                <div className="container-bread-crumb">
                    <ul className="breadcrumb">
                        <li><NavLink to="/" style={{ textDecoration: 'none' }}>
                            <p>Trang chủ</p>
                        </NavLink></li>

                        <RightOutlined />

                        <li><p>{product.tenloai}</p></li>

                        <RightOutlined />

                        <li style={{textTransform: 'capitalize'}}><p>{product.tenctloai}</p></li>

                        <RightOutlined />

                        <li><p>{product.tensanpham}</p></li>
                    </ul>
                </div>
            </div>
            <div style={{ padding: '0 45px' }} className="container">
                <Row>
                    <Col span={8}>
                        <div className="product_img_detail">
                            <img src={product.hinhanh} alt="" />
                        </div>
                    </Col>

                    <Col span={10}>
                        <div className="detail_desc">
                            <h1 className="title_product">
                                {product.tensanpham}
                            </h1>
                            <div className="product_top_clearfix">
                                <span>
                                    Mã:
                                    <span style={{ color: '#E95221', fontWeight: '500' }}> VNB{product.idsanpham} </span>
                                </span>
                            </div>

                            <div className="inventory_quantity">
                                <div className="mb-break">
                                    Thương hiệu:
                                    <span style={{ color: '#E95221' }}> {product.tenthuonghieu}</span>
                                </div>
                                <span class="line">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                <div className="mb-break">
                                    Tình trạng:
                                    <span style={{ color: '#E95221' }}>{isAvailable ? ' Còn hàng' : ' Hết hàng'}</span>
                                </div>
                            </div>


                            <form action="" method="post">
                                <div className="pricebox_clearfix">
                                    <div className="special_price">
                                        <span>{formattedPrice.toLocaleString()}₫</span>
                                    </div>
                                    <div className="old_price">
                                        Giá niêm yết:&nbsp;
                                        <del>{formattedOldPrice.toLocaleString()}₫</del>
                                        
                                    </div>
                                </div>

                                <fieldset className="product_discount">

                                    <legend>
                                        <img src="https://cdn.shopvnb.com/themes/images/code_dis.gif" alt="" />
                                        ƯU ĐÃI
                                    </legend>

                                    <div className="product_promotion_list">
                                        <p>✔ Tặng 1 đôi vớ cầu lông VNB &#40; vớ <span>VNB nhiều màu </span> hoặc vớ <span> VNB ngắn &#41;</span></p>
                                        <p>✔ Tặng 1 đôi vớ cầu lông VNB &#40; vớ <span>VNB nhiều màu </span> hoặc vớ <span> VNB ngắn &#41;</span></p>
                                        <p>✔ Tặng 1 đôi vớ cầu lông VNB &#40; vớ <span>VNB nhiều màu </span> hoặc vớ <span> VNB ngắn &#41;</span></p>
                                        <p>✔ Tặng 1 đôi vớ cầu lông VNB &#40; vớ <span>VNB nhiều màu </span> hoặc vớ <span> VNB ngắn &#41;</span></p>
                                    </div>
                                </fieldset>
                            </form>
                            <div className="select_size">
                                <div className="size_clearfix">
                                    <p>Chọn size:</p>
                                </div>
                            </div>
                            <div className="boz_form">
                                <div className="form_group">
                                    <div className="flex_quantity"></div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default ProductInfo;