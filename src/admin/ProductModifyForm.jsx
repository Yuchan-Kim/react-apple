//import 라이브러리
import React from "react";
import { Link } from 'react-router-dom';

import '../css/reset.css';
import '../css/productModifyForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductModifyForm = () => {

    /*---라우터 관련-------------------------------*/
    
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    /*---일반 변수--------------------------------*/
    
    /*---일반 메소드 -----------------------------*/
    
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    
    return (
        <>
            <Header/>

            <div id="wrap">

                {/* 컨텐츠 */}
                <div id="contents">
                    {/* product_modify */}
                    <div id="product_modify" className="clearfix">
                        {/* aside */}
                        <div id="asides">
                            <h2><Link to="/admin/main" rel="noreferrer noopener">관리자 페이지</Link></h2>
                            <div id="sub_list"> 
                                <ul>
                                    <li><Link to="/admin/store" rel="noreferrer noopener">매장 관리</Link></li>
                                    <li><Link to="/admin/product" rel="noreferrer noopener">상품 관리</Link></li>
                                    <li><Link to="/admin/user" rel="noreferrer noopener">유저 관리</Link></li>
                                    <li><Link to="/admin/dilivery" rel="noreferrer noopener">배송 관리</Link></li>
                                    <li><Link to="/admin/history" rel="noreferrer noopener">판매 관리</Link></li>
                                </ul>
                            </div>
                        </div>
                    {/* //aside */}

                    {/* 상품 정보 수정폼 */}
                    <div id="product_modify_area">
                        <div id="product_infos" >
                            <h2>상품 상세 정보</h2>
                            <div id="product_modify_item" className="clearfix" >
                                <form action="" method="post" >
                                    <div className="hjy_product_detail">
                                        <label htmlFor="product_name">모델명:</label>
                                        <input type="text" id="product_name" name="" value="iPhone 16 Pro"/>
                                    </div>
                                    <div className="hjy_product_detail">
                                        <label htmlFor="product_display">디스플레이:</label>
                                        <input type="text" id="product_display" name="" value="15.9cm"/>
                                    </div>
                                    <div className="hjy_product_detail">
                                        <label htmlFor="product_color">색상:</label>
                                        <input type="text" id="product_color" name="" value="White"/>
                                    </div>
                                    <div className="hjy_product_detail">
                                        <label htmlFor="product_price">가격:</label>
                                        <input type="text" id="product_price" name="" value="1,550,000"/>
                                    </div>
                                    <div className="hjy_product_detail">
                                        <label htmlFor="product_memory">용량:</label>
                                        <input type="text" id="product_memory" name="" value="256GB"/>
                                    </div>
                                    <div className="hjy_product_detail">
                                        <label htmlFor="store_image">이미지:</label>
                                        <input type="file" id="store_image" name="file"/>
                                    </div>
                                    <div className="hjy_product_modify_btnbox">
                                        <div className="hjy_product_modify_btn">
                                            <button type="submit">수정</button>
                                        </div>
                                        <div className="hjy_product_cancel_btn">
                                            <button type="button"><Link to="/admin/product" rel="noreferrer noopener">취소</Link></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* //product_infos */}

                    </div>
                    {/* product_modify_area */}

                    </div>
                    {/* //product_modify */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default ProductModifyForm;
