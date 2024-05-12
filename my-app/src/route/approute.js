import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from '../component/header/header';
import Footer from '../component/footer/footer'
import HomePage from '../pages/Client/HomePage/HomePage';
import ProductPage from '../pages/Client/ProductPage/ProductPage';
import Navbar from '../component/navbar/navbar';
import Admin from '../component/adminpage/register';
import Login from '../component/adminpage/login';
import ProductDetail from '../component/product_detail/productdetail'
import Profile from '../component/profile/profile'

const Approute = () => {
    return (
        <>
        <Header/>
         <Navbar/>

            <Routes>
                <Route path="/" element={<div>
                    <HomePage />
                </div>} />
                <Route path="/products/:id" element={<div>
                    <ProductPage />
                </div>} />
                <Route path="/register" element={<div>
                    <Admin />
                </div>} />

                <Route path='/login' element={<div>
                    <Login />
                </div>} />

                <Route path="/profile" element={<div>
                    <Profile />
                </div>} />

                <Route path="/product_detail/:id" element={<div>
                    <ProductDetail />
                </div>} />
            </Routes>
            <Footer/>
        </>
    )
}
export default Approute;