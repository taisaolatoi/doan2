import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Checkout from '../component/checkout/checkout';
const CheckoutRoute = () => {
    return(
        <>
            <Routes>
                <Route path="/checkout" element={<div>
                    <Checkout/>
                </div>} />
            </Routes>
        </>
    )
}
export default CheckoutRoute;