import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

import '../css/mainList.css';

const MainList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);  // State to track errors
    const [loading, setLoading] = useState(true);  // State to handle loading

    // Handle modal open
    const handleModalOpen = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Handle modal close
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // Handle modal toggle classes
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('yc-modal-open');
        } else {
            document.body.classList.remove('yc-modal-open');
        }
    }, [isModalOpen]);

    // Fetching product data from API
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:9000/api/main/mainproducts',
            responseType: 'json',
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                setProducts(response.data);  // Set the products only if the response is an array
            } else {
                console.error('API response is not an array', response.data);
                setProducts([]);  // Fallback to empty array if the response isn't an array
            }
            setLoading(false);  // Loading completed
        })
        .catch(error => {
            console.error(error);
            setError('Failed to fetch products');  // Set error message
            setLoading(false);  // Stop loading on error
        });
    }, []);  

    return (
        <>
            <Header />
            <div className="wrap">
                {/* Main Banner */}
                <div className="yc-main-banner">
                    <h1>iPhone 쇼핑하기</h1>
                    <p>가장 최신의 iPhone을 만나보세요.</p>
                </div>

                {/* Navigation Links */}
                <nav className="yc-product-navigation">
                    <Link to="/models">모든 모델</Link>
                    <Link to="/discounts">각종 할인 방법</Link>
                    <Link to="/guide">쇼핑 안내</Link>
                    <Link to="/accessories">액세서리</Link>
                    <Link to="/support">설정 및 지원</Link>
                    <Link to="/experience">iPhone 경험</Link>
                    <Link to="/special-discounts">특별 할인</Link>
                </nav>

                {/* Category Section */}
                <div className="yc-category-section">
                    {/* Show loading or error message */}
                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                            {/* Category 1: PRO & PRO MAX */}
                            <div className="yc-category">
                                <h2>PRO & PRO MAX</h2>
                                <div className="yc-scroll-container">
                                    <div className="yc-product-list">
                                        {products.map((product, index) => (
                                            <div className="yc-product-card" key={index}>
                                                <span className="yc-new-label">NEW</span>
                                                <h3>{product.name}</h3>
                                                <img src={product.image} alt={product.name} />
                                                
                                                {/* Color options */}
                                                <div className="yc-color-selection">
                                                    {product.colors.map((color, index) => (
                                                        <span
                                                            key={index}
                                                            className="yc-color-dot"
                                                            style={{ backgroundColor: color }}
                                                        ></span>
                                                    ))}
                                                </div>

                                                <div className="yc-price-button-container">
                                                    <p>{product.price}부터</p>
                                                    <button className="yc-buy-button">구입하기</button>
                                                </div>

                                                <div className="yc-hover-button-container">
                                                    <button
                                                        onClick={() => handleModalOpen(product)}
                                                        className="yc-detail-button"
                                                    >
                                                        제품 자세히 살펴보기
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Category 2: 보급형 */}
                            <div className="yc-category">
                                <h2>BASIC</h2>
                                <div className="yc-scroll-container">
                                    <div className="yc-product-list">
                                        {products.map((product, index) => (
                                            <div className="yc-product-card" key={index}>
                                                <span className="yc-new-label">NEW</span>
                                                <h3>{product.name}</h3>
                                                <img src={product.image} alt={product.name} />
                                                
                                                {/* Color options */}
                                                <div className="yc-color-selection">
                                                    {product.colors.map((color, index) => (
                                                        <span
                                                            key={index}
                                                            className="yc-color-dot"
                                                            style={{ backgroundColor: color }}
                                                        ></span>
                                                    ))}
                                                </div>

                                                <div className="yc-price-button-container">
                                                    <p>{product.price}부터</p>
                                                    <button className="yc-buy-button">구입하기</button>
                                                </div>

                                                <div className="yc-hover-button-container">
                                                    <button
                                                        onClick={() => handleModalOpen(product)}
                                                        className="yc-detail-button"
                                                    >
                                                        제품 자세히 살펴보기
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Category 3: 이전 모델 */}
                            <div className="yc-category">
                                <h2>SPECIAL EDITION</h2>
                                <div className="yc-scroll-container">
                                    <div className="yc-product-list">
                                        {products.map((product, index) => (
                                            <div className="yc-product-card" key={index}>
                                                <span className="yc-new-label">NEW</span>
                                                <h3>{product.name}</h3>
                                                <img src={product.image} alt={product.name} />
                                                
                                                {/* Color options */}
                                                <div className="yc-color-selection">
                                                    {product.colors.map((color, index) => (
                                                        <span
                                                            key={index}
                                                            className="yc-color-dot"
                                                            style={{ backgroundColor: color }}
                                                        ></span>
                                                    ))}
                                                </div>

                                                <div className="yc-price-button-container">
                                                    <p>{product.price}부터</p>
                                                    <button className="yc-buy-button">구입하기</button>
                                                </div>

                                                <div className="yc-hover-button-container">
                                                    <button
                                                        onClick={() => handleModalOpen(product)}
                                                        className="yc-detail-button"
                                                    >
                                                        제품 자세히 살펴보기
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Category 4: ACC */}
                            <div className="yc-category">
                                <h2>ACC</h2>
                                <div className="yc-scroll-container">
                                    <div className="yc-product-list">
                                        {products.map((product, index) => (
                                            <div className="yc-product-card" key={index}>
                                                <span className="yc-new-label">NEW</span>
                                                <h3>{product.name}</h3>
                                                <img src={product.image} alt={product.name} />
                                                
                                                {/* Color options */}
                                                <div className="yc-color-selection">
                                                    {product.colors.map((color, index) => (
                                                        <span
                                                            key={index}
                                                            className="yc-color-dot"
                                                            style={{ backgroundColor: color }}
                                                        ></span>
                                                    ))}
                                                </div>

                                                <div className="yc-price-button-container">
                                                    <p>{product.price}부터</p>
                                                    <button className="yc-buy-button">구입하기</button>
                                                </div>

                                                <div className="yc-hover-button-container">
                                                    <button
                                                        onClick={() => handleModalOpen(product)}
                                                        className="yc-detail-button"
                                                    >
                                                        제품 자세히 살펴보기
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Footer />

            {/* Modal */}
            {isModalOpen && selectedProduct && (
                <div className="yc-modal-overlay">
                    <div className="yc-modal-wrapper">
                        <span className="yc-close-button" onClick={handleModalClose}>&times;</span>
                        <div className="yc-modal-container">
                            <div className="yc-modal-image-slider">
                                <img src={selectedProduct.image} alt={selectedProduct.name} />
                                <div className="yc-image-indicator">
                                    <span className="yc-dot active"></span>
                                    <span className="yc-dot"></span>
                                    <span className="yc-dot"></span>
                                </div>
                                <p className="yc-image-caption">3개 색상으로 제공</p>
                            </div>
                            <div className="yc-modal-details">
                                <h2>{selectedProduct.name}</h2>
                                <div className="yc-price-buy-container">
                                    <p className="yc-price">{selectedProduct.price}</p>
                                    <button className="yc-buy-button">구입하기</button>
                                </div>
                                <ul className="yc-features">
                                    <li><img src="/path/to/icon.png" alt="icon" /> 11.9cm Retina HD 디스플레이</li>
                                    <li><img src="/path/to/icon.png" alt="icon" /> A15 Bionic 칩 탑재</li>
                                    <li><img src="/path/to/icon.png" alt="icon" /> 고속 다운로드 및 고화질 스트리밍이 가능한 5G</li>
                                    <li><img src="/path/to/icon.png" alt="icon" /> 더 스마트한 카메라</li>
                                    <li><img src="/path/to/icon.png" alt="icon" /> Touch ID 탑재 홈 버튼</li>
                                </ul>
                                
                                <Link to="#" className="yc-learn-more-link">iPhone SE 더 살펴보기</Link>
                            </div>
                        </div>
                        <div className="yc-modal-footer">
                            <div className="yc-modal-footer-section">
                                <p><img src="/path/to/icon1.png" alt="icon" /> 할부 방식: 무이자 구매</p>
                            </div>
                            <div className="yc-modal-footer-section">
                                <p><img src="/path/to/icon3.png" alt="icon" /> 무료 익일 배송: 오후 3시 이전 주문 시</p>
                            </div>
                            <div className="yc-modal-footer-section">
                                <p><img src="/path/to/icon3.png" alt="icon" /> 무료 익일 배송: 오후 3시 이전 주문 시</p>
                            </div>
                        </div>
                    </div>
                    <div className="yc-terms-section">
                        <p>* 이용 약관</p>
                        <p>위 할부 서비스는 Apple 온라인 스토어에서만 이용 가능합니다. </p>
                        <p>할부 체계는 신용 카드 발급사에서 제공합니다. 모든 할부 구입은 신용 카드 발급사의 승인을 받아야 합니다. 기타 조건은 은행 웹사이트를 참고하세요.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainList;
