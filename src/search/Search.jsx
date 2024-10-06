import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/search.css';

import Header from '../include/Header';
import Footer from '../include/Footer';
import axios from 'axios';

const SearchPage = () => {
    const { keyword } = useParams(); // URL 파라미터로 검색어 가져오기
    const [products, setProducts] = useState([]); // 제품 검색 결과 상태
    const [stores, setStores] = useState([]); // 매장 검색 결과 상태
    const [communities, setCommunities] = useState([]); // 커뮤니티 검색 결과 상태
    const [activeTab, setActiveTab] = useState('products'); // 기본 활성 탭을 'products'로 설정

    useEffect(() => {
        // 제품 검색
        axios.get(`http://localhost:9000/api/search/products/${keyword}`)
            .then(response => {
                console.log('제품 응답:', response);
                const data = response.data;
                if (data.result === 'success') {
                    setProducts(data.apiData);
                } else {
                    console.error('제품 검색 결과가 없습니다:', data.message);
                }
            }).catch(error => {
                console.error('제품 검색 오류:', error);
            });

        // 매장 검색
        axios.get(`http://localhost:9000/api/search/stores/${keyword}`)
            .then(response => {
                console.log('매장 응답:', response);
                const data = response.data;
                if (data.result === 'success') {
                    setStores(data.apiData);
                } else {
                    console.error('매장 검색 결과가 없습니다:', data.message);
                }
            }).catch(error => {
                console.error('매장 검색 오류:', error);
            });

        // 커뮤니티 검색
        axios.get(`http://localhost:9000/api/search/communities/${keyword}`)
            .then(response => {
                console.log('커뮤니티 응답:', response);
                const data = response.data;
                if (data.result === 'success') {
                    setCommunities(data.apiData);
                } else {
                    console.error('커뮤니티 검색 결과가 없습니다:', data.message);
                }
            }).catch(error => {
                console.error('커뮤니티 검색 오류:', error);
            });
    }, [keyword]);
    
    const handleTabClick = (tab) => {
        setActiveTab(tab); // 활성 탭 변경
    };

    return (
        <>
            <Header />
            <div className="wrap">
                {/* Tab Navigation Menu */}
                <div className="yc-tabs-menu">
                    <ul>
                        <li
                            className={activeTab === 'products' ? 'yc-active' : ''}
                            onClick={() => handleTabClick('products')}
                        >
                            제품
                        </li>
                        <li
                            className={activeTab === 'community' ? 'yc-active' : ''}
                            onClick={() => handleTabClick('community')}
                        >
                            커뮤니티
                        </li>
                        <li
                            className={activeTab === 'findStore' ? 'yc-active' : ''}
                            onClick={() => handleTabClick('findStore')}
                        >
                            매장 찾기
                        </li>
                    </ul>
                    <h2>검색 결과: "{keyword}"</h2>
                </div>

                {/* Dynamic Content Based on Selected Tab */}
                <div className="yc-tab-content">
                    {activeTab === 'products' && (
                        <div className="yc-product-grid">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div key={product.productNum} className="yc-product-item">
                                        <img src={product.mainImages || "https://via.placeholder.com/200"} alt={product.productName} />
                                        <h3>{product.productName}</h3>
                                        <p>가격: {product.productPrice} 원</p>
                                        <Link to={`/product/${product.productNum}`}>자세히 보기</Link>
                                    </div>
                                ))
                            ) : (
                                <p>제품 검색 결과가 없습니다.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'community' && (
                        <div>
                            {communities.length > 0 ? (
                                communities.map((community) => (
                                    <div key={community.boardNum} className="community-item">
                                        <h3>{community.boardTitle}</h3>
                                        <p>조회수: {community.boardViews} | 날짜: {community.boardDate}</p>
                                        <Link to={`/community/${community.boardNum}`}>자세히 보기</Link>
                                    </div>
                                ))
                            ) : (
                                <p>커뮤니티 검색 결과가 없습니다.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'findStore' && (
                        <div className="yc-store-locator">
                            {stores.length > 0 ? (
                                stores.map((store) => (
                                    <div key={store.storeNum} className="yc-store-item">
                                        <img src={store.storeImage || "https://via.placeholder.com/200"} alt={store.storeName} />
                                        <h3>{store.storeName}</h3>
                                        <p>{store.storeaddress}</p>
                                        <Link to={`/store/${store.storeNum}`}>자세히 보기</Link>
                                    </div>
                                ))
                            ) : (
                                <p>매장 검색 결과가 없습니다.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SearchPage;
