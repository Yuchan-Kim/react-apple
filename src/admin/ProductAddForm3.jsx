import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/productAddForm3.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm3 = () => {
    const [seriesNum, setSeriesNum] = useState('');
    const [seriesList, setSeriesList] = useState([]); 
    const [productNum, setProductNum] = useState(''); 
    const [productList, setProductList] = useState([]); 
    const [colorName, setColorName] = useState('');
    const [colorCode, setColorCode] = useState('');
    const [colorList, setColorList] = useState([]); 
    const [isSeriesSelected, setIsSeriesSelected] = useState(false);
    const [selectedSeriesName, setSelectedSeriesName] = useState('');

    const navigate = useNavigate();
    const authUser = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        if (!authUser || authUser.userStatus !== '관리자') {
            navigate("/"); 
        }
    }, [authUser, navigate]);

    const handleSeriesChange = (e) => {
        const selectedSeriesNum = e.target.value;
        setSeriesNum(selectedSeriesNum);

        const selectedSeries = seriesList.find(series => series.seriesNum === parseInt(selectedSeriesNum));
        if (selectedSeries) {
            setSelectedSeriesName(selectedSeries.seriesName);
        }

        setIsSeriesSelected(!!selectedSeriesNum);
        getProductList(selectedSeriesNum);  
        getColorList(selectedSeriesNum);

        // 시리즈가 '악세사리'이면 색상명과 색상코드를 'N/A'로 설정
        if (selectedSeries && selectedSeries.seriesName === '악세사리') {
            setColorName('N/A');
            setColorCode('N/A');
        } else {
            setColorName('');
            setColorCode('');
        }
    };

    const handleColorName = (e) => {
        setColorName(e.target.value);
    }

    const handleColorCode = (e) => {
        setColorCode(e.target.value);
    }

    const getSeriesList = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/series`,
            responseType: 'json',
        }).then(response => {
            setSeriesList(response.data.apiData);
        }).catch(error => {
            console.log(error);
        });
    };

    const getProductList = (seriesNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/product/${seriesNum}`,
            responseType: 'json',
        }).then(response => {
            setProductList(response.data.apiData);
        }).catch(error => {
            console.log(error);
        });
    };

    const getColorList = (seriesNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/colors/${seriesNum}`,
            responseType: 'json',
        }).then(response => {
            setColorList(response.data.apiData);
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        getSeriesList();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

         const requiredFields = [
            { value: seriesNum, message: "시리즈를 선택해주세요." },
            { value: productNum, message: "상품명을 선택해주세요." },
            { value: colorName, message: "색상을 입력해주세요." },
            { value: colorCode, message: "색상 코드를 입력해주세요." }
        ];

        for (let field of requiredFields) {
            if (!field.value || field.value.trim() === "") {
                alert(field.message);
                return; 
            }
        }

        if (requiredFields.every(field => !field.value.trim())) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        
       const colorVo = {
            productNum: productNum,
            seriesNum: seriesNum,
            colorName: colorName,
            colorCode: colorCode
        }

        axios({
            method: 'post',                   
            url: `${process.env.REACT_APP_API_URL}/api/add/color`,
            headers: { "Content-Type": "application/json; charset=utf-8" },
            data: colorVo,
            responseType: 'json'
          }).then(response => {
            if(response.data.result === 'success') {
                setIsSeriesSelected(false);
                setSeriesNum(''); 
                setProductNum('');
                setColorName(''); // 입력 필드 초기화
                setColorCode(''); // 입력 필드 초기화
                // 등록 후 필드를 다시 활성화 상태로 유지
            } else {
                alert("등록 실패");
            }
              
          }).catch(error => {
            console.log(error);
        }); 
        
    }

    const handleColorDelete = (colorNum) => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmDelete) return;
    
        axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/api/delete/color/${colorNum}`,
            responseType: 'json',
        })
        .then((response) => {
            if (response.data.result === 'success') {
                alert("삭제되었습니다.");
                let newArray = colorList.filter((color) => (
					color.colorNum !== colorNum
				));

                setColorList(newArray);
            } else {
                alert(response.data.message);
            }
        })
        .catch((error) => {
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
                                                // disabled={selectedSeriesName === '악세사리'}
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
                                                // disabled={selectedSeriesName === '악세사리'}
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

                        {isSeriesSelected && (
                            <div className="hjy-seriesList">
                                <table border="1">
                                    <thead>
                                        <tr>
                                        <th style={{ width: '40px' }}>Color Number</th>
                                        <th style={{ width: '100px' }}>Series Name</th>
                                        <th style={{ width: '210px' }}>Product Name</th>
                                        <th style={{ width: '140px' }}>Color Name</th>
                                        <th style={{ width: '100px' }} colSpan={3}>Color Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {colorList.map((color, index) => (
                                            <tr key={index}>
                                                <td>{color.colorNum}</td>
                                                <td>{color.seriesName}</td>
                                                <td>{color.productName}</td>
                                                <td>{color.colorName}</td>
                                                <td>{color.colorCode}</td>
                                                <td style={{ width: '40px' }} className="hjy-action-btn"><button type="button" onClick={() => handleColorDelete(color.colorNum)}>삭제</button></td>
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

export default ProductAddForm3;
