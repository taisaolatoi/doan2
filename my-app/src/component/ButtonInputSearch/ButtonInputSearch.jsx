import React from "react";
import { Button,Input } from 'antd';
import {SearchOutlined} from '@ant-design/icons';

const ButtonInputSearch =(props) => {
    const {size, placeholder, textbutton } = props
    return (
        <div style={{ display: 'flex' }}>
            <Input 
            size={size}
            placeholder={placeholder}
            variant="borderless" 
            style={{borderRadius: '0', backgroundColor : '#f3f3f3'}}/>

            <Button
            className="cus-btn"
            style={{borderRadius: '0' ,
            borderColor: '#e95221',
            border: 'none',backgroundColor: '#ccc',
     
        }}
            size={size} icon={<SearchOutlined />}>{textbutton}</Button>
        </div>
    )
}
export default ButtonInputSearch;