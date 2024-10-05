//import 라이브러리
import React from "react";
import { Link } from 'react-router-dom';

import '../css/reset.css';
import '../css/productList.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductList = () => {

    /*---라우터 관련-------------------------------*/
    
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    /*---일반 변수--------------------------------*/
    
    /*---일반 메소드 -----------------------------*/
    
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    
    return (
        <>
            <Header/>

            {/* nav */}
            {/* <div id="admin_nav">
                <ul className="clearfix">
                    <li><Link to="#" rel="noreferrer noopener">Apple 관리자 계정</Link></li>
                </ul>
            </div> */}

            <div id="wrap">

                {/* 컨텐츠 */}
                <div id="contents">
                    {/* product */}
                    <div id="product" className="clearfix">                 
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

                    {/* 매장 리스트관련 내용 */}
                    <div id="product_area">
                        <div id="product_list" >
                            <div className="hjy_header_with_button">
                                <h2>상품 관리</h2>
                                <button type="button" className="hjy_add_product_btn"><Link to="/admin/product/add" rel="noreferrer noopener">상품 등록</Link></button>
                            </div>
                            {/* 반복 구간 */}
                            <div id="product_item" className="clearfix" >
                                <img id="sotre_Img" src="/images/iPhone.png" alt="상품이미지"/>
                                <div className="hjy_product_info">
                                    <p>
                                        <strong>모델명: </strong> iPhone 16 Pro
                                    </p>
                                    <p>
                                        <strong>디스플레이: </strong> 15.9cm
                                    </p>
                                    <p>
                                        <strong>색상: </strong> White
                                    </p>
                                    <p>
                                        <strong>가격: </strong> 1,550,000\
                                    </p>
                                    <p>
                                        <strong>용량: </strong> 256GB
                                    </p>
                                </div>
                                <div className="hjy_edit_btns">
                                    <button type="button"><Link to="/admin/product/modify" rel="noreferrer noopener">수정</Link></button>
                                </div>
                                <div className="hjy_del_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>

                            <div id="product_item" className="clearfix" >
                                <img id="sotre_Img" src="/images/iPhone.png" alt="상품이미지"/>
                                <div className="hjy_product_info">
                                    <p>
                                        <strong>모델명: </strong> iPhone 16 Pro
                                    </p>
                                    <p>
                                        <strong>디스플레이: </strong> 15.9cm
                                    </p>
                                    <p>
                                        <strong>색상: </strong> White
                                    </p>
                                    <p>
                                        <strong>가격: </strong> 1,550,000\
                                    </p>
                                    <p>
                                        <strong>용량: </strong> 256GB
                                    </p>
                                </div>
                                <div className="hjy_edit_btns">
                                    <button type="button"><Link to="/admin/product/modify" rel="noreferrer noopener">수정</Link></button>
                                </div>
                                <div className="hjy_del_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>

                            <div id="product_item" className="clearfix" >
                                <img id="sotre_Img" src="/images/iPhone.png" alt="상품이미지"/>
                                <div className="hjy_product_info">
                                    <p>
                                        <strong>모델명: </strong> iPhone 16 Pro
                                    </p>
                                    <p>
                                        <strong>디스플레이: </strong> 15.9cm
                                    </p>
                                    <p>
                                        <strong>색상: </strong> White
                                    </p>
                                    <p>
                                        <strong>가격: </strong> 1,550,000\
                                    </p>
                                    <p>
                                        <strong>용량: </strong> 256GB
                                    </p>
                                </div>
                                <div className="hjy_edit_btns">
                                    <button type="button"><Link to="/admin/product/modify" rel="noreferrer noopener">수정</Link></button>
                                </div>
                                <div className="hjy_del_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>
                            
                            {/* //반복구간 */}
                        </div>
                        {/* //product_list */}

                    </div>
                    {/* product_area */}

                    </div>
                    {/* //product */}                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default ProductList;
