import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/productAddForm6.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm2 = () => {
    const [seriesNum, setSeriesNum] = useState('');
    const [seriesList, setSeriesList] = useState([]); // 시리즈 목록 상태
    const [productNum, setProductNum] = useState(''); 
    const [productList, setProductList] = useState([]); 
    const [colorNum, setColorNum] = useState(''); 
    const [colorList, setColorList] = useState([]); 
    const [displayNum, setDisplayNum] = useState(''); 
    const [displayList, setDisplayList] = useState([]); 
    const [storageNum, setStorageNum] = useState(''); 
    const [storageList, setStorageList] = useState([]); 
    const [productPrice, setProductPrice] = useState('');
    const [imageSavedName, setImageSavedName] = useState([]);  // 여러 파일을 배열로 저장

    const navigate = useNavigate();

     // 시리즈 선택 시 상품 목록 불러오기
     const handleSeriesChange = (e) => {
        setSeriesNum(e.target.value);
        getProductList(e.target.value);
        getColorList(e.target.value);
        getDisplayList(e.target.value);
        getStorageList(e.target.value);
    };

    const handleProductPrice = (e) => {
        setProductPrice(e.target.value);
    }

    const handleImageSavedName = (e) => {
        setImageSavedName([...e.target.files]); // 여러 파일을 배열로 저장
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

    // 색상 목록을 가져오는 함수
    const getColorList = (seriesNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/color/${seriesNum}`,
            responseType: 'json',
        }).then(response => {
            console.log(response.data.apiDat);
            setColorList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    // 디스플레이 목록을 가져오는 함수
    const getDisplayList = (seriesNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/display/${seriesNum}`,
            responseType: 'json',
        }).then(response => {
            console.log(response.data.apiDat);
            setDisplayList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    // 용량 목록을 가져오는 함수
    const getStorageList = (seriesNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/storage/${seriesNum}`,
            responseType: 'json',
        }).then(response => {
            console.log(response.data.apiDat);
            setStorageList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    
    useEffect(() => {
        // 컴포넌트가 마운트되면 시리즈 리스트 가져오기
        getSeriesList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // FormData 객체 생성
        const formData = new FormData();

        // unionVo 데이터를 JSON 형태로 변환하여 FormData에 추가
        const unionVo = {
            seriesNum: seriesNum, // 시리즈 번호
            productNum: productNum, // 상품 번호
            colorNum: colorNum, // 색상 번호
            displayNum: displayNum, // 디스플레이 번호
            storageNum: storageNum, // 용량 번호
            productPrice: productPrice // 가격
        };

        // JSON 데이터를 Blob 형태로 추가
        formData.append("unionVo", new Blob([JSON.stringify(unionVo)], { type: "application/json" }));

        // 선택한 이미지 파일들을 FormData에 추가
        imageSavedName.forEach((file) => {
            formData.append("imageSavedName", file);
        });

        // Axios를 사용하여 데이터 전송
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/add/productDetail`,
            headers: { "Content-Type": "multipart/form-data" }, // multipart/form-data 헤더 설정
            data: formData,
            responseType: 'json'
        }).then(response => {
            console.log(response); // 응답 데이터 로그
            if (response.data.result === 'success') {
                // 성공 시 리다이렉트
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
                                    <p>상품상세 등록</p>
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
                                            <label htmlFor="product_color">색상명:</label>
                                                <select id="product_color" value={colorNum} onChange={(e) => setColorNum(e.target.value)}>
                                                    <option value="">선택하세요</option>
                                                    {colorList.map((color) => (
                                                        <option key={color.colorNum} value={color.colorNum}>
                                                            {color.colorName}
                                                        </option>
                                                    ))}
                                                </select>
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_display">디스플레이:</label>
                                                <select id="product_display" value={displayNum} onChange={(e) => setDisplayNum(e.target.value)}>
                                                    <option value="">선택하세요</option>
                                                    {displayList.map((display) => (
                                                        <option key={display.displayNum} value={display.displayNum}>
                                                            {display.displaySize}
                                                        </option>
                                                    ))}
                                                </select>
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_storage">용량:</label>
                                            <select id="product_storage" value={displayNum} onChange={(e) => setStorageNum(e.target.value)}>
                                                    <option value="">선택하세요</option>
                                                    {storageList.map((storage) => (
                                                        <option key={storage.storageNum} value={storage.storageNum}>
                                                            {storage.storageSize}
                                                        </option>
                                                    ))}
                                                </select>
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_price">가격:</label>
                                            <input 
                                                type="text" 
                                                id="product_price" 
                                                value={productPrice} 
                                                placeholder="가격을 입력하세요" 
                                                onChange={handleProductPrice}
                                            />
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_image">상세 이미지:</label>
                                            <input type="file" id="product_image" name="file" multiple onChange={handleImageSavedName}/>
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

export default ProductAddForm2;
