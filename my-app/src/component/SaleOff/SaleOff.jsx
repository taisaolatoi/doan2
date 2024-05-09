import SectionNewProduct from "../SectionNewProduct/SectionNewProduct"
import { Col, Row } from 'antd';


const SaleOff = () => {
    return (
        <div className="container-banner-3" style={{paddingRight: '45px', paddingLeft: '45px',maxWidth: '1350px',minWidth: '1200px', margin: '0 auto'}}>
            <SectionNewProduct textbaner='Sale Off' />
            <Row style={{marginRight: "-10px", marginLeft: '-10px'}}>
                <Col span={8}>
                    <div className="three-banner">
                        <a href="">
                            <img style={{ width: '410px', height: '150px' }} src="https://cdn.shopvnb.com/uploads/danh_muc/3_2.webp" alt="" />
                        </a>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="three-banner">
                        <a href="">
                            <img style={{ width: '410px', height: '150px' }} src="https://cdn.shopvnb.com/uploads/danh_muc/2.webp" alt="" />
                        </a>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="three-banner">
                        <a href="">
                            <img style={{ width: '410px', height: '150px' }} src="https://cdn.shopvnb.com/uploads/danh_muc/1_3.webp" alt="" />
                        </a>
                    </div>
                </Col>

            </Row>
        </div>

    )
}
export default SaleOff;