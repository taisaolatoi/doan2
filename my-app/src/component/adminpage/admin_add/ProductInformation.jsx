import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import './productinformation.css';
import { useNavigate,NavLink } from 'react-router-dom';
import { message } from 'antd';

const ProductInformation = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost/doan2/phpbackend/adminphp/product_information.php');
      const responseData = response.data;
      setData(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const productId = data[index].id_sanpham;
      await axios.delete('http://localhost/doan2/phpbackend/adminphp/delete_product.php', {
        data: { id_sanpham: productId },
      });
      fetchData();
      message.success('Product deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('An error occurred while deleting the product');
    }
  };

  const handleEdit = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Mô tả</th>
          <th>Giá</th>
          <th>edit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product, index) => (
          <tr key={index}>
            <td>
              <div className="product-item">
                <div className="image-container">
                  <img src={product.url_hinhanh} alt="" className="product-image" />
                </div>
                <div className="product-details">
                  <p className="product-name">{product.tensanpham}</p>
                </div>
              </div>
            </td>
            <td>{product.mota}</td>
            <td>{product.giasanpham}</td>
            <td>
              <div className="actions">
                <NavLink to={`/admin/update-product/${product.idsanpham}`}><EditOutlined className="edit-icon" onClick={() => handleEdit(product.id_sanpham)} /></NavLink>
                <DeleteOutlined className="delete-icon" onClick={() => handleDelete(index)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductInformation;
