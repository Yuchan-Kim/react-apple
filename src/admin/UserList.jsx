//import 라이브러리
import React from "react";
import { Link } from 'react-router-dom';

import '../css/reset.css';
import '../css/userList.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const UserList = () => {

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
                    {/* user */}
                    <div id="user" className="clearfix">
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
                    <div id="user_area">
                        <div id="user_list" >
                            <h2>유저 관리</h2>
                            {/* 반복 구간 */}
                            <div id="user_item" className="clearfix" >
                                <div className="hjy_user_info">
                                    <p><strong>userName</strong></p>
                                    <p>userId</p>
                                </div>
                                <div className="hjy_modify_btn">
                                    <button type="button"><Link to="/admin/user/modify" rel="noreferrer noopener">수정</Link></button>
                                </div>
                                <div className="hjy_del_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>

                            <div id="user_item" className="clearfix" >
                                <div className="hjy_user_info">
                                    <p><strong>userName</strong></p>
                                    <p>userId</p>
                                </div>
                                <div className="hjy_modify_btn">
                                    <button type="button"><Link to="/admin/user/modify" rel="noreferrer noopener">수정</Link></button>
                                </div>
                                <div className="hjy_del_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>

                            <div id="user_item" className="clearfix" >
                                <div className="hjy_user_info">
                                    <p><strong>userName</strong></p>
                                    <p>userId</p>
                                </div>
                                <div className="hjy_modify_btn">
                                    <button type="button"><Link to="/admin/user/modify" rel="noreferrer noopener">수정</Link></button>
                                </div>
                                <div className="hjy_del_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>
                            {/* //반복구간 */}
                        </div>
                        {/* //user_list */}

                    </div>
                    {/* user_area */}

                    </div>
                    {/* //user */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default UserList;