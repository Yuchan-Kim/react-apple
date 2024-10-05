// src/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingBag } from 'react-icons/fa';

// CSS
import '../css/header.css';

const Header = () => {
  return (
    <header className="yc-apple-header">
      {/* 상단 헤더 */}
      <div className="yc-header-top">
        <div className="yc-logo">
          <Link to="/">
            {/* 실제 애플 로고 이미지 사용 */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
          </Link>
        </div>
        <div className="yc-search-bar">
          <input type="text" placeholder="검색" />
          <button className="yc-search-btn">
            <FaSearch />
          </button>
        </div>
        <div className="yc-auth-cart-icons">
          <Link to="/" className="yc-auth-btn">로그인</Link>
          <Link to="/" className="yc-auth-btn">회원 가입</Link>
          <FaShoppingBag className="yc-icon" />
        </div>
      </div>
      
      {/* 하단 헤더 */}
      <div className="yc-header-bottom">
        <nav className="yc-nav-links">
          <Link to="/">iPhone</Link>
          <Link to="/">Accessories</Link>
          <Link to="/">Community</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
