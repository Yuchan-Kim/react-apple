import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/productModifyForm6.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm6 = () => {

    const [searchParams] = useSearchParams();
    const productDetailNum = searchParams.get('productDetailNum');

    const [seriesName, setSeriesName] = useState('');
    const [productName, setProductName] = useState('');
    const [colorName, setColorName] = useState('');
    const [colorCode, setColorCode] = useState('');
    const [displaySize, setDisplaySize] = useState('');
    const [storageSize, setStorageSize] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDetailList, setProductDetailList] = useState([]);

    const [imageSavedName, setImageSavedName] = useState([]);  // 여러 파일을 배열로 저장
    const [imageToUpdate, setImageToUpdate] = useState({}); // 업데이트할 이미지 저장 (imagePrimary와 연결)

    const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate 추가
    const authUser = JSON.parse(localStorage.getItem('authUser'));  // authUser 정보 가져오기

    // 관리자인지 확인하여 관리자 아닌 경우 리다이렉트
    useEffect(() => {
        if (!authUser || authUser.userStatus !== '관리자') {
            navigate("/");  // 메인 페이지로 리다이렉트
        }
    }, [authUser, navigate]);

    // 선택한 상품 상세정보 가져오기
    const getSelectOneProductDetail = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/select/productDetail/${productDetailNum}`,
            responseType: 'json'
        }).then(response => {
            if (response.data.result === 'success') {
                setSeriesName(response.data.apiData.seriesName);
                setProductName(response.data.apiData.productName);
                setColorName(response.data.apiData.colorName);
                setColorCode(response.data.apiData.colorCode);
                setDisplaySize(response.data.apiData.displaySize);
                setStorageSize(response.data.apiData.storageSize);
                setProductPrice(response.data.apiData.productPrice);
            } else {
                alert("정보 가져오기 실패");
            }
        }).catch(error => {
            console.log(error);
        });
    }

    // 선택한 상품 이미지 정보 가져오기
    const getProductDetailImg = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/select/productDetailImg/${productDetailNum}`,
            responseType: 'json'
        }).then(response => {
            if (response.data.result === 'success') {
                setProductDetailList(response.data.apiData);
            } else {
                alert("이미지 정보 가져오기 실패");
            }
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getSelectOneProductDetail();
        getProductDetailImg();
    }, []);

    const handleSeriesName = (e) => setSeriesName(e.target.value);
    const handleProductName = (e) => setProductName(e.target.value);
    const handleColorName = (e) => setColorName(e.target.value);
    const handleColorCode = (e) => setColorCode(e.target.value);
    const handleDisplaySize = (e) => setDisplaySize(e.target.value);
    const handleStorageSize = (e) => setStorageSize(e.target.value);
    const handleProductPrice = (e) => setProductPrice(e.target.value);

    // 특정 이미지를 선택하여 수정하기 위한 함수
    const handleImageChange = (e, imagePrimary) => {
        const updatedImage = e.target.files[0]; // 선택한 파일
        setImageToUpdate({ ...imageToUpdate, [imagePrimary]: updatedImage }); // 수정할 이미지와 imagePrimary를 저장
    };

    // 이미지 추가하는 함수
    const handleImgAdd = () => {
        setImageSavedName([...imageSavedName, null]);  // 새로운 파일 입력 필드 추가
    };

    // 파일 입력 필드를 업데이트하는 함수
    const handleMainImages = (e, index) => {
        const updatedImages = [...imageSavedName];
        updatedImages[index] = e.target.files[0];  // 선택한 파일을 업데이트
        setImageSavedName(updatedImages);
    };

    // 상품 상세정보 수정
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("seriesName", seriesName);
        formData.append("productName", productName);
        formData.append("colorName", colorName);
        formData.append("colorCode", colorCode);
        formData.append("displaySize", displaySize);
        formData.append("storageSize", storageSize);
        formData.append("productPrice", productPrice);

        // 수정할 이미지를 formData에 추가 (imagePrimary와 매칭하여 수정)
        Object.keys(imageToUpdate).forEach(imagePrimary => {
            formData.append(`imageSavedName${imagePrimary}`, imageToUpdate[imagePrimary]);
        });

        axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/update/productDetail/${productDetailNum}`,
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
            responseType: 'json'
        }).then(response => {
            if (response.data.result === 'success') {
                alert("수정 성공");
                navigate(`/admin/product`);
            } else {
                alert("수정 실패");
            }
        }).catch(error => {
            console.log(error);
        });
    };

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
                            <div id="product_new" className="clearfix">
                                <h2 className="hjy-add-link"><Link to="/admin/product/add">시리즈 수정</Link></h2>
                                <h2 className="hjy-add-link"><Link to="/admin/product/add2">상품 수정</Link></h2>
                                <h2 className="hjy-add-link"><Link to="/admin/product/add3">색상 수정</Link></h2>
                                <h2 className="hjy-add-link"><Link to="/admin/product/add4">디스플레이 수정</Link></h2>
                                <h2 className="hjy-add-link"><Link to="/admin/product/add5">용량 수정</Link></h2>
                                <h2 className="hjy-add-link"><Link to="/admin/product/add6">상품상세 수정</Link></h2>

                                <div id="product_add_item" className="clearfix hjy-series">
                                    <form onSubmit={handleSubmit}>
                                        <p>상품상세 수정</p>
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
                                            <label htmlFor="product_colorName">색상명:</label>
                                            <input
                                                type="text"
                                                id="product_colorName"
                                                value={colorName}
                                                placeholder="색상명 입력하세요"
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

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_display">디스플레이:</label>
                                            <input
                                                type="text"
                                                id="product_display"
                                                value={displaySize}
                                                placeholder="디스플레이를 입력하세요"
                                                onChange={handleDisplaySize}
                                            />
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_storage">용량:</label>
                                            <input
                                                type="text"
                                                id="product_storage"
                                                value={storageSize}
                                                placeholder="용량 입력하세요"
                                                onChange={handleStorageSize}
                                            />
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
                                            <label>상세 이미지:</label>
                                            <div>
                                                <div className="hjy-imgAdd">
                                                    <button type="button" onClick={handleImgAdd}>이미지 추가</button>
                                                </div>
                                                {imageSavedName.map((image, index) => (
                                                    <div className="hjy-file-box" key={index}>
                                                        <input
                                                            type="file"
                                                            name={`imageSavedName${index}`}
                                                            onChange={(e) => handleMainImages(e, index)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="hjy_product_add_btnbox">
                                            <div className="hjy_product_add_btn">
                                                <button type="submit">수정</button>
                                            </div>
                                            <div className="hjy_product_cancel_btn">
                                                <button type="button"><Link to="/admin/product">취소</Link></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* 이미지를 표시하고 수정할 수 있는 부분 */}
                                {productDetailList.map((imgs) => {
                                    return (
                                        <div id="hjy-productDetail-imgs" key={imgs.imagePrimary}>
                                            <img
                                                className="hjy-productDetail-img"
                                                src={`${process.env.REACT_APP_API_URL}/upload/${imgs.imageSavedName}`}
                                                alt="상품사진"
                                            />
                                            {/* 이미지 수정 필드 추가 */}
                                            <div>
                                                <input
                                                    type="file"
                                                    name={`imageSavedName${imgs.imagePrimary}`}
                                                    onChange={(e) => handleImageChange(e, imgs.imagePrimary)}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductAddForm6;
