import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, InputNumber, Button, message, Select } from 'antd';
import { useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateProductForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [hinhanh, setHinhanh] = useState(null);
  const [loaiOptions, setLoaiOptions] = useState([]);
  const [thuongHieuOptions, setThuongHieuOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0); // Khởi tạo số lượng ban đầu là 0
  const [size, setSize] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  console.log(quantity);

  useEffect(() => {
    axios.get(`http://localhost/doan2/phpbackend/adminphp/get_size.php?idsanpham=${id}`)
      .then(response => setSizeOptions(response.data))
      .catch(error => message.error('Không thể lấy dữ liệu kích thước.'));

    axios.get('http://localhost/doan2/phpbackend/adminphp/get_loai.php')
      .then(response => setLoaiOptions(response.data))
      .catch(error => message.error('Không thể lấy dữ liệu loại sản phẩm.'));

    axios.get('http://localhost/doan2/phpbackend/adminphp/get_thuonghieu.php')
      .then(response => setThuongHieuOptions(response.data))
      .catch(error => message.error('Không thể lấy dữ liệu thương hiệu.'));

    axios.get(`http://localhost/doan2/phpbackend/adminphp/get_product_byid.php?idsanpham=${id}`)
      .then(response => {
        setProduct(response.data);
        form.setFieldsValue(response.data);
      })
      .catch(error => message.error('Không thể lấy dữ liệu sản phẩm.'));
  }, [id, form]);

  const handleSizeChange = (value) => {
    axios.get(`http://localhost/doan2/phpbackend/adminphp/get_size_quantity.php?size=${value}&idsanpham=${id}`)
      .then(response => {
        setQuantity(response.data.soluong); // Cập nhật giá trị số lượng
        setSelectedSize(value);
      })
      .catch(error => {
        console.error(error);
        message.error('Có lỗi xảy ra khi lấy số lượng kích thước.');
      });
  };

  useEffect(() => {
    handleSizeChange(size); // Chạy lại hàm handleSizeChange khi giá trị của size thay đổi
  }, [size]);



  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('id', id);
      form.validateFields(['soluong']);
      formData.append('tensanpham', values.tensanpham);
      formData.append('giasanpham', values.giasanpham);
      formData.append('mota', values.mota);
      if (hinhanh) {
        formData.append('hinhanh', hinhanh);
      } else {
        formData.append('hinhanh', null); // Gửi hình ảnh là null khi không có hình ảnh được cập nhật
      }
      formData.append('id_loai', values.idloai);
      formData.append('id_thuonghieu', values.idthuonghieu);
      formData.append('soluong', quantity); // Sử dụng giá trị quantity từ state
      formData.append('id_size', selectedSize);

      const response = await axios.post(
        'http://localhost/doan2/phpbackend/adminphp/update_sanpham.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      message.success(response.data.message);
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra khi cập nhật sản phẩm.');
    }
  };

  const handleFileChange = (e) => {
    setHinhanh(e.target.files[0]);
  };

  return (
    <div className="productForm">
      <h1>Cập nhật sản phẩm</h1>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Tên sản phẩm"
          name="tensanpham"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá sản phẩm"
          name="giasanpham"
          rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="mota"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="idloai"
          label="Loại sản phẩm"
          rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm!' }]}
        >
          <Select placeholder="Chọn loại sản phẩm">
            {loaiOptions.map((loai) => (
              <Option key={loai.idloai} value={loai.idloai}>
                {loai.tenloai}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="idthuonghieu"
          label="Thương hiệu"
          rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
        >
          <Select placeholder="Chọn thương hiệu">
            {thuongHieuOptions.map((thuonghieu) => (
              <Option key={thuonghieu.idthuonghieu} value={thuonghieu.idthuonghieu}>
                {thuonghieu.tenthuonghieu}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          // name="idsize"
          label="Kích thước"
          rules={[{ required: true, message: 'Vui lòng chọn kích thước!' }]}
        >
          <Select placeholder="Chọn kích thước" onChange={handleSizeChange}>
            {sizeOptions.map((size) => (
              <Option key={size.id} value={size.idsize}>
                {size.namesize}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Số lượng"
          // name="soluong"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
        >
          <InputNumber min={0} value={quantity} onChange={(value) => setQuantity(value)} />
        </Form.Item>

        <img style={{width: '100px' , marginLeft: '30%'}} src={product.url_hinhanh} alt="" />

        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleFileChange} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProductForm;