import React from 'react';
import { Link } from 'react-router-dom';

import '../css/purchaseAcc.css';
import Header from '../include/Header';
import Footer from '../include/Footer';

function PurchaseACC() {
  return (
    <>
      <Header />

      <div className="wrap">
        {/* ACC Purchase Header Section */}
        <section className="yc-acc-purchase-section">
          <div className="yc-acc-purchase-header">
            <span className="yc-acc-new-badge">New</span>
            <h1>ACC 구입하기</h1>
          </div>
        </section>

        {/* Model Images Section */}
        <section className="yc-acc-model-images-section">
          <div className="yc-acc-model-images">
            <img src="https://via.placeholder.com/2000x1500" alt="ACC" className="yc-acc-phone-image" />
          </div>

          {/* Selection Section */}
          <div className="yc-acc-selection-section">
            
            {/* AppleCare+ Section */}
            <div className="yc-acc-applecare-section">
              <h2>AppleCare+ 보증. <br />새로 구입한 ACC를 보호하세요.</h2>
              <div className="yc-acc-applecare-options">
                <div className="yc-acc-applecare-option">
                  <span className="yc-acc-applecare-logo">
                    <span className="yc-acc-apple-logo"></span>
                    <span className="yc-acc-applecare-text"> AppleCare+</span>
                  </span>
                  <p>우발적인 손상에 대한 횟수 제한 없는 수리*</p>
                  <p>Apple 정품 부품으로 진행되는 Apple 인증 수리 서비스</p>
                  <p>Apple 전문가의 우선 지원</p>
                </div>
                <div className="yc-acc-applecare-option">
                  <p>AppleCare+ 보증 추가 안 함</p>
                </div>
              </div>
            </div>

            {/* Price and Buttons */}
            <div className="yc-acc-price-section">
              <p className="yc-acc-price">₩250,000부터</p>
              <button className="yc-acc-cart-button">장바구니에 담기</button>
              <button className="yc-acc-wishlist-button">관심목록에 담기</button>
            </div>

          </div>
        </section>

        {/* Recommended Accessories Section */}
        <section className="yc-recommended-accessories">
          <h2 className="yc-section-title">마음에 들 만한 액세서리</h2>
          <div className="yc-accessory-list">
            <div className="yc-accessory-item">
              <img
                src="https://via.placeholder.com/100"
                alt="20W USB-C Adapter"
                className="yc-accessory-image"
              />
              <p>20W USB-C 전원 어댑터</p>
              <p>₩28,000</p>
              <button className="yc-add-to-cart-button">장바구니에 담기</button>
            </div>
            <div className="yc-accessory-item">
              <img
                src="https://via.placeholder.com/100"
                alt="MagSafe Case"
                className="yc-accessory-image"
              />
              <p>MagSafe형 iPhone 15 Plus 투명 케이스</p>
              <p>₩69,000</p>
              <button className="yc-add-to-cart-button">장바구니에 담기</button>
            </div>
            <div className="yc-accessory-item">
              <img
                src="https://via.placeholder.com/100"
                alt="USB-C Lightning Adapter"
                className="yc-accessory-image"
              />
              <p>USB-C-Lightning 어댑터</p>
              <p>₩45,000</p>
              <button className="yc-add-to-cart-button">장바구니에 담기</button>
            </div>
          </div>
          <Link to="" className="yc-more-products-button">더 많은 제품</Link>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default PurchaseACC;
