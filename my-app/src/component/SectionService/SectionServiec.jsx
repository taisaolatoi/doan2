import './SectionServiec.css';

const SectionService = () => {
    return(
        <div className="Sectionsv">
            <div className="container" style={{display: 'flex'}}>
                    <div className="promo-item">
                        <div className="icon">
                        <img style={{width: '36px', height:'36px'}} src="https://cdn.shopvnb.com/themes/images/policy_image_2.svg" alt="" /></div>
                        <div className="info">
                            Vận chuyển 
                            <span> TOÀN QUỐC</span>
                            <br />
                            Thanh toán khi nhận hàng.
                        </div>
                    </div>
                    <div className="promo-item">
                    <div className="icon">
                        <img style={{width: '36px', height:'36px'}} src="https://cdn.shopvnb.com/themes/images/policy_image_1.svg" alt="" /></div>
                        <div className="info">
                            <span>Bảo đảm chất lượng</span>
                            <br />
                            Sản phẩm bảo đảm chất lượng.
                        </div>
                    </div>
                    <div className="promo-item">
                    <div className="icon">
                        <img style={{width: '36px', height:'36px'}} src="https://cdn.shopvnb.com/themes/images/thanh_toan.svg" alt="" /></div>
                        <div className="info">
                            Tiến hành
                            <span> THANH TOÁN</span>
                            <br />
                            Với nhiều 
                            <span> PHƯƠNG THỨC.</span>
                        </div>
                    </div>
                    <div className="promo-item">
                    <div className="icon">
                        <img style={{width: '36px', height:'36px'}} src="https://cdn.shopvnb.com/themes/images/doi_san_pham.svg" alt="" /></div>
                        <div className="info">
                            <span>Đổi sản phẩm mới</span>
                            <br />
                            Nếu sản phẩm lỗi.
                        </div>
                    </div>
                </div>
                
            </div>

    )
}
export default SectionService;