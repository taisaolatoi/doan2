import './SectionNew.css'
import { Card } from 'antd';

const SectionNewProduct = (props) => {
    const {textbaner} = props
    return (
        <section className="section_flash_sale">
            <div className="container">
                <div className="title_modules">
                    <h2>
                        <a href="">
                            <span>{textbaner}</span>
                        </a>
                    </h2>
                </div>
                {/* <div className="time-flas">
                    <div className="swiper-wrapper">

                    </div>

                </div> */}
            </div>
        </section>

    )
}
export default SectionNewProduct;