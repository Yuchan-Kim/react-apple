import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/productAddForm3.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm3 = () => {
    const [seriesNum, setSeriesNum] = useState('');
    const [seriesList, setSeriesList] = useState([]); // 시리즈 목록 상태
    const [productNum, setProductNum] = useState(''); 
    const [productList, setProductList] = useState([]); 
    const [colorName, setColorName] = useState('');
    const [colorCode, setColorCode] = useState('');

    const navigate = useNavigate();

    // 시리즈 선택 시 상품 목록 불러오기
    const handleSeriesChange = (e) => {
        setSeriesNum(e.target.value);
        getProductList(e.target.value);  
    };

    const handleColorName = (e) => {
        setColorName(e.target.value);
    }

    const handleColorCode = (e) => {
        setColorCode(e.target.value);
    }

    // 시리즈 목록을 가져오는 함수
    const getSeriesList = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/series`,
            responseType: 'json',
        }).then(response => {
            console.log(response.data.apiDat);
            setSeriesList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    // 상품명 목록을 가져오는 함수
    const getProductList = (seriesNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/product/${seriesNum}`,
            responseType: 'json',
        }).then(response => {
            console.log(response.data.apiDat);
            setProductList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        // 컴포넌트가 마운트되면 시리즈 리스트 가져오기
        getSeriesList();
    }, []);

    // 색상 등록
    const handleSubmit = async (e) => {
        e.preventDefault();
        
       const colorVo = {
            productNum: productNum,
            seriesNum: seriesNum,
            colorName: colorName,
            colorCode: colorCode
        }

        axios({
            method: 'post', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/add/color`,
            headers: { "Content-Type": "application/json; charset=utf-8" },
            
            data: colorVo,
        
            responseType: 'json' //수신타입
          }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data); //수신데이타
        
            if(response.data.result === 'success') {
                //리다이렉트
              navigate("/admin/product");
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
                <div id="contents">
                    <div id="product_add" className="clearfix">
                        <div id="asides">
                            <h2><Link to="/admin/main">관리자 페이지</Link></h2>
                            <div id="sub_list"> 
                                <ul>
                                    <li><Link to="/admin/store">매장 관리</Link></li>
                                    <li><Link to="/admin/product">상품 관리</Link></li>
                                    <li><Link to="/admin/user">유저 관리</Link></li>
                                    <li><Link to="/admin/dilivery">배송 관리</Link></li>
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
                                    <p>색상 등록</p>
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
                                            <label htmlFor="product_productName">상품명:</label>
                                            <select id="product_productName" value={productNum} onChange={(e) => setProductNum(e.target.value)}>
                                                <option value="">선택하세요</option>
                                                {productList.map((product) => (
                                                    <option key={product.productNum} value={product.productNum}>
                                                        {product.productName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_colorName">색상명:</label>
                                            <input 
                                                type="text" 
                                                id="product_colorName" 
                                                value= {colorName}
                                                placeholder="색상을 입력하세요" 
                                                onChange={handleColorName}
                                            />
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_colorCode">색상코드:</label>
                                            <input 
                                                type="text" 
                                                id="product_colorCode" 
                                                value={colorCode} 
                                                placeholder="색상코드를 입력하세요" 
                                                onChange={handleColorCode}
                                            />
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
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ProductAddForm3;
