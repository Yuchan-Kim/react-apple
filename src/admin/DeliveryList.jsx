//import 라이브러리
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/deliveryList.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const DeliveryList = () => {

    const [unionList, setUnionList] = useState([]);

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
    const getUnionList = () => {
        axios({
            method: 'get', // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/admin/delivery`,
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log(response.data); // 수신데이터
            setUnionList(response.data.apiData);
        }).catch(error => {
            console.log(error);
        });
    };

    /*---훅(useEffect)메소드-------*/
    useEffect(() => {
        console.log("마운트 됐어요");
        getUnionList(); // 서버에서 데이터 가져오기
    }, []);
    
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handleSend = (receiptNum) => {
        console.log('배송중 버튼 클릭');
        console.log(receiptNum);

        const requestData = {
            receiptNum: receiptNum,
            shippingStatus: "배송 중" // Updating status to '탈퇴' (which means withdrawal)
        };

        axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/admin/delivery/send/${receiptNum}`, 
            data: requestData, 
            responseType: 'json' 
        }).then(response => {
            console.log("===============================");
            console.log(response.data);
            console.log(response.data.result);
            console.log("===============================");

            if (response.data.result === 'success') {
                // Update the shipping status of the item in unionList
                let newArray = unionList.map((union) => {
                    if (union.receiptNum === receiptNum) {
                        return {
                            ...union,
                            shippingStatus: requestData.shippingStatus // Update shipping status
                        };
                    }
                    return union; // Return unchanged items
                });
                setUnionList(newArray);
            } else {
                alert(response.data.message);
            }
        }).catch(error => {
            console.log(error);
        });
    };

    const handleArrive = (receiptNum) => {
        console.log('배송완료 버튼 클릭');
        console.log(receiptNum);

        const requestData = {
            receiptNum: receiptNum,
            shippingStatus: "배송 완료" // Updating status to '탈퇴' (which means withdrawal)
        };

        axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/admin/delivery/arrive/${receiptNum}`, 
            data: requestData, 
            responseType: 'json' 
        }).then(response => {
            console.log("===============================");
            console.log(response.data);
            console.log(response.data.result);
            console.log("===============================");

            if (response.data.result === 'success') {
                // Remove the updated item from unionList
                let newArray = unionList.filter((union) => {
                    return union.receiptNum !== receiptNum;
                });
                setUnionList(newArray);
            } else {
                alert(response.data.message);
            }
        }).catch(error => {
            console.log(error);
        });
    };

    const handlePickUp = (receiptNum) => {
        console.log('배송중 버튼 클릭');
        console.log(receiptNum);

        const requestData = {
            receiptNum: receiptNum,
            shippingStatus: "픽업 완료" // Updating status to '탈퇴' (which means withdrawal)
        };

        axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/admin/delivery/pickup/${receiptNum}`, 
            data: requestData, 
            responseType: 'json' 
        }).then(response => {
            console.log("===============================");
            console.log(response.data);
            console.log(response.data.result);
            console.log("===============================");

            if (response.data.result === 'success') {
                // Update the shipping status of the item in unionList
                let newArray = unionList.map((union) => {
                    if (union.receiptNum === receiptNum) {
                        return {
                            ...union,
                            shippingStatus: requestData.shippingStatus // Update shipping status
                        };
                    }
                    return union; // Return unchanged items
                });
                setUnionList(newArray);
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
                    {/* product */}
                    <div id="product" className="clearfix">                 
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
                    <div id="product_area">
                        <div id="product_list" >
                            <h2>배송 관리</h2>
                             {/* 반복 구간 */}
                            {unionList.map((union, index) => {
                                    return (
                                        <div id="product_item" className="clearfix product-item"  key={index}> {/* Corrected the typo here */}
                                            <img id="store_Img" src={`${process.env.REACT_APP_API_URL}/upload/${union.imageSavedName}`} alt="상품이미지"/>
                                            <div className="hjy_product_info">
                                                <p><strong>모델명: </strong> {union.productName}</p>
                                                <p><strong>디스플레이: </strong> {union.displaySize}</p>
                                                <p><strong>색상: </strong> {union.colorName}</p>
                                                <p><strong>용량: </strong> {union.storageSize}</p>
                                                <p><strong>가격: </strong> {union.productPrice}</p>
                                            </div>

                                            <div className="hjy_buyer_info">
                                                <p><strong>상태: </strong> {union.shippingStatus}</p>
                                                <p><strong>구매자: </strong> {union.userName}</p>
                                                <p><strong>아이디: </strong> {union.userId}</p>
                                                <p><strong>주소: </strong> {union.userAddress}</p> {/* Corrected the field */}
                                                <p><strong>연락처: </strong>{union.userHp}</p>
                                            </div>
                                            <div className="hjy_modify_btns">
                                            {/* Conditionally render the button based on shippingStatus */}
                                            {union.shippingStatus === "배송 준비중" && (
                                                <button className="hjy-mbtn" type="button" onClick={() => handleSend(union.receiptNum)}>배송중</button>
                                            )}
                                            {union.shippingStatus === "배송 중"  && (
                                                <button className="hjy-mbtn" type="button" onClick={() => handleArrive(union.receiptNum)}>배송완료</button>
                                            )}
                                            {union.shippingStatus === "픽업" && (
                                                <button className="hjy-mbtn" type="button" onClick={() => handlePickUp(union.receiptNum)}>픽업완료</button>
                                            )}
                                         </div>
                                        </div>
                                    );
                                })}

                                <br />
                            
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
export default DeliveryList;
