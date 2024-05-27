import React, { useState } from 'react';
const Brands = () => {

        const [brandName, setBrandName] = useState('');

        const handleSubmit = (event) => {
            event.preventDefault();

            // Gửi dữ liệu đến backend
            fetch('http://localhost/doan2/phpbackend/adminphp/add_brands.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: brandName,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    
                })
                .catch(error => {

                });
        };
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="brandName">Tên thương hiệu:</label>
                    <input
                        type="text"
                        id="brandName"
                        value={brandName}
                        onChange={(event) => setBrandName(event.target.value)}
                    />
                </div>
                <button type="submit">Thêm thương hiệu</button>
            </form>
        );
    };

    export default Brands;