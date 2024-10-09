import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/productAddForm6.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm6 = () => {
    const [seriesNum, setSeriesNum] = useState('');
    const [seriesList, setSeriesList] = useState([]); // 시리즈 리스트
    const [productNum, setProductNum] = useState(''); 
    const [productList, setProductList] = useState([]); // 상품 리스트
    const [colorNum, setColorNum] = useState(''); 
    const [colorList, setColorList] = useState([]); // 색상 리스트
    const [displayNum, setDisplayNum] = useState(''); 
    const [displayList, setDisplayList] = useState([]); // 디스플레이 리스트
    const [storageNum, setStorageNum] = useState(''); 
    const [storageList, setStorageList] = useState([]); // 용량 리스트
    const [productPrice, setProductPrice] = useState('');
    const [imageSavedName, setImageSavedName] = useState([]);  // 여러 파일을 배열로 저장
    const [productDetailList, setProductDetailList] = useState([]); // 상품 상세정보 리스트
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

    // 시리즈 선택 시 상품 목록 불러오기
    const handleSeriesChange = (e) => {
        const selectedSeriesNum = e.target.value;

        console.log('선택한 시리즈번호');
        console.log(selectedSeriesNum);

        setSeriesNum(selectedSeriesNum);
        setIsSeriesSelected(!!selectedSeriesNum); // 시리즈가 선택되면 true, 아니면 false
        getProductList(selectedSeriesNum);
        getProductDetailList(selectedSeriesNum);
    };

    // 상품 선택 시 색상, 디스플레이, 용량 목록 불러오기
    const handleProductChange = (e) => {
        const selectedProductNum = e.target.value;

        console.log('선택한 상품번호');
        console.log(selectedProductNum);

        setProductNum(selectedProductNum);
        if (seriesNum && selectedProductNum) {
            getColorList(seriesNum, selectedProductNum);
            getDisplayList(seriesNum, selectedProductNum);
            getStorageList(seriesNum, selectedProductNum);
        }
    };

    // 가격 입력
    const handleProductPrice = (e) => {
        setProductPrice(e.target.value);
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
            url: `${process.env.REACT_APP_API_URL}/api/product/${seriesNum}`,
            responseType: 'json',
        }).then(response => {
            setProductList(response.data.apiData); // 응답 데이터로 상품 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    // 색상 목록을 가져오는 함수
    const getColorList = (seriesNum, productNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/color/${seriesNum}/${productNum}`,
            responseType: 'json',
        }).then(response => {
            setColorList(response.data.apiData); // 응답 데이터로 색상 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    // 디스플레이 목록을 가져오는 함수
    const getDisplayList = (seriesNum, productNum) => {
        
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/display/${seriesNum}/${productNum}`,
            responseType: 'json',
        }).then(response => {
            setDisplayList(response.data.apiData); // 응답 데이터로 디스플레이 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    // 용량 목록을 가져오는 함수
    const getStorageList = (seriesNum, productNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/storage/${seriesNum}/${productNum}`,
            responseType: 'json',
        }).then(response => {
            setStorageList(response.data.apiData); // 응답 데이터로 용량 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    // 상품 상세정보 목록을 가져오는 함수
    const getProductDetailList = (seriesNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/product/details/${seriesNum}`,
            responseType: 'json',
        }).then(response => {
            setProductDetailList(response.data.apiData); // 응답 데이터로 상품 상세정보 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        // 컴포넌트가 마운트되면 시리즈 리스트 가져오기
        getSeriesList();
        console.log(imageSavedName);
    }, []);

    // 파일 입력 필드를 업데이트하는 함수
    const handleMainImages = (e, index) => {
        const updatedImages = [...imageSavedName];
        updatedImages[index] = e.target.files[0];  // 선택한 파일을 업데이트
        setImageSavedName(updatedImages);
    };

    // 이미지 입력 필드를 추가하는 함수
    const handleImgAdd = () => {
        setImageSavedName([...imageSavedName, null]);  // 새로운 필드 추가
    };

    // 상품 상세정보 등록
    const handleSubmit = (e) => {
        e.preventDefault();

        // 필수 입력값 확인
        const requiredFields = [
            { value: seriesNum, message: "시리즈를 선택해주세요." },
            { value: productNum, message: "상품명을 선택해주세요." },
            { value: colorNum, message: "색상을 선택해주세요." },
            { value: displayNum, message: "디스플레이를 선택해주세요." },
            { value: storageNum, message: "용량을 선택해주세요." },
            { value: productPrice, message: "가격을 입력해주세요." },
            { value: imageSavedName.length > 0 ? imageSavedName[0] : null, message: "최소 한 개의 이미지를 선택해주세요." }
        ];
    
        for (let field of requiredFields) {
            if (!field.value || (typeof field.value === 'string' && field.value.trim() === "")) {
                alert(field.message);
                return;
            }
        }

        const formData = new FormData();
        formData.append("seriesNum", seriesNum);
        formData.append("productNum", productNum);
        formData.append("colorNum", colorNum);
        formData.append("displayNum", displayNum);
        formData.append("storageNum", storageNum);
        formData.append("productPrice", productPrice);

        imageSavedName.forEach((file) => {
            if (file) {
                formData.append("imageSavedName", file);  // 동일한 이름으로 파일 추가
            }
        });

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/productImgage/upload`,
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
            responseType: 'json'
        }).then(response => {
            if (response.data.result === 'success') {
                setIsSeriesSelected(false);
                setSeriesNum('');
                setProductNum('');
                setColorNum('');
                setDisplayNum('');
                setStorageNum('');
                setProductPrice('');
                setImageSavedName([]);
            } else {
                alert("등록 실패");
            }
        }).catch(error => {
            console.log(error);
        });
    };

    // 상품 상세정보 삭제
    const handleProductDetailDelete = (productDetailNum) => {
        if (!window.confirm("정말로 삭제하시겠습니까?")) return;

        axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/api/delete/productDetail/${productDetailNum}`,
            responseType: 'json',
        }).then((response) => {
            if (response.data.result === 'success') {
                const updatedDetails = productDetailList.filter(
                    (detail) => detail.productDetailNum !== productDetailNum
                );
                setProductDetailList(updatedDetails);
                alert("삭제되었습니다.");
            } else {
                alert(response.data.message);
            }
        }).catch(error => {
            console.error("삭제 요청 중 오류 발생:", error);
            alert("삭제 중 오류가 발생했습니다.");
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
                                            <select id="product_productName" value={productNum} onChange={handleProductChange}>
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
                                            <select id="product_storage" value={storageNum} onChange={(e) => setStorageNum(e.target.value)}>
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
                                            <th style={{ width: '70px' }}>Detail Number</th>
                                            <th style={{ width: '60px' }}>Series Name</th>
                                            <th style={{ width: '170px' }}>Product Name</th>
                                            <th style={{ width: '100px' }}>Color Name</th>
                                            <th style={{ width: '70px' }}>Display Size</th>
                                            <th style={{ width: '70px' }}>Storage Size</th>
                                            <th colSpan={3}>Product Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productDetailList.map((productDetail, index) => (
                                            <tr key={index}>
                                                <td>{productDetail.productDetailNum}</td>
                                                <td>{productDetail.seriesName}</td>
                                                <td>{productDetail.productName}</td>
                                                <td>{productDetail.colorName}</td>
                                                <td>{productDetail.displaySize}</td>
                                                <td>{productDetail.storageSize}</td>
                                                <td>{productDetail.productPrice}</td>
                                                {/* <td style={{ width: '40px' }} className="hjy-action-btn"><Link to="/#">수정</Link></td> */}
                                                <td style={{ width: '40px' }} className="hjy-action-btn"><button type="button" onClick={() => handleProductDetailDelete(productDetail.productDetailNum)}>삭제</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductAddForm6;
