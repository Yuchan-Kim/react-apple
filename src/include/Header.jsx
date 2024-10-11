import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingBag } from 'react-icons/fa';
import axios from 'axios';
import '../css/header.css';

const Header = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const [searchTerm, setSearchTerm] = useState(''); 
    const [isCartOpen, setIsCartOpen] = useState(false); 
    const [cartList, setCartList] = useState([]); 
    const dropdownRef = useRef(null);

    const navigate = useNavigate(); 

    //카트로 이동
    const handleUsercartmove = () => {
        navigate(`/user/cart`);
    };

    //관심상품 이동
    const handleWishlistmove = () => {
        navigate(`/user/wishlist`);
    };

    //마이페이지 이동
    const handleUMypagemove = () => {
        navigate(`/user/mypage`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authUser');
        setToken(null);
        setAuthUser(null);
    };

    const handleSearch = (e) => {
        e.preventDefault(); 
        if (searchTerm.trim()) {
            navigate(`/search/${searchTerm}`); 
        }
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsCartOpen(false);
        }
    };

    /*---유저 카트리스트 가져오기---*/
    const getCartList = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("토큰이 없습니다. 로그인하세요.");
            return; 
        }

        axios({
            method: 'get', 	
            url: `${process.env.REACT_APP_API_URL}/api/user/cart`,
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
            responseType: 'json' 
        }).then(response => {
            if (response.data.result === "success") {
                setCartList(response.data.apiData); 
            } else {
                console.log(response.data.message); 
            }
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        getCartList(); 
    }, []);

    return (
        <header className="yc-apple-header">
            <div className="yc-header-top">
                <div className="yc-logo">
                    <Link to="/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                    </Link>
                </div>
                <form className="yc-search-bar" onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="검색" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <button className="yc-search-btn" type="submit">
                        <FaSearch />
                    </button>
                </form>
                <div className="yc-auth-cart-icons">
                    {token !== null ? (
                        <>
                            <button className="yc-auth-btn" onClick={handleLogout}>로그아웃</button>
                            <div className="yc-icon-container" ref={dropdownRef}>
                                <FaShoppingBag className="yc-icon" onClick={toggleCart} />
                                {isCartOpen && (
                                    <div className="hd-cart-dropdown">
                                        <div>
                                            <h2>장바구니</h2>
                                            <div className="hd-cart-items">
                                                {cartList.slice(0, 4).map((cartVo, index) => (
                                                    <div key={index} className="hd-cart-item">
                                                        <img src={cartVo.imageSavedName} alt={cartVo.imageSavedName} />
                                                        <p>{cartVo.productName} {cartVo.storageSize} {cartVo.colorName} </p>
                                                    </div>
                                                ))}
                                                {cartList.length > 4 && (
                                                    <div className="hd-more-items">
                                                        <p>+ {cartList.length - 4}개의 상품 더 보기</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='profile-tag'>
                                                <div className='profile-tag-title'><h4>내 프로필</h4></div>
                                                <ul>
                                                    <li><button onClick={handleWishlistmove}>관심상품</button></li>
                                                    <li><button onClick={handleUMypagemove}>my 페이지</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="hd-checkout-button">
                                            <button onClick={handleUsercartmove}>장바구니 확인</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/user/loginform" className="yc-auth-btn">로그인</Link>
                            <Link to="/user/joinform" className="yc-auth-btn">회원 가입</Link>
                            <div className="yc-icon-container" ref={dropdownRef}>
                                <FaShoppingBag className="yc-icon" onClick={toggleCart} />
                                {isCartOpen && (
                                    <div className="hd-cart-dropdown">
                                        <div className="hd-cart-items">
                                            <p>로그인 후 장바구니를 확인하세요.</p>
                                        </div>
                                        <Link to="/user/cart" className="hd-checkout-button">장바구니 확인</Link>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="yc-header-bottom">
                <nav className="yc-nav-links">
                    <Link to="/mainlist">Product</Link>
                    <Link to="/community">Community</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
