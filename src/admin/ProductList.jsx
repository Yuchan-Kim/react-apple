//import 라이브러리
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/productList.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductList = () => {

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [productList, setProductList] = useState([]);
    const [keyword, setKeyword] = useState(''); // 수정: keyword 초기값 설정

    const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate 추가
    const authUser = JSON.parse(localStorage.getItem('authUser'));  // authUser 정보 가져오기

    // 관리자인지 확인하여 관리자 아닌 경우 리다이렉트
    useEffect(() => {
        if (!authUser || authUser.userStatus !== '관리자') {
            navigate("/");  // 메인 페이지로 리다이렉트
        }
    }, [authUser, navigate]);

    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handleKeyword = (e) => {
        setKeyword(e.target.value); // 수정: 키워드 상태 업데이트
    };

    // 상품 리스트 가져오기
    const getProductList = (searchKeyword = '') => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/productList`,
            params: {
                keyword: searchKeyword // 서버로 키워드 전달
            },
            responseType: 'json',
        }).then(response => {
            console.log(response.data.apiData);
            setProductList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        getProductList(); // 컴포넌트가 마운트되면 기본 상품 리스트 가져오기
    }, []);

    // 상품 리스트 삭제
    const handleDeleteProduct = (productDetailNum) => {
        const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
      
        if (confirmDelete) {
          axios
            .delete(`${process.env.REACT_APP_API_URL}/api/delete/productList/${productDetailNum}`)
            .then(response => {
              if (response.data.result === 'success') {
                alert('삭제되었습니다.');
                getProductList(); // 삭제 후에도 최신 목록을 불러옴
              } else {
                alert(response.data.message);
              }
            })
            .catch(error => {
              console.error('삭제 중 오류 발생:', error);
              alert('삭제 중 오류가 발생했습니다.');
            });
        }
    };

    // 검색  
    const handleSearch = (e) => {
        e.preventDefault();
        getProductList(keyword); // 키워드를 이용하여 상품 목록 가져오기
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
                            <div id="product_list">
                            <div className="hjy_header_with_buttons">
                                <h2>상품 관리</h2>
                                <form onSubmit={handleSearch} className="hjy_search_form">
                                    <input type="text" value={keyword} placeholder="검색" onChange={handleKeyword}/>
                                    <button type="submit">검색</button>
                                </form>
                                <button type="button" className="hjy_add_product_btn">
                                    <Link to="/admin/product/add" rel="noreferrer noopener">상품 등록</Link>
                                </button>
                            </div>
                                {/* 반복 구간 - productList 데이터를 활용해 각 상품을 보여줌 */}
                                {productList.map((product, index) => (
                                    <div id="product_item" className="clearfix" key={index}>
                                        <img id="store_Img" src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="상품이미지" />
                                        <div className="hjy_product_info">
                                            <p><strong>시리즈: </strong>{product.seriesName}</p>
                                            <p><strong>모델명: </strong>{product.productName}</p>
                                            <p><strong>디스플레이: </strong>{product.displaySize}</p>
                                            <p><strong>색상: </strong>{product.colorName}</p>
                                            <p><strong>용량: </strong>{product.storageSize}</p>
                                            <p><strong>가격: </strong>{product.productPrice.toLocaleString()}원</p>
                                        </div>
                                        <div className="hjy_edit_btns">
                                        </div>
                                        <div className="hjy_del_btn">
                                            <button type="button" onClick={() => handleDeleteProduct(product.productDetailNum)}>삭제</button>
                                        </div>
                                    </div>
                                ))}
                                {/* //반복구간 */}
                            </div>
                            {/* //product_list */}
                        </div>
                        {/* product_area */}
                    </div>
                    {/* product */}
                </div>
                {/* contents */}
            </div>
            <Footer/>
        </>
    );
}
export default ProductList;
