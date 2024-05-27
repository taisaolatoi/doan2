import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, InputNumber, Button, message, Select } from 'antd';
import './ProductForm.css';

const { Option } = Select;

const AddProductForm = () => {
    const [form] = Form.useForm();
    const [hinhanh, setHinhanh] = useState(null);
    const [loaiOptions, setLoaiOptions] = useState([]);
    const [ctloaiOptions, setctLoaiOptions] = useState([]);
    const [thuongHieuOptions, setThuongHieuOptions] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [tensanpham, setTensanpham] = useState('');
    const [giasanpham, setGiasanpham] = useState(null);
    const [mota, setMota] = useState('');
    const [soluong, setSoluong] = useState(null);
    

    useEffect(() => {
        axios.get('http://localhost/doan2/phpbackend/adminphp/get_size.php')
            .then((response) => {
                setSizeOptions(response.data);
            })
            .catch((error) => {
                console.error(error);
                message.error('Không thể lấy dữ liệu kích thước.');
            });

        // Lấy dữ liệu loại từ API
        axios.get('http://localhost/doan2/phpbackend/adminphp/get_loai.php')
            .then((response) => {
                setLoaiOptions(response.data);
            })
            .catch((error) => {
                console.error(error);
                message.error('Không thể lấy dữ liệu loại sản phẩm.');
            });

        axios.get('http://localhost/doan2/phpbackend/adminphp/get_ctloai.php')
            .then((response) => {
                setctLoaiOptions(response.data);
            })
            .catch((error) => {
                console.error(error);
                message.error('Không thể lấy dữ liệu loại sản phẩm.');
            });

        // Lấy dữ liệu thương hiệu từ API
        axios.get('http://localhost/doan2/phpbackend/adminphp/get_thuonghieu.php')
            .then((response) => {
                setThuongHieuOptions(response.data);
            })
            .catch((error) => {
                console.error(error);
                message.error('Không thể lấy dữ liệu thương hiệu.');
            });
    }, []);


    const handleSubmit = async (values) => {
        try {
            const getTenLoaiById = (id) => {
                const loai = loaiOptions.find((item) => item.idloai === id);
                return loai ? loai.tenloai : '';
            };

            const getTenThuongHieuById = (id) => {
                const thuonghieu = thuongHieuOptions.find(
                    (item) => item.idthuonghieu === id
                );
                return thuonghieu ? thuonghieu.tenthuonghieu : '';
            };

            const formData = new FormData();
            formData.append('tensanpham', values.tensanpham);
            formData.append('giasanpham', values.giasanpham);
            formData.append('mota', values.mota);
            formData.append('hinhanh', hinhanh);
            formData.append('id_loai', values.idloai);
            formData.append('id_thuonghieu', values.idthuonghieu);
            formData.append('ten_loai', getTenLoaiById(values.idloai));
            formData.append('ten_thuonghieu', getTenThuongHieuById(values.idthuonghieu));
            formData.append('soluong', values.soluong);
            formData.append('id_size', values.id);


            const response = await axios.post(
                'http://localhost/doan2/phpbackend/adminphp/addfull_products.php',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            message.success(response.data.message);
            form.resetFields();
            setHinhanh(null);
        } catch (error) {
            console.error(error);
            message.error('Có lỗi xảy ra khi thêm sản phẩm.');
        }
    };

    const handleFileChange = (e) => {
        setHinhanh(e.target.files[0]);
    };

    return (
        <div className="productForm">
            <h1>Thêm sản phẩm</h1>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    label="Tên sản phẩm"
                    name="tensanpham"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                >
                    <Input value={tensanpham} onChange={(e) => setTensanpham(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Giá sản phẩm"
                    name="giasanpham"
                    rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                >
                    <InputNumber min={0} value={giasanpham} onChange={(value) => setGiasanpham(value)} />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="mota"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
                >
                    <Input.TextArea value={mota} onChange={(e) => setMota(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="idloai"
                    label="Loại sản phẩm"
                    rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
                >
                    <Select>
                        {loaiOptions.map((loai, index) => (
                            <Option key={index} value={loai.idloai}>
                                {loai.tenloai}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="idthuonghieu"
                    label="Thương hiệu"
                    rules={[
                        { required: true, message: 'Vui lòng chọn thương hiệu' },
                    ]}
                >
                    <Select>
                        {thuongHieuOptions.map((thuonghieu, index) => (
                            <Option
                                key={index}
                                value={thuonghieu.idthuonghieu}
                            >
                                {thuonghieu.tenthuonghieu}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Kích thước"
                    name="id"
                    rules={[{ required: true, message: 'Vui lòng chọn kích thước!' }]}
                >
                    <Select>
                        {sizeOptions && sizeOptions !== null && sizeOptions.map((size, index) => (
                            <Option key={index} value={size.id}>
                                {size.namesize}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="soluong"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm!' }]}
                >
                    <InputNumber min={0} value={soluong} onChange={(value) => setSoluong(value)} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleFileChange} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddProductForm;