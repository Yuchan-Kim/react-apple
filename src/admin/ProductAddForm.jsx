//import 라이브러리
import React from "react";
import { Link } from 'react-router-dom';

import '../css/reset.css';
import '../css/productAddForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm = () => {

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
                        <div id="aside">
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
                                        <label htmlFor="product_series">시리즈:</label>
                                        <input type="text" id="product_series" name="" value="" placeholder="시리즈를 입력하세요"/>
                                    </div>
                                    <div className="hjy_product_content">
                                        <label htmlFor="product_name">상품명:</label>
                                        <input type="text" id="product_name" name="" value="" placeholder="상품명을 입력하세요"/>
                                    </div>
                                    <div className="hjy_product_content">
                                        <label htmlFor="product_image">본문 이미지:</label>
                                        <input type="file" id="product_image" name="file"/>
                                    </div>
                                    <div className="hjy_product_add_btnbox">
                                        <div className="hjy_product_add_btn">
                                            <button type="submit"><Link to="/admin/product/add2" rel="noreferrer noopener">다음</Link></button>
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
export default ProductAddForm;