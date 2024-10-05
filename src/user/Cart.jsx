import React from 'react';
import { Link } from 'react-router-dom';

//css import
import '../css/Reset.css';
import '../css/cart.css'; // Separate CSS for checkout
import Header from '../include/Header'; 
import Footer from '../include/Footer';

const Cart = () => {
  return (
    <>
    <Header/>
    <div className="wrap">
    <div className="jm-checkout-page">
      {/* Cart Summary Section */}
      <section className="jm-cart-summary">
        <h1 className="jm-cart-total">장바구니 총액: ₩1,509,000</h1>
        <p className="jm-free-shipping">모든 주문에 무료 배송 서비스가 제공됩니다.</p>
        <div className="jm-continue-button">
            <button className="jm-checkout-button">결제</button>
        </div>
        <div className="jm-cart-item">
            <div className="jm-item-image">
          <img
            src="../images/iphone-test.png"
            alt="iPhone 15 Plus"
            className="jm-product-image"
          />
            </div>
            {/* 반복문 영역 */}
            <div className="jm-item-info">
                <div className="ijm-tem-details">
                    <div className='jm-item-name'><h2>iPhone 15 Plus 128GB 블랙</h2></div>
                    <div className='jm-item-options'>
                    <select data-autom="item-quantity-dropdown">
                        <option value="1" aria-label="1 ,  수량">1</option>
                        <option value="2" aria-label="2 ,  수량">2</option>
                        <option value="3" aria-label="3 ,  수량">3</option>
                        <option value="4" aria-label="4 ,  수량">4</option>
                        <option value="5" aria-label="5 ,  수량">5</option>
                        <option value="6" aria-label="6 ,  수량">6</option>
                        <option value="7" aria-label="7 ,  수량">7</option>
                        <option value="8" aria-label="8 ,  수량">8</option>
                        <option value="9" aria-label="9 ,  수량">9</option>
                        <option value="10" aria-label="10+ ,  수량">10+</option>
                    </select>
                    <span class="arrow" aria-hidden="true"></span>
                    </div>
                    <div className='jm-item-price'>
                        <p>₩1,250,000</p>
                        <button className="jm-remove-item">삭제</button>
                    </div>
                </div>
                <div className="jm-cart-item">
                    <div className="jm-as-icondetails-detail">
                    <div>
                        <h3 className='jm-apple-care-tatle'>
                        <img src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/APPLECARE-plus_ICON?wid=800&amp;hei=800&amp;fmt=jpeg&amp;qlt=90&amp;fit=constrain&amp;.v=1527725457537"/>
                        iPad&nbsp;Pro 13(M4 모델)을 위한 AppleCare+ 추가, 
                            <span>₩259,000</span>
                        </h3>
                        
                            <p className="jm-apple-care">
                                <span> 우발적인 손상에 대한 횟수 제한 없는 수리</span> <br/>
                                <span> Apple 인증 서비스 및 지원</span><br/>
                                <span> Apple 전문가가 우선적으로 지원 제공</span><br/>
                                <span> iPad Pro, Apple Pencil, Apple 키보드까지 모두 포함하는 하나의 보증 서비스</span>
                            </p>
                            <button className="jm-plus" type="button">
                                <span>더 알아보기</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="jm-cart-shipping-info">
                    <div className='jm-pickup'>
                        <div class="jm-rc-segmented-control-icon"><svg viewBox="0 0 35 35" class="as-svgicon as-svgicon-applestorepickup as-svgicon-base as-svgicon-applestorepickupbase" role="img" aria-hidden="true" width="20px" height="20px"><path fill="none" d="M0 0h35v35H0z"></path><path d="M25.5 7h-2.529a5.493 5.493 0 0 0-10.942 0H9.5A3.5 3.5 0 0 0 6 10.5v15A3.5 3.5 0 0 0 9.5 29h16a3.5 3.5 0 0 0 3.5-3.5v-15A3.5 3.5 0 0 0 25.5 7Zm-8-4a4.488 4.488 0 0 1 4.446 4h-8.892A4.488 4.488 0 0 1 17.5 3ZM28 25.5a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 7 25.5v-15A2.5 2.5 0 0 1 9.5 8h16a2.5 2.5 0 0 1 2.5 2.5Z"></path><path d="M20.272 17.075a2.326 2.326 0 0 1 1.078-1.94 2.348 2.348 0 0 0-2-1c-.759 0-1.375.463-1.782.463s-.968-.441-1.65-.441a2.719 2.719 0 0 0-2.541 3.021 6.311 6.311 0 0 0 1.056 3.363c.506.717.946 1.29 1.584 1.29s.9-.419 1.672-.419c.8 0 .968.408 1.661.408s1.155-.628 1.584-1.246a4.733 4.733 0 0 0 .693-1.444 2.215 2.215 0 0 1-1.355-2.055ZM17.621 14.021A1.966 1.966 0 0 0 19 13.294a2.328 2.328 0 0 0 .528-1.422 1.076 1.076 0 0 0-.011-.2 2.19 2.19 0 0 0-1.485.772 2.26 2.26 0 0 0-.561 1.378c0 .077.011.154.011.187.04.001.084.012.139.012Z"></path></svg></div>
                        <p>가까운 Apple Store에서 픽업하세요.</p>
                    </div>
                    <div className='jm-delivery'>
                    <div class="jm-rc-segmented-control-icon"><svg class="as-svgicon-rtl-mirrored as-svgicon as-svgicon-boxtruck as-svgicon-reduced as-svgicon-boxtruckreduced" viewBox="0 0 25 25" role="img" aria-hidden="true" width="20px" height="20px"><path fill="none" d="M0 0h25v25H0z"></path><path fill="#1d1d1f" d="m23.482 12.847-2.92-3.209A1.947 1.947 0 0 0 18.985 9H17V6.495a2.5 2.5 0 0 0-2.5-2.5h-11a2.5 2.5 0 0 0-2.5 2.5v9.75a2.5 2.5 0 0 0 2.5 2.5h.548A2.746 2.746 0 0 0 6.75 21.02 2.618 2.618 0 0 0 9.422 19h6.681a2.744 2.744 0 0 0 5.347-.23h.735A1.656 1.656 0 0 0 24 16.98v-2.808a1.937 1.937 0 0 0-.518-1.325ZM8.426 18.745a1.74 1.74 0 0 1-3.352 0 1.577 1.577 0 0 1 .015-1 1.738 1.738 0 0 1 3.322 0 1.578 1.578 0 0 1 .015 1ZM9.447 18a2.726 2.726 0 0 0-5.394-.255H3.5a1.502 1.502 0 0 1-1.5-1.5v-9.75a1.502 1.502 0 0 1 1.5-1.5h11a1.502 1.502 0 0 1 1.5 1.5V18Zm10.972.77a1.738 1.738 0 0 1-3.337 0 1.573 1.573 0 0 1 0-1 1.742 1.742 0 1 1 3.337 1ZM23 16.98c0 .569-.229.79-.815.79h-.735A2.73 2.73 0 0 0 17 16.165V10h1.986a.976.976 0 0 1 .838.314l2.927 3.214a.95.95 0 0 1 .249.644Zm-1.324-3.36a.512.512 0 0 1 .174.38h-3.306a.499.499 0 0 1-.544-.528V11h1.073a.76.76 0 0 1 .594.268Z"></path></svg></div>
                <p>오늘 주문: 금 2024/10/04 도착<br/>무료 배송</p>
                </div>
                </div>
            </div>
            {/* 반복문 영역 끝 */}

        </div>

        <div className="jm-price-summary">
          <div className="jm-summary-details">
            <p>소계: ₩1,509,000</p>
            <p>배송: 무료</p>
          </div>
          <h1>총계: ₩1,509,000</h1>
          <div className="jm-continue-button1">
          <button className="jm-checkout-button1">결제</button>
          </div>
        </div>
      </section>

      {/* Recommended Accessories Section */}
      <section className="jm-recommended-accessories">
        <h2 className="jm-section-title">마음에 들 만한 액세서리</h2>
        <div className="jm-accessory-list">
          <div className="jm-accessory-item">
            <img
              src="https://via.placeholder.com/100"
              alt="20W USB-C Adapter"
              className="jm-accessory-image"
            />
            <p>20W USB-C 전원 어댑터</p>
            <p>₩28,000</p>
            <button className="jm-add-to-cart-button">장바구니에 담기</button>
          </div>
          <div className="jm-accessory-item">
            <img
              src="https://via.placeholder.com/100"
              alt="MagSafe Case"
              className="jm-accessory-image"
            />
            <p>MagSafe형 iPhone 15 Plus 투명 케이스</p>
            <p>₩69,000</p>
            <button className="jm-add-to-cart-button">장바구니에 담기</button>
          </div>
          <div className="jm-accessory-item">
            <img
              src="https://via.placeholder.com/100"
              alt="USB-C Lightning Adapter"
              className="jm-accessory-image"
            />
            <p>USB-C-Lightning 어댑터</p>
            <p>₩45,000</p>
            <button className="jm-add-to-cart-button">장바구니에 담기</button>
          </div>
        </div>
        <Link to="" className="jm-more-products-button">더 많은 제품</Link>
      </section>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Cart;
