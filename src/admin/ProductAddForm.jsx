import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/productAddForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm = () => {
    const [seriesName, setSeriesName] = useState('');

    const navigate = useNavigate();

    const handleSeriesName = (e) => {
        setSeriesName(e.target.value);
    }

    // 시리즈 등록
    const handleSubmit = async (e) => {
        e.preventDefault();

        const seriesVo = {
            seriesName: seriesName
        }

        axios({
            method: 'post', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/add/series`,
            headers: { "Content-Type": "application/json; charset=utf-8" },
            
            data: seriesVo,
        
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

export default ProductAddForm;
