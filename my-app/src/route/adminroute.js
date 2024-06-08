import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from '../component/adminpage/header-admin/header';
import Orders from '../component/adminpage/order/orders';
import Sidebar from '../component/adminpage/sidebar/sidebar';
import OrderDetails from '../component/adminpage/order/orderDetail';
import AddProductForm from '../component/adminpage/admin_add/addfull_products';
import AccountCreationForm from '../component/adminpage/admin_add/create_account';
import UpdateProductForm from '../component/adminpage/admin_add/UpdateProductForm';
import ProductInformation from '../component/adminpage/admin_add/ProductInformation';
import Brands from '../component/adminpage/admin_add/add_brands';
import AccountIn4 from '../component/adminpage/admin_add/accountin4';

const Adminroute = () => {
    return (
        <>
            <Header />
            <div className="admin-container" style={{ display: 'flex', gap: '20px' }}>
                <Sidebar />
                <Routes>
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/createaccount" element={<AccountCreationForm />} />
                    {/* <Route path="/account_info" element={<AccountIn4 />} /> */}
                    <Route path="/update-product/:id" element={<UpdateProductForm />} />
                    <Route path="/addproduct" element={< AddProductForm/>} />
                    <Route path="/order-details/:id" element={<OrderDetails />} />
                    <Route path="/UIproduct" element={< ProductInformation/>} />
                    <Route path="/brands" element={< Brands/>} />


                </Routes>
            </div>
        </>
    );
}

export default Adminroute;