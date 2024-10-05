//import 라이브러리
import React from "react";
import { Link } from 'react-router-dom';

import '../css/reset.css';
import '../css/storeModifyForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const StoreModifyForm = () => {

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
                    {/* store_modify */}
                    <div id="store_modify" className="clearfix">
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

                    {/* 매장 정보 수정폼 */}
                    <div id="store_modify_area">
                        <div id="store_infos" >
                            <h2>매장 상세 정보</h2>
                            <div id="store_modify_item" className="clearfix" >
                                <form action="" method="post" >
                                    <div className="hjy_store_detail">
                                        <label htmlFor="store_name">이름:</label>
                                        <input type="text" id="store_name" name="" value="Apple Store Gangnam"/>
                                    </div>
                                    <div className="hjy_store_detail">
                                        <label htmlFor="store_address">주소:</label>
                                        <input type="text" id="store_address" name="" value="464 Gangnam-daero Seoul, 06123"/>
                                    </div>
                                    <div className="hjy_store_detail">
                                        <label htmlFor="store_number">전화번호:</label>
                                        <input type="text" id="store_number" name="" value="82-0805000456"/>
                                    </div>
                                    <div className="hjy_store_detail">
                                        <label htmlFor="store_image">이미지:</label>
                                        <input type="file" id="store_image" name="file"/>
                                    </div>
                                    <div className="hjy_store_modify_btnbox">
                                        <div className="hjy_store_modify_btn">
                                            <button type="submit">수정</button>
                                        </div>
                                        <div className="hjy_store_cancel_btn">
                                            <button type="button"><Link to="/admin/store" rel="noreferrer noopener">취소</Link></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* //store_infos */}

                    </div>
                    {/* store_modify_area */}

                    </div>
                    {/* //store_modify */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default StoreModifyForm;
