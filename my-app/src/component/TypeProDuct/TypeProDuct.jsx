import SectionNewProduct from "../SectionNewProduct/SectionNewProduct";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import './TypeProDuct.css'

const TypeProDuct = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/reactt/phpbackend/gettenloai.php')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (
        <div className="container-main-type" style={{padding: '0 45px', maxWidth: '1350px', margin: '0 auto'}}>
            <SectionNewProduct textbaner='Sản Phẩm Cầu Lông' />
            <Row style={{marginLeft: '-10px', marginRight: '-10px'}}>
                {data.map(item => (
                    <Col span={6} style={{padding: '10px'}}>
                        <div className="snip-banner">
                            <img style={{ width: '300px', height: '300px' }} src={item.hinhanh}  />
                            <div className="content-snip-banner"><p>{item.tenloai}</p></div>
                            <a href=""></a>
                        </div>
                    </Col>
            ))}
            </Row>
        </div>
    )
}
export default TypeProDuct;