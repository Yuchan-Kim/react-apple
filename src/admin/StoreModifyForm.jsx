import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/storeModifyForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const StoreModifyForm = () => {

    const [searchParams] = useSearchParams();
    const storeNum = searchParams.get('storeNum');
    
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [storeNumber, setStoreNumber] = useState('');
    const [storeImg, setstoreImg] = useState(); 
    const [mapImg, setMapImg] = useState();

    const navigate = useNavigate();  
    const authUser = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        if (!authUser || authUser.userStatus !== '관리자') {
            navigate("/");  
        }
    }, [authUser, navigate]);

    const getStoreList = () => {
        if (storeNum) {
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/api/modify/store/${storeNum}`,
                responseType: 'json'
            }).then(response => {
                if(response.data.result === 'success') {
                    setStoreName(response.data.apiData.storeName);
                    setStoreAddress(response.data.apiData.storeAddress); 
                    setStoreNumber(response.data.apiData.storeNumber); 
                } else {
                    alert("매장 정보 가져오기 실패");
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    useEffect(() => {
        getStoreList();
    }, [storeNum]);  

    const handleStoreName = (e) => {
        setStoreName(e.target.value);
    }

    const handleStoreAddress = (e) => {
        setStoreAddress(e.target.value);
    }

    const handleStoreNumber = (e) => {
        setStoreNumber(e.target.value);
    }

    const handleStoreImg = (e) => {
        setstoreImg(e.target.files[0]);
    }

    const handleMapImg = (e) => {
        setMapImg(e.target.files[0]);
    }

    // 매장 수정
    const handleSubmit = (e) => {
        e.preventDefault();

        // 필수 입력값 확인
        if (!storeName || storeName.trim() === "") {
            alert("이름을 입력하세요.");
            return;
        }

        if (!storeAddress || storeAddress.trim() === "") {
            alert("주소를 입력하세요.");
            return;
        }

        if (!storeNumber || storeNumber.trim() === "") {
            alert("전화번호를 입력하세요.");
            return;
        }

        if (!storeImg) {
            alert("매장 이미지를 선택하세요.");
            return;
        }

        if (!mapImg) {
            alert("지도 이미지를 선택하세요.");
            return;
        }

        // FormData 생성
        const formData = new FormData();
        formData.append("storeNum", storeNum);
        formData.append("storeName", storeName);
        formData.append("storeAddress", storeAddress);
        formData.append("storeNumber", storeNumber);
        formData.append("storeFile", storeImg);
        formData.append("mapFile", mapImg);

        axios({
            method: 'put',                   
            url: `${process.env.REACT_APP_API_URL}/api/update/store/${storeNum}`,
            headers: { "Content-Type": "multipart/form-data" }, 
            data: formData,           
            responseType: 'json'
        }).then(response => {
            if (response.data.result === 'success') {
                navigate(`/admin/store`);
                getStoreList();
            } else {
                alert("수정 실패");
            }
        }).catch(error => {
            console.log(error);
        });
    }
    
    return (
        <>
            <Header/>

            <div id="wrap">
                <div id="contents">
                    <div id="store_modify" className="clearfix">
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

                        <div id="store_modify_area">
                            <div id="store_infos">
                                <h2>매장 상세 정보</h2>
                                <div id="store_modify_item" className="clearfix">
                                    <form action="" method="" onSubmit={handleSubmit}>
                                        <div className="hjy_store_detail">
                                            <label htmlFor="store_name">이름:</label>
                                            <input type="text" id="store_name" name="" value={storeName} onChange={handleStoreName}/>
                                        </div>
                                        <div className="hjy_store_detail">
                                            <label htmlFor="store_address">주소:</label>
                                            <input type="text" id="store_address" name="" value={storeAddress} onChange={handleStoreAddress}/>
                                        </div>
                                        <div className="hjy_store_detail">
                                            <label htmlFor="store_number">전화번호:</label>
                                            <input type="text" id="store_number" name="" value={storeNumber} onChange={handleStoreNumber}/>
                                        </div>
                                        <div className="hjy_store_detail">
                                            <label htmlFor="store_image">매장 이미지:</label>
                                            <input type="file" id="store_image" name="file" onChange={handleStoreImg}/>
                                        </div>
                                        <div className="hjy_store_detail">
                                            <label htmlFor="store_map">지도 이미지:</label>
                                            <input type="file" id="store_map" name="file" onChange={handleMapImg}/>
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
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
export default StoreModifyForm;
