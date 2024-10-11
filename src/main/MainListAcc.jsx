    import React, { useState, useEffect } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import axios from 'axios';

    import Header from '../include/Header';
    import Footer from '../include/Footer';



    const MainListAcc = () => {
    
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        const [acc, setAcc] = useState([]);
        const navigate = useNavigate();

        

        // Handle modal toggle classes
        useEffect(() => {
            axios({
                method: 'get',
                url: `http://${process.env.REACT_APP_API_URL}/api/main/products/acc`,
                responseType: 'json',
            })
            .then(response => {
                if (Array.isArray(response.data.apiData)) {
                    setAcc(response.data.apiData);
                } else {
                    console.error('API response for acc is not an array', response.data);
                    setAcc([]);  
                }
            })
            .catch(error => {
                console.error('Error fetching acc products:', error);
                setError('Failed to fetch acc products');
            });
        }, );

    
        // Function to navigate to purchase page
        const handleProductClick = (productDetailNum) => {
            navigate(`/purchaseAcc/${productDetailNum}`);
        };

        return (
            <>
                <Header />
                <div className="wrap">
                    {/* Main Banner */}
                    <div className="yc-main-banner">
                        <h1>ACC 쇼핑하기</h1>
                        <p>가장 최신의 Apple만의 악세사리를 만나보세요.</p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="yc-product-navigation">
                        <Link to="/models">모든 모델</Link>
                        <Link to="/discounts">각종 할인 방법</Link>
                        <Link to="/guide">쇼핑 안내</Link>
                        <Link to="/accessories">액세서리</Link>
                        <Link to="/support">설정 및 지원</Link>
                        <Link to="/experience">ACC 경험</Link>
                        <Link to="/special-discounts">특별 할인</Link>
                    </nav>

                    {/* Category Section */}
                    <div className="yc-category-section">
                        {/* Show loading or error message */}
                        { error ? (
                            <p>{error}</p>
                        ) : (
                            <>
                                {/* Category 1: PRO & PRO MAX */}
                                <div className="yc-category">
                                    <h2>ACC</h2>
                                    <div className="yc-scroll-container">
                                        <div className="yc-product-list">
                                            {acc.map(product => (
                                                <div
                                                    className="yc-product-card"
                                                    key={product.productDetailNum}
                                                    onClick={() => handleProductClick(product.productDetailNum)}  
                                                >
                                                    {product.productName.includes('16') && <span className="yc-new-label">NEW</span>}
                                                    <h3>{product.productName}</h3>
                                                    <img src={product.imageSavedName || "https://via.placeholder.com/300"} alt={product.productName} />

                                                    <div className="yc-price-button-container">
                                                        <p>{(product.productPrice).toLocaleString()}원 부터</p>
                                                        <button className="yc-buy-button">구입하기</button>
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

                
            </>
        );
    };

    export default MainListAcc;

