// src/Header.jsx
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingBag } from 'react-icons/fa';

// CSS
import '../css/header.css';

const Header = () => {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  console.log(authUser);

  const handleLogout = ()=>{
    console.log('로그아웃');

    //로컬스토리지에 token 삭제
    localStorage.removeItem('token');
    //로컬스토리지에 authUser 삭제
    localStorage.removeItem('authUser');
    
    //화면반영을 위한 상태값 변경
    setToken(null);
    setAuthUser(null);
    
};

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

        {
          (token !== null)?(
            <div className="yc-auth-cart-icons">
              <Link to="/" className="yc-auth-btn">로그인</Link>
              <Link to="/" className="yc-auth-btn">회원 가입</Link>
              <FaShoppingBag className="yc-icon" />
            </div>
          ):(
            <div className="yc-auth-cart-icons">
              <Link to="/" className="yc-auth-btn">로그인</Link>
              <Link to="/" className="yc-auth-btn">회원 가입</Link>
              <FaShoppingBag className="yc-icon" />
            </div>
          )
        }
      </div>
      
      {/* 하단 헤더 */}
      <div className="yc-header-bottom">
        <nav className="yc-nav-links">
          <Link to="/">iPhone</Link>
          <Link to="/">Accessories</Link>
          <Link to="/community">Community</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
