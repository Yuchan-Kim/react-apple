//import 라이브러리
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/userList.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const UserList = () => {

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
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
            url: `${process.env.REACT_APP_API_URL}/api/admin/user`,
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
    
    const handleDel = (userNum) => {
        console.log('삭제버튼 클릭');
        console.log(userNum);
    
        const requestData = {
            userNum: userNum,
            userStatus: "탈퇴" // Updating status to '탈퇴' (which means withdrawal)
        };
    
        axios({
            method: 'put',  // Correct method for updating user status
            url: `${process.env.REACT_APP_API_URL}/api/admin/user/${userNum}`, 
            data: requestData,  // This sends the required body (unionVo fields)
            responseType: 'json' 
        }).then(response => {
            console.log("===============================");
            console.log(response.data);
            console.log(response.data.result);
            console.log("===============================");
    
            if (response.data.result === 'success') {
                // Remove the deleted user from unionList
                let newArray = unionList.filter((user) => {
                    return user.userNum !== userNum;
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
                    {/* user */}
                    <div id="user" className="clearfix">
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
                    <div id="user_area">
                        <div id="user_list" >
                            <h2>유저 관리</h2>
                            {/* 반복 구간 */}
                            {unionList.map((union) => {
                                    return (
                                        <div id="user_item" className="clearfix"  key={union.userNum}>
                                            <div className="hjy_user_info">
                                                <p><strong>ID:  </strong>   {union.userId}</p>
                                                <p><strong>이름:    </strong>   {union.userName}</p>
                                            </div>
                                            <div className="hjy_modify_btn">
                                                <button type="button"><Link to={`/admin/user/modify?userNum=${union.userNum}`} rel="noreferrer noopener">수정</Link></button>
                                            </div>
                                            <div className="hjy_del_btn">
                                                <button type="button" onClick={() => handleDel(union.userNum)}>삭제</button>
                                            </div>
                                        </div>
                                    );
                                })}

                                <br />
                                {/* axios part */}

                            
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