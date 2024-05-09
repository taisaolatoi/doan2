import { Carousel } from 'antd';
import React from 'react';
import slider from './slider.css'
import slider1 from '../../assest/img/anh1.jpg';
import slider2 from '../../assest/img/nền 2.webp';
import slider3 from '../../assest/img/nền 3.webp';



const Slider = () => (
    <Carousel autoplay>
        <div>
            <h3><img style={{ height: '506px', width: '100%' }} src={slider1} alt="" />
            </h3>
        </div>
        <div>
        <h3><img style={{ height: '506px', width: '100%' }} src={slider2} alt="" />
            </h3>
        </div>
        <div>
        <h3><img style={{ height: '506px', width: '100%' }} src={slider3} alt="" />
            </h3>
        </div>
    </Carousel>
);
export default Slider;