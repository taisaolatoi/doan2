import './editprofile.css';
import { Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
const Editprofile = () => {
    return (
        <div className="page_edit_profile">
            <div className="container">
                <Row>
                    <Col span={4}></Col>
                    <Col span={12}>
                        <div className="form_info_profile">
                            <div style={{ marginBottom: '10px' }} className="text_center">
                                <h1 className='title_head'>Trang thông tin tài khoản</h1>
                            </div>
                            <div className="btn_info">
                                <NavLink to="">
                                    <p>Quay lại</p>
                                </NavLink>
                            </div>
                        </div>
                        <form action="">
                            aa
                        </form>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>


        </div>
    );
}
export default Editprofile;