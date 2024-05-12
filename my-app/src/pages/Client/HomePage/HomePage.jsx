import Navbar from '../../../component/navbar/navbar';
import Slider from '../../../component/slider/slider';
import SectionService from '../../../component/SectionService/SectionServiec'
import SectionNew from '../../../component/SectionNewProduct/SectionNewProduct'
import SectionNewProduct from '../../../component/SectionNewProduct/SectionNewProduct';
import TypeProDuct from '../../../component/TypeProDuct/TypeProDuct';
import SaleOff from '../../../component/SaleOff/SaleOff'
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const HomePage = () => {
    return(
        <>
            <Slider />
            <SectionService />
            <SectionNew
              textbaner='Sản Phẩm Mới'
            />
            <SaleOff />
            <TypeProDuct />
        </>
    )
}
export default HomePage;