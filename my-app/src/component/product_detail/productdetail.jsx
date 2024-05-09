import { NavLink } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { Col, Row } from 'antd'
import { useParams } from 'react-router-dom'
import './productdetail.css'
import { useEffect, useState } from "react";
import axios from "axios";
import ProductInfo from './productinfo'
const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
  
    useEffect(() => {
      axios.get(`http://localhost/reactt/phpbackend/getoneproduct.php?id=${id}`)
        .then(res => {
            console.log(res);
          setProduct(res.data[0]);
        })
        .catch(error => {
          console.log(error);
        });
    }, [id]); 
  
    return (
      <>
        {product && <ProductInfo product={product} />}
      </>
    );
  }
  
  export default ProductDetail;