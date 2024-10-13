import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';  // useNavigate 추가
import axios from 'axios';

// css
import '../css/reset.css';
import '../css/adminMain.css';
import Header from '../include/Header'; 
import Footer from '../include/Footer';

const AdminMain = () => {
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [storeList, setStoreList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [historyCount, setHistoryCount] = useState(0);
    const [totalPriceSum, setTotalPriceSum] = useState(0); // State for the total sum of totalPrice
    const [userCount, setUserCount] = useState(0);
    const [waitingCount, setWaitingCount] = useState(0);
    const [deliveringCount, setDeliveringCount] = useState(0);
    const [pickUpCount, setPickUpCount] = useState(0);

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
    const getStoreList = () => {
        axios({
            method: 'get', 
            url: `${process.env.REACT_APP_API_URL}/api/admin/store`,
            responseType: 'json'
        }).then(response => {
            const limitedData = response.data.apiData.slice(-3);
            setStoreList(limitedData);
        }).catch(error => {
            console.log(error);
        });
    };

    const getProductList = () => {
        axios({
            method: 'get', 
            url: `${process.env.REACT_APP_API_URL}/api/productList3`,
            responseType: 'json'
        }).then(response => {
           // const limitedData = response.data.apiData.slice(-3);
            setProductList(response.data.apiData);
        }).catch(error => {
            console.log(error);
        });
    };

    const getHistoryListData = () => {
        axios({
            method: 'get', 
            url: `${process.env.REACT_APP_API_URL}/api/admin/history`,
            responseType: 'json'
        }).then(response => {
            const count = response.data.apiData.length;
            setHistoryCount(count);

            const sum = response.data.apiData.reduce((acc, item) => acc + item.totalPrice, 0);
            setTotalPriceSum(sum);
        }).catch(error => {
            console.log(error);
        });
    };

    const getDelilverListData = () => {
        axios({
            method: 'get', 
            url: `${process.env.REACT_APP_API_URL}/api/admin/delivery`,
            responseType: 'json'
        }).then(response => {
            const filteredData1 = response.data.apiData.filter(item => item.shippingStatus === '배송 준비중');
            setWaitingCount(filteredData1.length);

            const filteredData2 = response.data.apiData.filter(item => item.shippingStatus === '배송 중');
            setDeliveringCount(filteredData2.length);

            const filteredData3 = response.data.apiData.filter(item => item.shippingStatus === '픽업');
            setPickUpCount(filteredData3.length);

        }).catch(error => {
            console.log(error);
        });
    };

    const getUserCount = () => {
        axios({
            method: 'get', 
            url: `${process.env.REACT_APP_API_URL}/api/admin/user`,
            responseType: 'json'
        }).then(response => {
            const count = response.data.apiData.length;
            setUserCount(count);
        }).catch(error => {
            console.log(error);
        });
    };

    /*---훅(useEffect)메소드-------*/
    useEffect(() => {
        getStoreList(); 
        getProductList();
        getHistoryListData();
        getUserCount();
        getDelilverListData();
    }, []);

    return (
        <>
            <Header />

            <div id="wrap">
                {/* 컨텐츠 */}
                <div id="contents" className="clearfix">
                    {/* admin_main */}
                    <div id="admin_main">
                        {/* aside */}
                        <div id="asides">
                            <h2><Link to="/admin/main" rel="noreferrer noopener">관리자 페이지</Link></h2>
                            <div id="sub_list">
                                <ul className='lists'>
                                    <li><Link to="/admin/store" rel="noreferrer noopener">매장 관리</Link></li>
                                    <li><Link to="/admin/product" rel="noreferrer noopener">상품 관리</Link></li>
                                    <li><Link to="/admin/user" rel="noreferrer noopener">유저 관리</Link></li>
                                    <li><Link to="/admin/delivery" rel="noreferrer noopener">배송 관리</Link></li>
                                    <li><Link to="/admin/history" rel="noreferrer noopener">판매 관리</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* //aside */}
                        <div className="hjy-grid-container">
                            {/* User Management Summary */}
                            <div className="hjy-list-section">
                                <div className="hjy-list-header">
                                    <h3>유저 관리</h3>
                                    <Link to="/admin/user" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-list-status">
                                    <p>전체: {userCount} </p>
                                </div>
                            </div>

                            {/* Delivery Management Summary */}
                            <div className="hjy-list-section">
                                <div className="hjy-list-header">
                                    <h3>배송 관리</h3>
                                    <Link to="/admin/delivery" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-list-status">
                                    <p>배송 준비중: {waitingCount} &nbsp;&nbsp;|배송 중: {deliveringCount} &nbsp;&nbsp;|픽업: {pickUpCount}</p>
                                </div>
                            </div>

                            {/* Sales History Summary */}
                            <div className="hjy-list-section">
                                <div className="hjy-list-header">
                                    <h3>판매내역</h3>
                                    <Link to="/admin/history" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-list-status">
                                    <p>전체: {historyCount} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 총 수익: {totalPriceSum.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Store Management Summary */}
                            <div className="hjy-section">
                                <div className="hjy-header">
                                    <h3>매장 관리</h3>
                                    <Link to="/admin/store" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-brief">
                                    {storeList.map((store) => {
                                        return (
                                            <Link
                                                key={store.storeNum}
                                                to={`/admin/store/modify?storeNum=${store.storeNum}`}
                                                className="hjy-card"
                                                rel="noreferrer noopener"
                                            >
                                                <img 
                                                    id="store_Img" 
                                                    src={`${process.env.REACT_APP_API_URL}/upload/${store.storeImage}`} 
                                                    alt="애플스토어"
                                                />
                                                <div className="hjy-detail">                                                        
                                                    <p>{store.storeName}</p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Product Management Summary */}
                            <div className="hjy-sections">
                                <div className="hjy-header">
                                    <h3>상품 관리</h3>
                                    <Link to="/admin/product" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-brief">
                                    {productList.map((product, index) => {
                                        return (
                                            <div className="hjy-card" key={index}>
                                                <img id="sotre_Img" src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="상품이미지" />
                                                <div className="hjy-detail">                                                        
                                                    <p>{product.productName}</p>
                                                    <p>{product.storageSize}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        {/* //admin_main */}
                    </div>
                    {/* contents */}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminMain;
