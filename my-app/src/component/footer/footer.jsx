import './footer.css';
import { Col, Row } from 'antd';
import { FacebookOutlined } from '@ant-design/icons'
import {YoutubeOutlined} from '@ant-design/icons'
const Footer = () => {
    return (
        <div className="footer">
            <div className="mid-footer">
                <div className="container-mid-footer">
                    <Row style={{ marginLeft: '-10px', marginRight: '-10px' }}>
                        <Col span={6} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                            <h4 className="title-menu">
                                THÔNG TIN CHUNG
                            </h4>
                            <div className="des_footer">
                                <p>
                                    <span>VNB Sports: </span>
                                    là hệ thống cửa hàng cầu lông với hơn 50 chi nhánh trên toàn quốc, cung cấp
                                    sỉ và lẻ các mặt hàng dụng cụ cầu lông từ phong trào tới chuyên nghiệp
                                </p>
                                <p>
                                    <br />
                                    <span>Với sứ mệnh: </span>
                                    "VNB cam kết mang đến những sản phẩm, dịch vụ chất lượng tốt nhất phục vụ cho người chơi thể thao để nâng cao sức khỏe của chính mình"
                                </p>
                                <p>
                                    <br />
                                    <span>Tầm nhìn: </span>
                                    "Trở thành nhà phân phối và sản xuất thể thao lớn nhất Việt Nam"
                                </p>
                            </div>
                        </Col>
                        <Col span={6} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                            <h4 className="title-menu">
                                THÔNG TIN LIÊN HỆ
                            </h4>
                            <div className="des_footer">
                                <p>
                                    Hotline:
                                    <span> 0347291939 | 0583042981</span>
                                </p>
                                <br />
                                <p>
                                    Email:
                                    <span> vpdat2100513@student.ctuet.edu.vn</span>
                                </p>
                            </div>
                            <div className="social-footer" style={{marginTop: '15px'}}>
                                <a href="">
                                    <FacebookOutlined />
                                </a>
                                <a href="">
                                    <YoutubeOutlined />
                                </a>
                            </div>
                        </Col>
                        <Col span={6} style={{ paddingLeft: '10px', paddingRight: '10px' }}>

                        </Col>
                        <Col span={6} style={{ paddingLeft: '10px', paddingRight: '10px' }}>

                        </Col>
                    </Row>
                </div>
            </div>

            <div className="bot-footer" style={{backgroundColor: '#e95221'}}>
                <div className="container-bottom-footer" style={{display: 'flex' , justifyContent: 'center', padding: '20px 0'}}>
                    <div className="row-tablet" style={{display: 'flex', flexDirection: 'column' , alignItems: 'center',lineHeight: '1.3',color: '#fff'}}>
                        <p>© CÔNG TY TNHH VNB SPORTS</p>
                        <p>GPKD số 0314496879 do Sở KH và ĐT TP Hồ Chí Minh cấp ngày 05/07/2017</p>
                        <p>GĐ/Sở hữu website: Phan Lê Chi</p>
                        <img src="https://cdn.shopvnb.com/themes/images/bct.webp" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;