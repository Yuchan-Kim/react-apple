import React from 'react';
import { Link } from 'react-router-dom';

// css import
import '../css/Wishlist.css'; // CSS 파일 import
import Header from '../include/Header'; 
import Footer from '../include/Footer';


const Wishlist = () => {
  return (
    <>
    <Header/>
    <div className='wrap'>
    <div className="jm-wishlist-container">
      {/* 제목 섹션 */}
      <header>
        <h1 className="jm-title">관심 목록</h1>
        <p className="jm-description">
          이전에 저장해둔 제품을 계속 쇼핑하세요. 관심 제품을 친구나 가족, 그리고 
          <strong> Apple </strong> 스페셜리스트와 공유하고 꼭 맞는 제품을 찾아보세요.
        </p>
      </header>

      {/* 관심 제품 섹션 */}
      <section className="jm-wishlist-section">
        <div className="jm-section-header">
          <h2>관심 제품</h2>
          <Link to="#" className="jm-edit-link">편집</Link>
        </div>

        <div className="jm-wish-item">
          {/* 반복되는 제품 아이템 */}
          <div className="jm-product-item">
            <div className="jm-product-item-img">
              <img src="https://via.placeholder.com/150" alt='item-img'/>
            </div>
            <span>iphone 16 pro</span>
        </div>

        <div className="jm-product-item">
            <div className="jm-product-item-img">
              <img src="https://via.placeholder.com/150" alt='item-img'/>
            </div>
            <span>iphone 16 pro</span>
        </div>

        <div className="jm-product-item">
            <div className="jm-product-item-img">
              <img src="https://via.placeholder.com/150" alt='item-img'/>
            </div>
            <span>iphone 16 pro</span>
        </div>

        <div className="jm-product-item">
            <div className="jm-product-item-img">
              <img src="https://via.placeholder.com/150" alt='item-img'/>
            </div>
            <span>iphone 16 pro</span>
        </div>

        <div className="jm-product-item">
            <div className="jm-product-item-img">
              <img src="https://via.placeholder.com/150" alt='item-img'/>
            </div>
            <span>iphone 16 pro</span>
        </div>

        <div className="jm-product-item">
            <div className="jm-product-item-img">
              <img src="https://via.placeholder.com/150" alt='item-img'/>
            </div>
            <span>iphone 16 pro</span>
        </div>
        {/* 반복 끝 */}
          
        </div>

        <div className="jm-wishlist-info">
          <p>2개 항목</p>
          <a href="/user/cart" className="jm-detail-link">장바구니로 이동</a>
        </div>
      </section>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Wishlist;
