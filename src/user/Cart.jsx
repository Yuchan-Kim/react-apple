import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../include/Header'; 
import Footer from '../include/Footer';
import '../css/reset.css';
import '../css/cart.css'; // Separate CSS for checkout

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [acceList, setAcceList] = useState([]);
  const [quantities, setQuantities] = useState([]); // 각 상품의 수량을 관리하는 상태
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격 관리 상태
  const [appleCareSelected, setAppleCareSelected] = useState([]); // 애플케어 선택 여부
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(''); // 예상 배송일 저장

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 추가
  // 결제 폼으로 이동
  const handleMoveToPayform = () => {
    navigate(`/user/payform`);
  };

  /*---현재 날짜에서 3일 후의 날짜를 계산---*/
  const calculateExpectedDeliveryDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3); // 3일을 더함
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }; // 날짜 포맷 설정
    return currentDate.toLocaleDateString('ko-KR', options).replace(/\./g, '/').trim(); // 포맷 변환
  };

  useEffect(() => {
    setExpectedDeliveryDate(calculateExpectedDeliveryDate()); // 예상 배송일 설정
  }, []);


  /*---유저 카트리스트 가져오기---*/
  const getCartList = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      return; // 토큰이 없으면 요청을 보내지 않음
    }

    axios({
      method: 'get', 			// put, post, delete                   
      url: `${process.env.REACT_APP_API_URL}/api/user/cart`,
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
      responseType: 'json' 
    }).then(response => {
      if (response.data.result === "success") {
        setCartList(response.data.apiData); // 서버에서 가져온 카트 리스트 저장
        setQuantities(response.data.apiData.map(item => item.count)); // 서버에서 가져온 수량을 설정
        setAppleCareSelected(response.data.apiData.map(() => false)); // 애플케어 초기화
      } else {
        console.log(response.data.message); // 실패 시 에러 메시지 출력
      }
    }).catch(error => {
      console.log(error);
    });
  };

  /*---악세사리 리스트 가져오기---*/
  const getAcceList = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      return;
    }

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/user/cartAcce`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.result === "success") {
        setAcceList(response.data.apiData); 
      } else {
        console.log(response.data.message); 
      }
    }).catch(error => {
      console.log(error);
    });
  };

  /*---수량 변경 핸들러---*/
  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities); 
    calculateTotalPrice(newQuantities, appleCareSelected); 

    // 수량 변경 시 서버로 수량 업데이트 요청
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      return;
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/user/cart/update`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        cartNum: cartList[index].cartNum,  // 각 cartNum을 전송
        count: value  // 선택한 수량을 서버로 전송
      }
    })
    .then(response => {
      if (response.data.result === "success") {
        console.log("수량 업데이트 성공");
      } else {
        console.log(response.data.message);
      }
    })
    .catch(error => {
      console.log("수량 업데이트 실패", error);
    });
  };

  /*---애플케어 선택 핸들러---*/
  const handleAppleCareChange = (index) => {
    const newAppleCareSelected = [...appleCareSelected];
    newAppleCareSelected[index] = !newAppleCareSelected[index];
    setAppleCareSelected(newAppleCareSelected);
    calculateTotalPrice(quantities, newAppleCareSelected);
  };

  /*---총 가격 계산 함수---*/
  const calculateTotalPrice = (quantities, appleCareSelected) => {
    const newTotalPrice = cartList.reduce((sum, cartVo, index) => {
      const itemTotal = cartVo.productPrice * quantities[index];
      const appleCarePrice = appleCareSelected[index] ? 259000 : 0; 
      return sum + itemTotal + appleCarePrice;
    }, 0);
    setTotalPrice(newTotalPrice); 
  };

  useEffect(() => {
    getCartList(); 
    getAcceList(); 
  }, []);

  useEffect(() => {
    calculateTotalPrice(quantities, appleCareSelected);
  }, [cartList]);

  // 삭제버튼 핸들러
  const handleRemoveItem = (cartNum) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      return;
    }

    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/api/user/cart/${cartNum}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.data.result === "success") {
          console.log("삭제 성공");
          getCartList(); 
        } else {
          console.log(response.data.message); 
        }
      })
      .catch(error => {
        console.log("삭제 실패", error);
      });
  };

  // 장바구니에 담기 핸들러
  const handleAddToCart = (acceVo) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      return;  // 오류가 있으면 함수 중단
    }
  
    // axios 요청 반환
    return axios({  // 반드시 return으로 axios Promise 반환
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/user/cart`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        productDetailNum: acceVo.productDetailNum,  // undefined 확인 필요
      }
    })
    .then(response => {
      if (response.data.result === "success") {
        console.log("장바구니 추가 성공");
        window.location.reload();  // 새로고침
      } else {
        console.log(response.data.message);
        window.location.reload();  // 새로고침
      }
    })
    .catch(error => {
      console.log("장바구니 추가 실패", error);
    });
  };
  

  return (
    <>
    <Header/>
    <div className="wrap">
    <div className="jm-checkout-page">
      <section className="jm-cart-summary">
        <h1 className="jm-cart-total">장바구니 총액: ₩{totalPrice.toLocaleString()}</h1> 
        <p className="jm-free-shipping">모든 주문에 무료 배송 서비스가 제공됩니다.</p>
        <div className="jm-continue-button">
          <button to="/user/payform" className="jm-checkout-button" onClick={handleMoveToPayform}>결제</button>
        </div>

        {cartList.map((cartVo, index) => (
          <div key={cartVo.cartNum}>
            <div className="jm-cart-item">
              <div className="jm-item-image-box">
                <img
                  src={`${process.env.REACT_APP_API_URL}/upload/${cartVo.imageSavedName}`}
                  alt={cartVo.imageSavedName}
                  className="jm-product-image"
                />
              </div>
            
              <div className="jm-item-info">
                <div className="jm-item-details">
                  <div className='jm-item-name'>
                  <h2>
                        {cartVo.productName !== 'N/A' && cartVo.productName} 
                        {cartVo.storageSize !== 'N/A' && ` ${cartVo.storageSize}`} 
                        {cartVo.colorName !== 'N/A' && ` ${cartVo.colorName}`}
                      </h2></div>
                  <div className='jm-item-options'>
                    <select
                      value={quantities[index]}  // 서버에서 받은 수량을 기본값으로 설정
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))} // 수량 선택 시 서버로 전송
                      data-autom="item-quantity-dropdown"
                    >
                      {[...Array(10).keys()].map(i => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </select>
                    <span className="arrow" aria-hidden="true"></span>
                  </div>
                  <div className='jm-item-price'>
                    <p>₩{(cartVo.productPrice * quantities[index]).toLocaleString()}</p> 
                    <button className="jm-remove-item" onClick={() => handleRemoveItem(cartVo.cartNum)}>삭제</button>
                  </div>
                </div>
                
                {/* 애플케어 UI는 시리즈네임이 악세사리가 아닐 때만 표시 */}
                {cartVo.seriesName !== "악세사리" && (
                <div className="jm-cart-item">
                    <div className="jm-as-icondetails-detail">
                    <div className='jm-apple-care-box'>
                        <h3 className='jm-apple-care-tatle'>
                        <img src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/APPLECARE-plus_ICON?wid=800&amp;hei=800&amp;fmt=jpeg&amp;qlt=90&amp;fit=constrain&amp;.v=1527725457537" alt='applecare'/>
                        &nbsp;{cartVo.productName}을 위한 AppleCare+ 추가, &nbsp;
                            <span className='jm-apple-care-price'> ₩259,000</span>
                        </h3>
                        
                            <p className="jm-apple-care">
                                <span> 우발적인 손상에 대한 횟수 제한 없는 수리</span> <br/>
                                <span> Apple 인증 서비스 및 지원</span><br/>
                                <span> Apple 전문가가 우선적으로 지원 제공</span><br/>
                                <span> iPad Pro, Apple Pencil, Apple 키보드까지 모두 포함하는 하나의 보증 서비스</span>
                            </p>
                            <button className="jm-plus" type="button" onClick={() => handleAppleCareChange(index)}>
                                <span>{appleCareSelected[index] ? '애플케어 제거' : '애플케어 추가'}</span>
                            </button>
                        </div>
                        <div className="jm-cart-shipping-info">
                    <div className='jm-pickup'>
                        <div class="jm-rc-segmented-control-icon"><svg viewBox="0 0 35 35" class="as-svgicon as-svgicon-applestorepickup as-svgicon-base as-svgicon-applestorepickupbase" role="img" aria-hidden="true" width="20px" height="20px"><path fill="none" d="M0 0h35v35H0z"></path><path d="M25.5 7h-2.529a5.493 5.493 0 0 0-10.942 0H9.5A3.5 3.5 0 0 0 6 10.5v15A3.5 3.5 0 0 0 9.5 29h16a3.5 3.5 0 0 0 3.5-3.5v-15A3.5 3.5 0 0 0 25.5 7Zm-8-4a4.488 4.488 0 0 1 4.446 4h-8.892A4.488 4.488 0 0 1 17.5 3ZM28 25.5a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 7 25.5v-15A2.5 2.5 0 0 1 9.5 8h16a2.5 2.5 0 0 1 2.5 2.5Z"></path><path d="M20.272 17.075a2.326 2.326 0 0 1 1.078-1.94 2.348 2.348 0 0 0-2-1c-.759 0-1.375.463-1.782.463s-.968-.441-1.65-.441a2.719 2.719 0 0 0-2.541 3.021 6.311 6.311 0 0 0 1.056 3.363c.506.717.946 1.29 1.584 1.29s.9-.419 1.672-.419c.8 0 .968.408 1.661.408s1.155-.628 1.584-1.246a4.733 4.733 0 0 0 .693-1.444 2.215 2.215 0 0 1-1.355-2.055ZM17.621 14.021A1.966 1.966 0 0 0 19 13.294a2.328 2.328 0 0 0 .528-1.422 1.076 1.076 0 0 0-.011-.2 2.19 2.19 0 0 0-1.485.772 2.26 2.26 0 0 0-.561 1.378c0 .077.011.154.011.187.04.001.084.012.139.012Z"></path></svg></div>
                        <p>가까운 Apple Store에서 픽업하세요.</p>
                    </div>
                    <div className='jm-delivery'>
                    <div class="jm-rc-segmented-control-icon"><svg class="as-svgicon-rtl-mirrored as-svgicon as-svgicon-boxtruck as-svgicon-reduced as-svgicon-boxtruckreduced" viewBox="0 0 25 25" role="img" aria-hidden="true" width="20px" height="20px"><path fill="none" d="M0 0h25v25H0z"></path><path fill="#1d1d1f" d="m23.482 12.847-2.92-3.209A1.947 1.947 0 0 0 18.985 9H17V6.495a2.5 2.5 0 0 0-2.5-2.5h-11a2.5 2.5 0 0 0-2.5 2.5v9.75a2.5 2.5 0 0 0 2.5 2.5h.548A2.746 2.746 0 0 0 6.75 21.02 2.618 2.618 0 0 0 9.422 19h6.681a2.744 2.744 0 0 0 5.347-.23h.735A1.656 1.656 0 0 0 24 16.98v-2.808a1.937 1.937 0 0 0-.518-1.325ZM8.426 18.745a1.74 1.74 0 0 1-3.352 0 1.577 1.577 0 0 1 .015-1 1.738 1.738 0 0 1 3.322 0 1.578 1.578 0 0 1 .015 1ZM9.447 18a2.726 2.726 0 0 0-5.394-.255H3.5a1.502 1.502 0 0 1-1.5-1.5v-9.75a1.502 1.502 0 0 1 1.5-1.5h11a1.502 1.502 0 0 1 1.5 1.5V18Zm10.972.77a1.738 1.738 0 0 1-3.337 0 1.573 1.573 0 0 1 0-1 1.742 1.742 0 1 1 3.337 1ZM23 16.98c0 .569-.229.79-.815.79h-.735A2.73 2.73 0 0 0 17 16.165V10h1.986a.976.976 0 0 1 .838.314l2.927 3.214a.95.95 0 0 1 .249.644Zm-1.324-3.36a.512.512 0 0 1 .174.38h-3.306a.499.499 0 0 1-.544-.528V11h1.073a.76.76 0 0 1 .594.268Z"></path></svg></div>
                <p>오늘 주문: {expectedDeliveryDate} 도착<br/>무료 배송</p>
                </div>
                </div>
                    </div>
                </div>
                
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="jm-price-summary">
          <div className="jm-summary-details">
            <p>소계: ₩{totalPrice.toLocaleString()}</p>
            <p>배송: 무료</p>
          </div>
          <h1>총계: ₩{totalPrice.toLocaleString()}</h1>
          <div className="jm-continue-button1">
            <button to="/user/payform" className="jm-checkout-button1" onClick={handleMoveToPayform}>결제</button>
          </div>
        </div>
      </section>

      <section className="jm-recommended-x">
        <h2 className="jm-section-title">마음에 들 만한 액세서리</h2>
        <div className="jm-accessory-list">
        {acceList.map((acceVo) => (
          <div className="jm-accessory-item" key={acceVo.productDetailNum}>
            <img
              src={`${process.env.REACT_APP_API_URL}/upload/${acceVo.imageSavedName}`}
              alt={acceVo.imageSavedName}
              className="jm-accessory-image"
            />
            <p>{acceVo.productName}</p>
            <p>₩{acceVo.productPrice.toLocaleString()}</p>
            <button className="jm-add-to-cart-button" onClick={() => handleAddToCart(acceVo)}>
              장바구니에 담기
            </button>
          </div>
        ))}
        </div>
        <Link to="/mainlistacc" className="jm-more-products-button">더 많은 제품</Link>
      </section>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Cart;
