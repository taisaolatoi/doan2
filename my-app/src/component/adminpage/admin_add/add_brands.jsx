import React, { useState, useEffect } from 'react';
import { Input, Button, Form, List } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './brand.css';

const Brands = () => {
  const [form] = Form.useForm();
  const [brandName, setBrandName] = useState('');
  const [brands, setBrands] = useState([]);
  const [editBrandId, setEditBrandId] = useState(null);
  const [editBrandName, setEditBrandName] = useState('');

  useEffect(() => {
    fetch('http://localhost/doan2/phpbackend/adminphp/get_thuonghieu.php')
      .then(response => response.json())
      .then(data => setBrands(data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = () => {
    if (editBrandId !== null) {
      // Nếu editBrandId đã được thiết lập, thực hiện cập nhật
      handleUpdate();
    } else {
      // Ngược lại, thêm mới thương hiệu
      fetch('http://localhost/doan2/phpbackend/adminphp/add_brands.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: brandName }),
      })
        .then(response => response.json())
        .then(data => {
          setBrands([...brands, { idthuonghieu: data.idthuonghieu, tenthuonghieu: brandName }]);
          setBrandName('');
          form.resetFields();
        })
        .catch(error => console.error(error));
    }
  };

  const handleEdit = (id, name) => {
    setEditBrandId(id);
    setEditBrandName(name);
  };

  const handleUpdate = () => {
    fetch(`http://localhost/doan2/phpbackend/adminphp/update_brand.php?id=${editBrandId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: editBrandName }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setBrands(brands.map(brand => (brand.idthuonghieu === editBrandId ? { ...brand, tenthuonghieu: editBrandName } : brand)));
          setEditBrandId(null);
          setEditBrandName('');
        } else {
          console.error('Cập nhật thất bại:', data.message);
        }
      })
      .catch(error => console.error(error));
  };
  
 // Đoạn mã này giả định rằng bạn sử dụng React hoặc một thư viện quản lý trạng thái tương tự

// Hàm xóa thương hiệu
const handleDelete = (id) => {
    // Thực hiện yêu cầu xóa thương hiệu
    fetch(`http://localhost/doan2/phpbackend/adminphp/delete_brand.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Gửi id trong body của yêu cầu
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Nếu xóa thành công, cập nhật danh sách thương hiệu
          setBrands(brands.filter(brand => brand.idthuonghieu !== id));
        } else {
          // Nếu xóa không thành công, kiểm tra thông báo và hiển thị
          if (data.message === 'Không thể xóa thương hiệu vì có sản phẩm liên kết') {
            alert(data.message);
          } else {
            console.error('Xóa thất bại:', data.message);
          }
        }
      })
      .catch(error => console.error(error));
  };
  

  return (
    <div className="brands-container">
      <h2>Danh sách thương hiệu</h2>
      <List
        itemLayout="horizontal"
        dataSource={brands}
        renderItem={brand => (
          <List.Item>
            {editBrandId === brand.idthuonghieu ? (
              <Form
                form={form}
                onFinish={handleUpdate}
                layout="inline"
              >
                <Form.Item name="name">
                  <Input defaultValue={editBrandName} onChange={(e) => setEditBrandName(e.target.value)} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Cập nhật</Button>
                  <Button onClick={() => setEditBrandId(null)}>Hủy</Button>
                </Form.Item>
              </Form>
            ) : (
              <>
                <span>{brand.tenthuonghieu}</span>
                <div>
                  <Button onClick={() => handleEdit(brand.idthuonghieu, brand.tenthuonghieu)} icon={<EditOutlined />} />
                  <Button onClick={() => handleDelete(brand.idthuonghieu)} icon={<DeleteOutlined />} />
                </div>
              </>
            )}
          </List.Item>
                )}
                />
          
                <Form form={form} onFinish={handleSubmit} layout="inline">
                  <Form.Item name="brandName">
                    <Input placeholder="Tên thương hiệu" value={brandName} onChange={(event) => setBrandName(event.target.value)} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Thêm thương hiệu</Button>
                  </Form.Item>
                </Form>
              </div>
            );
          };
          
          export default Brands;
