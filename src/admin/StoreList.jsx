//import 라이브러리
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/storeList.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const StoreList = () => {

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [storeList, setStoreList] = useState([]);

    const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate 추가
    const authUser = JSON.parse(localStorage.getItem('authUser'));  // authUser 정보 가져오기

    // 관리자인지 확인하여 관리자 아닌 경우 리다이렉트
    useEffect(() => {
        if (!authUser || authUser.userStatus !== '관리자') {
            // alert("관리자만 접근할 수 있습니다.");
            navigate("/");  // 메인 페이지로 리다이렉트
        }
    }, [authUser, navigate]);

    /*---일반 메소드 -----------------------------*/
    const getStoreList = () => {
        axios({
            method: 'get', // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/admin/store`,
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log(response.data); // 수신데이터
            setStoreList(response.data.apiData);
        }).catch(error => {
            console.log(error);
        });
    };

    /*---훅(useEffect)메소드-------*/
    useEffect(() => {
        console.log("마운트 됐어요");
        getStoreList(); // 서버에서 데이터 가져오기
    }, []);

    //삭제버튼 클릭했을 때
    
    const handleDel = (storeNum) => {
        console.log('삭제버튼 클릭');
        console.log(storeNum);

        axios({
            method: 'put', // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/admin/store/${storeNum}`,
             data: { storeNum: storeNum, storeStatus: '폐업' },
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log("===============================");
            console.log(response.data);
            console.log(response.data.result);
            console.log("===============================");

            if (response.data.result === 'success') {
                // storeList에서 삭제한 값만 제거된 새로운 배열
                let newArray = storeList.filter((store) => {
                    return store.storeNum !== storeNum;
                });
                setStoreList(newArray);
            } else {
                alert(response.data.message);
            }
        }).catch(error => {
            console.log(error);
        });
    };
    
    
    return (
        <>
            <Header/>

            <div id="wrap">

                {/* 컨텐츠 */}
                <div id="contents">
                    {/* store */}
                    <div id="store" className="clearfix">
                        {/* aside */}
                        <div id="asides">
                            <h2><Link to="/admin/main" rel="noreferrer noopener">관리자 페이지</Link></h2>
                            <div id="sub_list"> 
                                <ul>
                                    <li><Link to="/admin/store" rel="noreferrer noopener">매장 관리</Link></li>
                                    <li><Link to="/admin/product" rel="noreferrer noopener">상품 관리</Link></li>
                                    <li><Link to="/admin/user" rel="noreferrer noopener">유저 관리</Link></li>
                                    <li><Link to="/admin/delivery" rel="noreferrer noopener">배송 관리</Link></li>
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
                                {/* axios part */}
                                {storeList.map((store) => {
                                    return (
                                        <div id="store_item" className="clearfix" key={store.storeNum}>
                                            <img id="store_Img" src={`${process.env.REACT_APP_API_URL}/upload/${store.storeImage}`} alt="애플스토어"/>
                                            <div className="hjy_store_info">
                                                <p>
                                                    <strong>이름: </strong> {store.storeName}
                                                </p>
                                                <p>
                                                    <strong>주소: </strong> {store.storeAddress}
                                                </p>
                                                <p>
                                                    <strong>전화번호: </strong> {store.storeNumber}
                                                </p>
                                            </div>
                                            <div className="hjy_modify_btn">
                                                <button type="button"><Link to={`/admin/store/modify?storeNum=${store.storeNum}`} rel="noreferrer noopener">수정</Link></button>
                                            </div>
                                            <div className="hjy_del_btn">
                                                <button type="button" onClick={() => handleDel(store.storeNum)}>삭제</button>
                                            </div>
                                        </div>
                                    );
                                })}

                                <br />
                                {/* axios part */}

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
