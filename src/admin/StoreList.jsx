//import 라이브러리
import React from "react";
import { Link } from 'react-router-dom';

import '../css/reset.css';
import '../css/storeList.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const StoreList = () => {

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
                    {/* store */}
                    <div id="store" className="clearfix">
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
                    <div id="store_area">
                        <div id="store_list" >
                            <div className="hjy_header_with_button">
                                <h2>매장 관리</h2>
                                <button type="button" className="hjy_add_product_btn"><Link to="/admin/store/add" rel="noreferrer noopener">매장 등록</Link></button>
                            </div>
                            {/* 반복 구간 */}
                            <div id="store_item" className="clearfix" >
                                <img id="store_Img" src="/images/gangnam.jpg" alt="애플스토어"/>
                                <div className="hjy_store_info">
                                    <p>
                                        <strong>이름: </strong> Apple Store Gangnam
                                    </p>
                                    <p>
                                        <strong>주소: </strong> 464 Gangnam-daero Seoul, 06123
                                    </p>
                                    <p>
                                        <strong>전화번호: </strong> 82-0805000456
                                    </p>
                                </div>
                                <div className="hjy_modify_btn">
                                    <button type="button"><Link to="/admin/store/modify" rel="noreferrer noopener">수정</Link></button>
                                </div>
                                <div className="hjy_del_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>

                            <div id="store_item" className="clearfix" >
                                <img id="store_Img" src="/images/gangnam.jpg" alt="애플스토어"/>
                                <div className="hjy_store_info">
                                    <p>
                                        <strong>매장이름: </strong> Apple Store Gangnam
                                    </p>
                                    <p>
                                        <strong>주소: </strong> 464 Gangnam-daero Seoul, 06123
                                    </p>
                                    <p>
                                        <strong>매장 전화번호: </strong> 82-0805000456
                                    </p>
                                </div>
                                <div className="hjy_modify_btn">
                                    <button type="button"><Link to="/admin/store/modify" rel="noreferrer noopener">수정</Link></button>
                                </div>
                                <div className="hjy_del_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>

                            <div id="store_item" className="clearfix" >
                                <img id="store_Img" src="/images/gangnam.jpg" alt="애플스토어"/>
                                <div className="hjy_store_info">
                                    <p>
                                        <strong>이름: </strong> Apple Store Gangnam
                                    </p>
                                    <p>
                                        <strong>주소: </strong> 464 Gangnam-daero Seoul, 06123
                                    </p>
                                    <p>
                                        <strong>전화번호: </strong> 82-0805000456
                                    </p>
                                </div>
                                <div className="hjy_modify_btn">
                                    <button type="button"><Link to="/admin/store/modify" rel="noreferrer noopener">수정</Link></button>
                                </div>
                                <div className="hjy_del_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>
                            {/* //반복구간 */}
                        </div>
                        {/* //store_list */}

                    </div>
                    {/* store_area */}

                    </div>
                    {/* //store */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default StoreList;
