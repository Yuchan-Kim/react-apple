    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import '../css/search.css';

    import Header from '../include/Header';
    import Footer from '../include/Footer';

    const storeData = [
    { name: 'Apple Store 명동', address: '서울, 명동 1가', image: 'https://via.placeholder.com/300x200' },
    { name: 'Apple Store 강남', address: '서울, 강남구', image: 'https://via.placeholder.com/300x200' },
    { name: 'Apple Store 가로수길', address: '서울, 가로수길', image: 'https://via.placeholder.com/300x200' },
    { name: 'Apple Store 잠실', address: '서울, 잠실', image: 'https://via.placeholder.com/300x200' },
    { name: 'Apple Store 홍대', address: '서울, 홍대', image: 'https://via.placeholder.com/300x200' },
    { name: 'Apple Store 여의도', address: '서울, 여의도', image: 'https://via.placeholder.com/300x200' },
    { name: 'Apple Store 서초', address: '서울, 서초', image: 'https://via.placeholder.com/300x200' },
    { name: 'Apple Store 광화문', address: '서울, 광화문', image: 'https://via.placeholder.com/300x200' },
    { name: 'Apple Store 수원', address: '수원, 경기', image: 'https://via.placeholder.com/300x200' },
    { name: 'Apple Store 부산', address: '부산, 해운대구', image: 'https://via.placeholder.com/300x200' },
    ];

    const SearchPage = () => {
    const [activeTab, setActiveTab] = useState('products');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
                iPhone
                </li>
                <li
                className={activeTab === 'accessories' ? 'yc-active' : ''}
                onClick={() => handleTabClick('accessories')}
                >
                ACC
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
            </div>

            {/* Dynamic Content Based on Selected Tab */}
            <div className="yc-tab-content">
            {activeTab === 'products' && (
                <div>
                <h2>iPhone 살펴보기</h2>
                <div className="yc-product-grid">
                    <div className="yc-product-item">
                    <img src="https://via.placeholder.com/200" alt="iPhone 15" />
                    <h3>iPhone 15</h3>
                    <p>최신 iPhone 15, 향상된 성능과 카메라.</p>
                    </div>
                    <div className="yc-product-item">
                    <img src="https://via.placeholder.com/200" alt="iPhone 14" />
                    <h3>iPhone 14</h3>
                    <p>iPhone 14, 강력한 성능과 세련된 디자인.</p>
                    </div>
                    <div className="yc-product-item">
                    <img src="https://via.placeholder.com/200" alt="iPhone SE" />
                    <h3>iPhone SE</h3>
                    <p>iPhone SE, 가성비 최고의 스마트폰.</p>
                    </div>
                </div>
                </div>
            )}

            {activeTab === 'accessories' && (
                <div>
                <h2>액세서리</h2>
                <div className="yc-product-grid">
                    <div className="yc-product-item">
                    <img src="https://via.placeholder.com/200" alt="AirPods" />
                    <h3>AirPods</h3>
                    <p>무선 이어폰, 깨끗한 음질.</p>
                    </div>
                    <div className="yc-product-item">
                    <img src="https://via.placeholder.com/200" alt="iPhone Case" />
                    <h3>iPhone 케이스</h3>
                    <p>iPhone 보호를 위한 스타일리시한 케이스.</p>
                    </div>
                </div>
                </div>
            )}

            {activeTab === 'community' && (
                <div>
                <h2>커뮤니티</h2>
                <p>Apple 커뮤니티는 다양한 제품에 대해 토론하고 질문할 수 있는 공간입니다.</p>
                <ul>
                    <li><Link to="/community/support">Apple 지원 커뮤니티로 이동하기</Link></li>
                    <li><Link to="/community/iphone-forum">iPhone 사용자 포럼 보기</Link></li>
                    <li><Link to="/community/events">Apple 이벤트 정보</Link></li>
                </ul>
                </div>
            )}

            {activeTab === 'findStore' && (
                <div>
                <h2>매장 찾기</h2>
                <div className="yc-store-locator">
                    {storeData.map((store, index) => (
                    <div key={index} className="yc-store-item">
                        <img src={store.image} alt={store.name} />
                        <h3>{store.name}</h3>
                        <p>{store.address}</p>
                    </div>
                    ))}
                </div>
                </div>
            )}
            </div>
        </div>
        <Footer />
        </>
    );
    };

    export default SearchPage;
