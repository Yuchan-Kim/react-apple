import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { FaSearch, FaShoppingBag } from 'react-icons/fa';
import '../css/header.css';

const Header = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
    const navigate = useNavigate(); // navigate 훅 추가

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authUser');
        setToken(null);
        setAuthUser(null);
    };

    const handleSearch = (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        if (searchTerm.trim()) {
            navigate(`/search/${searchTerm}`); // 검색어를 포함하여 SearchPage로 이동
        }
    };

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
                            <button className="yc-auth-btn" onClick={handleLogout}>{authUser.userName} 로그아웃</button>
                            <Link to="" className="yc-auth-btn">회원 정보 수정</Link>
                            <FaShoppingBag className="yc-icon" />
                        </>
                    ) : (
                        <>
                            <Link to="/user/loginform" className="yc-auth-btn">로그인</Link>
                            <Link to="/user/joinform" className="yc-auth-btn">회원 가입</Link>
                            <FaShoppingBag className="yc-icon" />
                        </>
                    )}
                </div>
            </div>
            <div className="yc-header-bottom">
                <nav className="yc-nav-links">
                    <Link to="/purchase">iPhone</Link>
                    <Link to="/purchaseAcc">Accessories</Link>
                    <Link to="/community">Community</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
