import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slice/counterSlice';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import Header from './component/header/header';
import Testcomponent from './Test/Test';
import Footer from './component/footer/footer'
import HomePage from './component/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import Navbar from './component/navbar/navbar';
import Admin from './component/adminpage/register';
import Login from  './component/adminpage/login';
import ProductDetail from './component/product_detail/productdetail'
import Profile from './component/profile/profile'
function App() {
  return (
    <div className="FileMain">

      <BrowserRouter>
        <Header/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<div>
            <HomePage/>
          </div>} />
          <Route path="/products/:id" element={<div>
            <ProductPage/>
          </div>} />

          <Route path="/register" element={<div>
            <Admin/>
          </div>} />

            <Route path='/login' element={<div>
              <Login/>
            </div>} />

            <Route path="/profile" element={<div>
              <Profile/>
          </div>} />

          <Route path="/product_detail/:id" element={<div>
              <ProductDetail/>
          </div>} />
          {/* Các Route khác */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
