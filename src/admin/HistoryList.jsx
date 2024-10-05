//import 라이브러리
import React from "react";
import { Link } from 'react-router-dom';

import '../css/reset.css';
import '../css/historyList.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const HistoryList = () => {

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
                    {/* history */}
                    <div id="history" className="clearfix">                 
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

                    {/* 매장 리스트관련 내용 */}
                    <div id="history_area">
                        <div id="history_list" >
                            <h2>판매 관리</h2>
                            {/* 반복 구간 */}
                            <div id="history_item" className="clearfix" >
                                <img id="sotre_Img" src="/images/iPhone.png" alt="상품이미지"/>
                                <div className="hjy_history_info">
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
                            </div>

                            <div id="history_item" className="clearfix" >
                                <img id="sotre_Img" src="/images/iPhone.png" alt="상품이미지"/>
                                <div className="hjy_history_info">
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
                            </div>

                            <div id="history_item" className="clearfix" >
                                <img id="sotre_Img" src="/images/iPhone.png" alt="상품이미지"/>
                                <div className="hjy_history_info">
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
                            </div>


                            
                            {/* //반복구간 */}
                        </div>
                        {/* //history_list */}

                    </div>
                    {/* history_area */}

                    </div>
                    {/* //history */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default HistoryList;