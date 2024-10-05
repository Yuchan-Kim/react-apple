//import 라이브러리
import React from "react";
import { Link } from 'react-router-dom';

import '../css/reset.css';
import '../css/productAddForm2.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm2 = () => {

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
                    {/* product_add */}
                    <div id="product_add" className="clearfix">
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

                    {/* 상품 등록폼 */}
                    <div id="product_add_area">
                        <div id="product_new" >
                            <h2>상품 등록</h2>
                            <div id="product_add_item" className="clearfix" >
                                <form action="" method="" >
                                    <div className="hjy_product_content">
                                        <label htmlFor="product_colorName">색상명:</label>
                                        <input type="text" id="product_colorName" name="" value="" placeholder="색상을 입력하세요"/>
                                    </div>
                                    <div className="hjy_product_content">
                                        <label htmlFor="product_colorCode">색상코드:</label>
                                        <input type="text" id="product_colorCode" name="" value="" placeholder="색상코드를 입력하세요"/>
                                    </div>
                                    <div className="hjy_product_content">
                                        <label htmlFor="product_display">디스플레이:</label>
                                        <input type="text" id="product_display" name="" value="" placeholder="디스플레이를 입력하세요"/>
                                    </div>
                                    <div className="hjy_product_content">
                                        <label htmlFor="product_storage">용량:</label>
                                        <select id="product_storage" name="" value="">
                                        <option value="">선택하세요</option>
                                            <option value="64GB">64GB</option>
                                            <option value="128GB">128GB</option>
                                            <option value="256GB">256GB</option>
                                            <option value="512GB">512GB</option>
                                            <option value="1TB">1TB</option>
                                            <option value="악세사리">악세사리</option>
                                        </select>
                                    </div>
                                    <div className="hjy_product_content">
                                        <label htmlFor="product_price">가격:</label>
                                        <input type="text" id="product_price" name="" value="" placeholder="가격을 입력하세요"/>
                                    </div>
                                    <div className="hjy_product_content">
                                        <label htmlFor="product_image">상품 상세 이미지:</label>
                                        <input type="file" id="product_image" name="file"/>
                                    </div>
                                    <div className="hjy_product_add_btnbox">
                                        <div className="hjy_product_add_btn">
                                            <button type="submit">등록</button>
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
                    {/* //product_add */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default ProductAddForm2;