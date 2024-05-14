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

const Adminroute = () => {
    return (
        <>
        <Header/>
         <Navbar/>
            <Routes>
                <Route path="/" element={<div>
                    hahahaha
                </div>} />
                <Route path="/" element={<div>
                    hahahaha
                </div>} />
            </Routes>
            <Footer/>
        </>
    )
}
export default Adminroute;