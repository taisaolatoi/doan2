import React from "react";
import { Button,Input } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import { useState } from "react";

const ButtonInputSearch =(props) => {
    const {size, placeholder, textbutton } = props
    const [inputValue, setInputValue] = useState('');
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        window.location.href = `/search?query=${encodeURIComponent(inputValue)}`;
    };
    return (
        <div style={{ display: 'flex' }}>
            <Input 
            size={size}
            placeholder={placeholder}
            variant="borderless" 
            name="search_name"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{borderRadius: '0', backgroundColor : '#f3f3f3'}}/>
            
            <NavLink to={`/search?query=${encodeURIComponent(inputValue)}`}>
            <Button
            name="search_btn"
            className="cus-btn"
            style={{borderRadius: '0' ,
            borderColor: '#e95221',
            border: 'none',backgroundColor: '#ccc',
        }}
            size={size} 
            onClick={handleSearch}
            icon={<SearchOutlined />}>{textbutton}</Button>
            </NavLink>
        </div>
    )
}
export default ButtonInputSearch;