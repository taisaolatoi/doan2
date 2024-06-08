import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Checkout from '../component/checkout/checkout';
import Navigate from '../component/adminpage/header-admin/navigate';
const CheckoutRoute = () => {
    return(
        <>
            <Routes>
                <Route path="/checkout" element={<div>
                    <Checkout/>
                </div>} />
            </Routes>
            <Routes>
                <Route path="/navigate" element={<div>
                    <Navigate/>
                </div>} />
            </Routes>
        </>
    )
}
export default CheckoutRoute;