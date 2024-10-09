import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/userModifyForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const UserModifyForm = () => {

    const [searchParams] = useSearchParams();
    const userNum = searchParams.get('userNum');
    
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userHp, setUserHp] = useState(''); 
    const [userAddress, setUserAddress] = useState('');

    const navigate = useNavigate();  
    const authUser = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        if (!authUser || authUser.userStatus !== '관리자') {
            navigate("/");  
        }
    }, [authUser, navigate]);

    const getUserList = () => {
        if (userNum) {
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/api/modify/user/${userNum}`,
                responseType: 'json'
            }).then(response => {
                if(response.data.result === 'success') {
                    setUserName(response.data.apiData.userName);
                    setUserId(response.data.apiData.userId);
                    setUserPw(response.data.apiData.userPw); 
                    setUserHp(response.data.apiData.userHp); 
                    setUserAddress(response.data.apiData.userAddress); 
                } else {
                    alert("회원 정보 가져오기 실패");
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    useEffect(() => {
        getUserList();
    }, [userNum]);

    const handleUserName = (e) => {
        setUserName(e.target.value);
    }

    const handleUserId = (e) => {
        setUserId(e.target.value);
    }

    const handleUserPw = (e) => {
        setUserPw(e.target.value);
    }

    const handleUserHp = (e) => {
        setUserHp(e.target.value);
    }

    const handleUserAddress = (e) => {
        setUserAddress(e.target.value);
    }

    // 회원 정보 수정
    const handleSubmit = (e) => {
        e.preventDefault();

        // 필수 입력값 확인
        if (!userName || userName.trim() === "") {
            alert("이름을 입력하세요.");
            return;
        }

        if (!userId || userId.trim() === "") {
            alert("아이디를 입력하세요.");
            return;
        }

        if (!userPw || userPw.trim() === "") {
            alert("패스워드를 입력하세요.");
            return;
        }

        if (!userHp || userHp.trim() === "") {
            alert("전화번호를 입력하세요.");
            return;
        }

        if (!userAddress || userAddress.trim() === "") {
            alert("주소를 입력하세요.");
            return;
        }

        const userVo = {
            userNum: userNum,
            userName: userName,
            userId: userId,
            userPw: userPw,
            userHp: userHp,
            userAddress: userAddress
        }

        axios({
            method: 'put',                   
            url: `${process.env.REACT_APP_API_URL}/api/update/user/${userNum}`,
            headers: { "Content-Type": "application/json; charset=utf-8" }, 
            data: userVo,
            responseType: 'json'
        }).then(response => {
            if (response.data.result === 'success') {
                navigate(`/admin/user`);
                getUserList();
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

                {/* 컨텐츠 */}
                <div id="contents">
                    {/* user_modify */}
                    <div id="user_modify" className="clearfix">
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

                        {/* 유저 정보 수정폼 */}
                        <div id="user_modify_area">
                            <div id="user_infos">
                                <h2>유저 상세 정보</h2>
                                <div id="user_modify_item" className="clearfix">
                                    <form action="" method="" onSubmit={handleSubmit}>
                                        <div className="hjy_user_detail">
                                            <label htmlFor="user_name">이름:</label>
                                            <input type="text" id="user_name" name="" value={userName} onChange={handleUserName}/>
                                        </div>
                                        <div className="hjy_user_detail">
                                            <label htmlFor="user_id">아이디:</label>
                                            <input type="text" id="user_id" name="" value={userId} onChange={handleUserId}/>
                                        </div>
                                        <div className="hjy_user_detail">
                                            <label htmlFor="user_pw">패스워드:</label>
                                            <input type="password" id="user_pw" name="" value={userPw} onChange={handleUserPw}/>
                                        </div>
                                        <div className="hjy_user_detail">
                                            <label htmlFor="user_number">전화번호:</label>
                                            <input type="text" id="user_number" name="" value={userHp} onChange={handleUserHp}/>
                                        </div>
                                        <div className="hjy_user_detail">
                                            <label htmlFor="user_address">주소:</label>
                                            <input type="text" id="user_address" name="" value={userAddress} onChange={handleUserAddress}/>
                                        </div>
                                        <div className="hjy_user_modify_btnbox">
                                            <div className="hjy_user_modify_btn">
                                                <button type="submit">수정</button>
                                            </div>
                                            <div className="hjy_user_cancel_btn">
                                                <button type="button"><Link to="/admin/user" rel="noreferrer noopener">취소</Link></button>
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
export default UserModifyForm;
