import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/productAddForm2.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm2 = () => {
    const [seriesNum, setSeriesNum] = useState(''); // 선택한 시리즈 번호 상태
    const [seriesList, setSeriesList] = useState([]); // 시리즈 목록 상태
    const [productList, setProductList] = useState([]); 
    const [productName, setProductName] = useState(''); // 상품명 상태
    const [infoImageSaved, setInfoImageSaved] = useState([]);  // 이미지 파일 배열 상태
    const [isSeriesSelected, setIsSeriesSelected] = useState(false); // 시리즈가 선택되었는지 여부

    const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate 추가
    const authUser = JSON.parse(localStorage.getItem('authUser'));  // authUser 정보 가져오기

    // 관리자인지 확인하여 관리자 아닌 경우 리다이렉트
    useEffect(() => {
        if (!authUser || authUser.userStatus !== '관리자') {
            // alert("관리자만 접근할 수 있습니다.");
            navigate("/");  // 메인 페이지로 리다이렉트
        }
    }, [authUser, navigate]);

    // 시리즈 선택 시 시리즈 선택 여부 업데이트
    const handleSeriesChange = (e) => {
        setSeriesNum(e.target.value);
        setIsSeriesSelected(!!e.target.value); // 시리즈가 선택되면 true, 아니면 false
        getProductList(e.target.value);
    };

    // 상품명 입력
    const handleProductName = (e) => {
        setProductName(e.target.value);
    }

    // 시리즈 목록을 가져오는 함수
    const getSeriesList = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/series`,
            responseType: 'json',
        }).then(response => {
            setSeriesList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    // 상품명 목록을 가져오는 함수
    const getProductList = (seriesNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/products/${seriesNum}`,
            responseType: 'json',
        }).then(response => {
            console.log(response.data.apiData);
            if (response.data.result === 'success') {
                setProductList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정

            } else {
                alert("등록 실패");
            }
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        // 컴포넌트가 마운트되면 시리즈 리스트 가져오기
        getSeriesList();
    }, []);

    // 파일 입력 필드를 업데이트하는 함수
    const handleMainImages = (e, index) => {
        const updatedImages = [...infoImageSaved];
        updatedImages[index] = e.target.files[0];  // 선택한 파일을 업데이트
        setInfoImageSaved(updatedImages);
    };

    // 이미지 입력 필드를 추가하는 함수 (중복된 필드 추가 방지)
    const handleImgAdd = () => {
        setInfoImageSaved([...infoImageSaved, null]);  // 새로운 필드 추가
    };

    // 상품 등록
    const handleSubmit = (e) => {
        e.preventDefault();

     // 필수 입력값 확인
     if (!seriesNum) {
        alert("시리즈를 선택해주세요.");
        return; // 시리즈가 선택되지 않았을 때 제출 중단
    }

    if (!productName.trim()) {
        alert("상품명을 입력해주세요.");
        return; // 상품명이 비어 있을 때 제출 중단
    }

    // 이미지가 선택되지 않았을 경우 경고창 표시
    if (infoImageSaved.length === 0 || infoImageSaved.every(file => file === null)) {
        alert("최소 한 개의 이미지를 선택해주세요.");
        return; // 이미지가 없을 때 제출 중단
    }

        // FormData 생성
        const formData = new FormData();
        formData.append("seriesNum", seriesNum);
        formData.append("productName", productName);

        // 선택한 이미지 파일들을 FormData에 추가 (동일한 이름으로 추가)
        infoImageSaved.forEach((file) => {
            if (file) {
                formData.append("infoImageSavedName", file);  // 동일한 이름으로 파일 추가
            }
        });

        // Axios를 사용하여 데이터 전송
        axios({
            method: 'post', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/infoImage/upload`,
            headers: { "Content-Type": "multipart/form-data" }, //첨부파일
            data: formData,           // 첨부파일  multipart방식
            responseType: 'json' //수신타입
        }).then(response => {
            if (response.data.result === 'success') {
                setIsSeriesSelected(false); // 리스트 숨기기
                setSeriesNum(''); // 선택 필드 초기화
                setProductName(''); // 입력 필드 초기화
                setInfoImageSaved([]); // 이미지 입력 초기화
            } else {
                alert("등록 실패");
            }
        }).catch(error => {
            console.log(error);
        });
    }

    // 상품 삭제
    const handleProductDelete = (productNum) => {
         // 삭제 확인 메시지
         const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
         if (!confirmDelete) return;
     
         // axios 요청으로 서버에 삭제 요청 보내기
         axios({
             method: 'delete',
             url: `${process.env.REACT_APP_API_URL}/api/delete/product/${productNum}`,
             responseType: 'json',
         })
         .then((response) => {
             if (response.data.result === 'success') {
                alert("삭제되었습니다.");
                // 삭제 후 UI 업데이트 (필요하다면 데이터 다시 불러오기)
                let newArray = productList.filter((product) => (
                    product.productNum !== productNum
                ));
  
                setProductList(newArray);
             } else {
                alert(response.data.message); // 서버에서 반환된 메시지를 사용자에게 알림
             }
         })
         .catch((error) => {
             console.error("삭제 요청 중 오류 발생:", error);
             alert("삭제 중 오류가 발생했습니다.");
         });
    }

    return (
        <>
            <Header/>

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
                                <h2 className="hjy-add-link"><Link to="/admin/product/add">시리즈 등록</Link></h2>
                                <h2 className="hjy-add-link"><Link to="/admin/product/add2">상품 등록</Link></h2>
                                <h2 className="hjy-add-link"><Link to="/admin/product/add3">색상 등록</Link></h2>
                                <h2 className="hjy-add-link"><Link to="/admin/product/add4">디스플레이 등록</Link></h2>
                                <h2 className="hjy-add-link"><Link to="/admin/product/add5">용량 등록</Link></h2>
                                <h2 className="hjy-add-link"><Link to="/admin/product/add6">상품상세 등록</Link></h2>
                                <div id="product_add_item" className="clearfix hjy-series">
                                    <form onSubmit={handleSubmit}>
                                        <p>상품 등록</p>
                                        <div className="hjy_product_content">
                                            <label htmlFor="product_series">시리즈:</label>
                                            <select id="product_series" value={seriesNum} onChange={handleSeriesChange}>
                                                <option value="">선택하세요</option>
                                                {seriesList.map((series) => (
                                                    <option key={series.seriesNum} value={series.seriesNum}>
                                                        {series.seriesName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_name">상품명:</label>
                                            <input 
                                                type="text" 
                                                id="product_name" 
                                                value={productName} 
                                                placeholder="상품명을 입력하세요" 
                                                onChange={handleProductName}
                                            />
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="main-img">본문 이미지:</label>
                                            <div>
                                                <div className="hjy-imgAdd">
                                                    <button type="button" onClick={handleImgAdd}>이미지 추가</button>
                                                </div>
                                            {infoImageSaved.map((image, index) => (
                                                <div className="hjy-file-box" key={index}>
                                                    <input id="main-img"
                                                        type="file" 
                                                        name={`infoImageSaved${index}`}
                                                        onChange={(e) => handleMainImages(e, index)}
                                                    />
                                                </div>
                                            ))}
                                            </div>
                                        </div>

                                        <div className="hjy_product_add_btnbox">
                                            <div className="hjy_product_add_btn">
                                                <button type="submit">등록</button>
                                            </div>
                                            <div className="hjy_product_cancel_btn">
                                                <button type="button"><Link to="/admin/product">취소</Link></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* 시리즈가 선택되었을 때만 테이블 표시 */}
                        {isSeriesSelected && (
                            <div className="hjy-seriesList">
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '70px' }}>Product Number</th>
                                            <th style={{ width: '70px' }}>Series Name</th>
                                            <th colSpan={3}>Product Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productList.map((product, index) => (
                                            <tr key={index}>
                                                <td>{product.productNum}</td>
                                                <td>{product.seriesName}</td>
                                                <td>{product.productName}</td>
                                                {/* <td style={{ width: '70px' }} className="hjy-action-btn"><Link to="/#">수정</Link></td> */}
                                                <td style={{ width: '70px' }} className="hjy-action-btn"><button type="button" onClick={() => handleProductDelete(product.productNum)}>삭제</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ProductAddForm2;
