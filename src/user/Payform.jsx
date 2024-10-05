import React, { useState } from 'react';

//css imports
import '../css/Reset.css';
import '../css/Payform.css';
import Header from '../include/Header'; 
import Footer from '../include/Footer';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const [viewPickup, setViewPickup] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null); // State to track selected store

  const handleDeliveryClick = () => {
    setViewPickup(false); // Go to delivery view
  };

  const handlePickupClick = () => {
    setViewPickup(true); // Go to pickup view
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store); // Set the selected store
  };

  return (
    <>
      <Header/>
      <div className="wrap">
        <div className="jm-checkout-page">
          {/* Order Summary */}
          <div id="jm-order-title">
            <h2>결제</h2>
            <span id="jm-order-summary">주문 요약 정보 표시: ₩1,509,000</span>
          </div>

          {/* Main Content */}
          <main className="jm-checkout-content">
            {!viewPickup ? (
              <>
                {/* Delivery View */}
                <h1 className="jm-checkout-title">주문하신 제품을 어떻게 받으시겠습니까?</h1>

                {/* Delivery Options */}
                <div className="jm-delivery-options">
                  <button className="jm-delivery-btn active" onClick={handleDeliveryClick}>
                  <div class="rc-segmented-control-icon"><svg class="as-svgicon-rtl-mirrored as-svgicon as-svgicon-boxtruck as-svgicon-reduced as-svgicon-boxtruckreduced" viewBox="0 0 25 25" role="img" aria-hidden="true" width="25px" height="25px"><path fill="none" d="M0 0h25v25H0z"></path><path fill="#1d1d1f" d="m23.482 12.847-2.92-3.209A1.947 1.947 0 0 0 18.985 9H17V6.495a2.5 2.5 0 0 0-2.5-2.5h-11a2.5 2.5 0 0 0-2.5 2.5v9.75a2.5 2.5 0 0 0 2.5 2.5h.548A2.746 2.746 0 0 0 6.75 21.02 2.618 2.618 0 0 0 9.422 19h6.681a2.744 2.744 0 0 0 5.347-.23h.735A1.656 1.656 0 0 0 24 16.98v-2.808a1.937 1.937 0 0 0-.518-1.325ZM8.426 18.745a1.74 1.74 0 0 1-3.352 0 1.577 1.577 0 0 1 .015-1 1.738 1.738 0 0 1 3.322 0 1.578 1.578 0 0 1 .015 1ZM9.447 18a2.726 2.726 0 0 0-5.394-.255H3.5a1.502 1.502 0 0 1-1.5-1.5v-9.75a1.502 1.502 0 0 1 1.5-1.5h11a1.502 1.502 0 0 1 1.5 1.5V18Zm10.972.77a1.738 1.738 0 0 1-3.337 0 1.573 1.573 0 0 1 0-1 1.742 1.742 0 1 1 3.337 1ZM23 16.98c0 .569-.229.79-.815.79h-.735A2.73 2.73 0 0 0 17 16.165V10h1.986a.976.976 0 0 1 .838.314l2.927 3.214a.95.95 0 0 1 .249.644Zm-1.324-3.36a.512.512 0 0 1 .174.38h-3.306a.499.499 0 0 1-.544-.528V11h1.073a.76.76 0 0 1 .594.268Z"></path></svg></div>
                    배송을 원합니다
                  </button>
                  <button className="jm-delivery-btn" onClick={handlePickupClick}>
                  <div class="rc-segmented-control-icon"><svg viewBox="0 0 35 35" class="as-svgicon as-svgicon-applestorepickup as-svgicon-base as-svgicon-applestorepickupbase" role="img" aria-hidden="true" width="35px" height="35px"><path fill="none" d="M0 0h35v35H0z"></path><path d="M25.5 7h-2.529a5.493 5.493 0 0 0-10.942 0H9.5A3.5 3.5 0 0 0 6 10.5v15A3.5 3.5 0 0 0 9.5 29h16a3.5 3.5 0 0 0 3.5-3.5v-15A3.5 3.5 0 0 0 25.5 7Zm-8-4a4.488 4.488 0 0 1 4.446 4h-8.892A4.488 4.488 0 0 1 17.5 3ZM28 25.5a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 7 25.5v-15A2.5 2.5 0 0 1 9.5 8h16a2.5 2.5 0 0 1 2.5 2.5Z"></path><path d="M20.272 17.075a2.326 2.326 0 0 1 1.078-1.94 2.348 2.348 0 0 0-2-1c-.759 0-1.375.463-1.782.463s-.968-.441-1.65-.441a2.719 2.719 0 0 0-2.541 3.021 6.311 6.311 0 0 0 1.056 3.363c.506.717.946 1.29 1.584 1.29s.9-.419 1.672-.419c.8 0 .968.408 1.661.408s1.155-.628 1.584-1.246a4.733 4.733 0 0 0 .693-1.444 2.215 2.215 0 0 1-1.355-2.055ZM17.621 14.021A1.966 1.966 0 0 0 19 13.294a2.328 2.328 0 0 0 .528-1.422 1.076 1.076 0 0 0-.011-.2 2.19 2.19 0 0 0-1.485.772 2.26 2.26 0 0 0-.561 1.378c0 .077.011.154.011.187.04.001.084.012.139.012Z"></path></svg></div>
                    직접 픽업하겠습니다
                  </button>
                </div>

                {/* Delivery Address */}
                <div className="jm-delivery-address">
                  <span>배송지: 54920</span>
                </div>

                {/* Product Summary */}
                <div className="jm-product-summary">
                  <ul>
                    {/* Repeated Product List */}
                    {[1, 2, 3].map((item, index) => (
                      <li key={index} className="jm-product-details">
                        <div className="jm-product-img">
                          <img src="../images/iphone-test.png" alt="product" />
                        </div>
                        <div className="jm-product-info">
                          <p>iPhone 15 Plus 128GB</p>
                          <p>색상: 블랙</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shipping Info */}
                <div className="jm-shipping-bottom">
                  <div className="jm-shipping-info">
                    <div className='jm-d-date-box'>
                      <p className='jm-d-date'>배송: 금 2024/10/04</p>
                      <p className='jm-d-date-p'>표준배송</p>
                    </div>
                    <div>
                      <p>무료</p>
                    </div>
                  </div>
                  <div className='jm-shipping-massage'>
                    <div className='jm-massage-box'>
                      <div className='jm-massage-title'>
                        <span> 유의해야 할 점:</span>
                      </div>
                      <div className='jm-massage-text'>
                        <ul>
                          <li>배송업체에서 배송 시 서명을 받을 수도 있습니다.</li>
                          <li>표준 배송은 월요일-금요일 오전 8:00-오후8:00에 이루어집니다.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address Button */}
                <div className="jm-continue-button">
                  <button>배송 주소까지 계속</button>
                </div>
              </>
            ) : (
              <>
                {/* Pickup Store Selection View */}
                <h1 className="jm-checkout-title">주문하신 제품을 어떻게 받으시겠습니까?</h1>

                {/* Delivery Options */}
                <div className="jm-delivery-options">
                  <button className="jm-delivery-btn" onClick={handleDeliveryClick}>
                  <div class="rc-segmented-control-icon"><svg class="as-svgicon-rtl-mirrored as-svgicon as-svgicon-boxtruck as-svgicon-reduced as-svgicon-boxtruckreduced" viewBox="0 0 25 25" role="img" aria-hidden="true" width="25px" height="25px"><path fill="none" d="M0 0h25v25H0z"></path><path fill="#1d1d1f" d="m23.482 12.847-2.92-3.209A1.947 1.947 0 0 0 18.985 9H17V6.495a2.5 2.5 0 0 0-2.5-2.5h-11a2.5 2.5 0 0 0-2.5 2.5v9.75a2.5 2.5 0 0 0 2.5 2.5h.548A2.746 2.746 0 0 0 6.75 21.02 2.618 2.618 0 0 0 9.422 19h6.681a2.744 2.744 0 0 0 5.347-.23h.735A1.656 1.656 0 0 0 24 16.98v-2.808a1.937 1.937 0 0 0-.518-1.325ZM8.426 18.745a1.74 1.74 0 0 1-3.352 0 1.577 1.577 0 0 1 .015-1 1.738 1.738 0 0 1 3.322 0 1.578 1.578 0 0 1 .015 1ZM9.447 18a2.726 2.726 0 0 0-5.394-.255H3.5a1.502 1.502 0 0 1-1.5-1.5v-9.75a1.502 1.502 0 0 1 1.5-1.5h11a1.502 1.502 0 0 1 1.5 1.5V18Zm10.972.77a1.738 1.738 0 0 1-3.337 0 1.573 1.573 0 0 1 0-1 1.742 1.742 0 1 1 3.337 1ZM23 16.98c0 .569-.229.79-.815.79h-.735A2.73 2.73 0 0 0 17 16.165V10h1.986a.976.976 0 0 1 .838.314l2.927 3.214a.95.95 0 0 1 .249.644Zm-1.324-3.36a.512.512 0 0 1 .174.38h-3.306a.499.499 0 0 1-.544-.528V11h1.073a.76.76 0 0 1 .594.268Z"></path></svg></div>
                    배송을 원합니다
                  </button>
                  <button className="jm-delivery-btn active" onClick={handlePickupClick}>
                  <div class="rc-segmented-control-icon"><svg viewBox="0 0 35 35" class="as-svgicon as-svgicon-applestorepickup as-svgicon-base as-svgicon-applestorepickupbase" role="img" aria-hidden="true" width="35px" height="35px"><path fill="none" d="M0 0h35v35H0z"></path><path d="M25.5 7h-2.529a5.493 5.493 0 0 0-10.942 0H9.5A3.5 3.5 0 0 0 6 10.5v15A3.5 3.5 0 0 0 9.5 29h16a3.5 3.5 0 0 0 3.5-3.5v-15A3.5 3.5 0 0 0 25.5 7Zm-8-4a4.488 4.488 0 0 1 4.446 4h-8.892A4.488 4.488 0 0 1 17.5 3ZM28 25.5a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 7 25.5v-15A2.5 2.5 0 0 1 9.5 8h16a2.5 2.5 0 0 1 2.5 2.5Z"></path><path d="M20.272 17.075a2.326 2.326 0 0 1 1.078-1.94 2.348 2.348 0 0 0-2-1c-.759 0-1.375.463-1.782.463s-.968-.441-1.65-.441a2.719 2.719 0 0 0-2.541 3.021 6.311 6.311 0 0 0 1.056 3.363c.506.717.946 1.29 1.584 1.29s.9-.419 1.672-.419c.8 0 .968.408 1.661.408s1.155-.628 1.584-1.246a4.733 4.733 0 0 0 .693-1.444 2.215 2.215 0 0 1-1.355-2.055ZM17.621 14.021A1.966 1.966 0 0 0 19 13.294a2.328 2.328 0 0 0 .528-1.422 1.076 1.076 0 0 0-.011-.2 2.19 2.19 0 0 0-1.485.772 2.26 2.26 0 0 0-.561 1.378c0 .077.011.154.011.187.04.001.084.012.139.012Z"></path></svg></div>
                    직접 픽업하겠습니다
                  </button>
                </div>

                {/* Pickup Store Selector */}
                <h2 className="jm-pickup-title">픽업 매장 선택:</h2>
                <div className="jm-pickup-store-selector">
                <div className="jm-pickup-store-list">
                  {[1, 2, 3, 4, 5].map((store) => (
                    <div
                      id='jm-pickup-store'
                      key={store}
                      className={`jm-pickup-store ${selectedStore === store ? 'selected' : ''}`}
                      onClick={() => handleStoreClick(store)}
                    >
                      <div className="jm-pickup-store-details">
                        <span class="map-ping">{store}</span>
                        <p>Apple Store {store}</p>
                      </div>
                      <div>
                        <span className="jm-available">가능 오늘</span>
                        <p>매장 내 픽업</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='jm-pickup-store-map'>
                    <img src="../images/map.jpg" alt="store-map" />
                </div>
                </div>

                {/* Continue Button */}
                <div className="jm-continue-button">
                  <button>픽업 세부 정보 페이지로 이동</button>
                </div>
              </>
            )}

            {/* Help Section */}
            <div className="jm-help-section">
              <p>도움이 더 필요하신가요? <Link to="https://support.apple.com/ko-kr">고객지원</Link> 또는 080-330-8877 번호로 문의하세요.</p>
            </div>

            {/* FAQ Section */}
            <div className="jm-faq-section">
              <h2>배송 및 픽업 관련 FAQ</h2>
            </div>
          </main>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CheckoutPage;
