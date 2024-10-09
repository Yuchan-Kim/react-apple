//import 라이브러리
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/storeAddForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const StoreAddForm = () => {

    /*---라우터 관련-------------------------------*/
    
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [storeNumber, setStoreNumber] = useState('');
    const [storeImg, setstoreImg] = useState();
    const [mapImg, setMapImg] = useState();

    const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate 추가
    const authUser = JSON.parse(localStorage.getItem('authUser'));  // authUser 정보 가져오기

    // 관리자인지 확인하여 관리자 아닌 경우 리다이렉트
    useEffect(() => {
        if (!authUser || authUser.userStatus !== '관리자') {
            // alert("관리자만 접근할 수 있습니다.");
            navigate("/");  // 메인 페이지로 리다이렉트
        }
    }, [authUser, navigate]);

    /*---일반 변수--------------------------------*/
    
    /*---일반 메소드 -----------------------------*/
    
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handleStoreName = (e) => {
        setStoreName(e.target.value);
    }

    const handleStoreAddress = (e) => {
        setStoreAddress(e.target.value);
    }

    const handleStoreNumber = (e) => {
        setStoreNumber(e.target.value);
    }

    //파일 선택
    const handleStoreImg = (e) => {
        setstoreImg(e.target.files[0]);
    }

    //파일 선택
    const handleMapImg = (e) => {
        setMapImg(e.target.files[0]);
    }

    // 매장 등록
    const handleSubmit = (e) => {
        e.preventDefault();

    // 필수 입력값 확인
    const requiredFields = [
        { value: storeName, message: "이름을 입력해주세요." },
        { value: storeAddress, message: "주소를 입력해주세요." },
        { value: storeNumber, message: "전화번호를 입력해주세요." },
        { value: storeImg, message: "매장 이미지를 선택해주세요." },
        { value: mapImg, message: "지도 이미지를 선택해주세요." }
    ];

    // 모든 필드가 비어있는지 체크
    const allEmpty = requiredFields.every(field => !field.value);

    if (allEmpty) {
        alert("모든 필드를 입력해주세요.");
        return; // 모든 필드가 비어있으면 제출 중단
    }

    // 첫 번째로 비어있는 필드를 찾아서 경고를 띄우고 제출 중단
    for (let field of requiredFields) {
        if (!field.value) {
            alert(field.message);
            return; // 값이 없으면 제출 중단
        }
    }

        // FormData 생성
        const formData = new FormData();
        formData.append("storeName", storeName);
        formData.append("storeAddress", storeAddress);
        formData.append("storeNumber", storeNumber);
        formData.append("storeFile", storeImg);
        formData.append("mapFile", mapImg);


        // Axios를 사용하여 데이터 전송
        axios({
            method: 'post', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/add/store`,
            headers: { "Content-Type": "multipart/form-data" }, //첨부파일
            data: formData,           // 첨부파일  multipart방식
            responseType: 'json' //수신타입
        }).then(response => {
            if (response.data.result === 'success') {
                // 리다이렉트
                navigate(`/admin/store`);
            } else {
                alert("등록 실패");
            }
        }).catch(error => {
            console.log(error);
        });
    }
    
    return (
        <>
            <Header/>

            <div id="wrap">

                {/* 컨텐츠 */}
                <div id="contents">
                    {/* store_add */}
                    <div id="store_add" className="clearfix">
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

                    {/* 매장 등록폼 */}
                    <div id="store_add_area">
                        <div id="store_new" >
                            <h2>매장 등록</h2>
                            <div id="store_add_item" className="clearfix" >
                                <form action="" method="post" onSubmit={handleSubmit}>
                                    <div className="hjy_store_content">
                                        <label htmlFor="store_name">이름:</label>
                                        <input type="text" id="store_name" name="" value={storeName} onChange={handleStoreName} placeholder="이름을 입력하세요"/>
                                    </div>
                                    <div className="hjy_store_content">
                                        <label htmlFor="store_address">주소:</label>
                                        <input type="text" id="store_address" name="" value={storeAddress} onChange={handleStoreAddress} placeholder="주소를 입력하세요"/>
                                    </div>
                                    <div className="hjy_store_content">
                                        <label htmlFor="store_number">전화번호:</label>
                                        <input type="text" id="store_number" name="" value={storeNumber} onChange={handleStoreNumber} placeholder="전화번호를 입력하세요"/>
                                    </div>
                                    <div className="hjy_store_content">
                                        <label htmlFor="store_image">매장 이미지:</label>
                                        <input type="file" id="store_image" name="file" onChange={handleStoreImg}/>
                                    </div>
                                    <div className="hjy_store_content">
                                        <label htmlFor="store_map">지도 이미지:</label>
                                        <input type="file" id="store_map" name="file" onChange={handleMapImg}/>
                                    </div>
                                    <div className="hjy_store_add_btnbox">
                                        <div className="hjy_store_add_btn">
                                            <button type="submit">등록</button>
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
                    {/* //store_add */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default StoreAddForm;
