import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/productAddForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm = () => {
    const [seriesName, setSeriesName] = useState('');
    const [seriesList, setSeriesList] = useState([]); // 시리즈 목록 상태

    const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate 추가
    const authUser = JSON.parse(localStorage.getItem('authUser'));  // authUser 정보 가져오기

    // 관리자인지 확인하여 관리자 아닌 경우 리다이렉트
    useEffect(() => {
        if (!authUser || authUser.userStatus !== '관리자') {
            // alert("관리자만 접근할 수 있습니다.");
            navigate("/");  // 메인 페이지로 리다이렉트
        }
    }, [authUser, navigate]);

    const handleSeriesName = (e) => {
        setSeriesName(e.target.value);
    }

    // 시리즈 등록
    const handleSubmit = (e) => {
        e.preventDefault();

         // 시리즈 입력이 비어있으면 경고창 띄우기
         if (!seriesName.trim()) {
            alert("시리즈 이름을 입력해주세요.");
            return; // 시리즈 이름이 없으면 제출 중단
        }

        const seriesVo = {
            seriesName: seriesName
        };

        axios({
            method: 'post', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/add/series`,
            headers: { "Content-Type": "application/json; charset=utf-8" },
            data: seriesVo,
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log(response); // 수신 데이터
            console.log(response.data); // 수신 데이터
        
            if (response.data.result === 'success') {
                getSeriesList();
                setSeriesName(''); // 입력 필드 초기화
            } else {
                alert("등록 실패");
            }
        }).catch(error => {
            console.log(error);
        });
    }; 

    // 시리즈 목록을 가져오는 함수
    const getSeriesList = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/series`,
            responseType: 'json',
        }).then(response => {
            console.log(response.data.apiData);
            setSeriesList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    // 시리즈 삭제
    const handleSeriesDelete = (seriesNum) => {
        // 삭제 확인 메시지
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmDelete) return;
    
        // axios 요청으로 서버에 삭제 요청 보내기
        axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/api/delete/series/${seriesNum}`,
            responseType: 'json',
        })
        .then((response) => {
            if (response.data.result === 'success') {
                alert("삭제되었습니다.");
                // 삭제 후 UI 업데이트 (필요하다면 데이터 다시 불러오기)
                let newArray = seriesList.filter((series) => (
					series.seriesNum !== seriesNum
				));

                setSeriesList(newArray);
            } else {
                alert(response.data.message); // 서버에서 반환된 메시지를 사용자에게 알림
            }
        })
        .catch((error) => {
            console.error("삭제 요청 중 오류 발생:", error);
            alert("삭제 중 오류가 발생했습니다.");
        });
    };

    useEffect(() => {
        // 컴포넌트가 마운트되면 시리즈 리스트 가져오기
        getSeriesList();
    }, []);

    return (
        <>
            <Header />

            <div id="wrap">
                <div id="contents">
                    <div id="product_add" className="clearfix">
                        <div id="asides">
                            <h2><Link to="/admin/main">관리자 페이지</Link></h2>
                            <div id="sub_list">
                                <ul>
                                    <li><Link to="/admin/store">매장 관리</Link></li>
                                    <li><Link to="/admin/product">상품 관리</Link></li>
                                    <li><Link to="/admin/user">유저 관리</Link></li>
                                    <li><Link to="/admin/delivery">배송 관리</Link></li>
                                    <li><Link to="/admin/history">판매 관리</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div id="product_add_area">
                            <div id="product_new">
                                <div>
                                    <h2 className="hjy-add-link"><Link to="/admin/product/add">시리즈 등록</Link></h2>
                                    <h2 className="hjy-add-link"><Link to="/admin/product/add2">상품 등록</Link></h2>
                                    <h2 className="hjy-add-link"><Link to="/admin/product/add3">색상 등록</Link></h2>
                                    <h2 className="hjy-add-link"><Link to="/admin/product/add4">디스플레이 등록</Link></h2>
                                    <h2 className="hjy-add-link"><Link to="/admin/product/add5">용량 등록</Link></h2>
                                    <h2 className="hjy-add-link"><Link to="/admin/product/add6">상품상세 등록</Link></h2>
                                </div>
                                
                                <div id="product_add_item" className="clearfix hjy-series">
                                    <form onSubmit={handleSubmit}>
                                        <p>시리즈 등록</p>
                                        <div className="hjy_product_content">
                                            <label htmlFor="product_series">시리즈:</label>
                                            <input 
                                                type="text" 
                                                id="product_series" 
                                                value={seriesName} 
                                                placeholder="시리즈를 입력하세요" 
                                                onChange={handleSeriesName}
                                            />
                                        </div>
                                        <div className="hjy_product_add_btnbox">
                                            <div className="hjy_product_add_btn">
                                                <button type="submit">등록</button>
                                            </div>
                                            <div className="hjy_product_cancel_btn">
                                                <button type="button">취소</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* seriesList */}
                        <div className="hjy-seriesList">
                            {/* <h2>Series List</h2> */}
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th style={{ width: '150px' }}>Series Number</th>
                                        <th colSpan={3}>Series Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {seriesList.map((series, index) => (
                                        <tr key={index}>
                                            <td>{series.seriesNum}</td>
                                            <td>{series.seriesName}</td>
                                            {/* <td style={{ width: '40px' }} className="hjy-action-btn"><Link to={`/admin/series/modify?seriesNum=${series.seriesNum}`} rel="noreferrer noopener">수정</Link></td> */}
                                            <td style={{ width: '40px' }} className="hjy-action-btn"><button type="button" onClick={() => handleSeriesDelete(series.seriesNum)}>삭제</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* //seriesList */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductAddForm;
