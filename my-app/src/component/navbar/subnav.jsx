import React from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';



const Subnav = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/doan2/phpbackend/getctloai.php')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="subnav-hide">
      <div className="subnav-product" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data && data.length > 0 ? (
          <React.Fragment>
            {data.map((itemData, index) => (
              <div className="product-container" key={index}>
                <p style={{ textTransform: 'uppercase' }} className="product-name">{itemData.tenloai}</p>
                {itemData.ctloai && JSON.parse(itemData.ctloai).map((item) => (
                  <NavLink to={`/products/${item.idctloai}`} key={item.idsanpham}>
                    <p className="productsub-name">{item.tenctloai}</p>
                  </NavLink>
                ))}
              </div>
            ))}
          </React.Fragment>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );

}
export default Subnav;
