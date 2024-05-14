import './editprofile.css';
import Formupdate from '../formupdate/formupdate';
import Formchangepass from '../changepass/formchangepass';
import { Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Editprofile = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const client = localStorage.getItem('client');
        if (!client) {
            navigate('/login');
        }
    }, []);

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
                                <NavLink to="/profile">
                                    <p>Quay lại</p>
                                </NavLink>
                            </div>
                        </div>
                        <div className="login-regist-form">
                            <Formupdate/>
                            <Formchangepass/>
                        </div>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>


        </div>
    );
}
export default Editprofile;