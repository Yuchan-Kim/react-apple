import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

//css imports
import '../css/reset.css';
import '../css/Payform.css';
import Header from '../include/Header'; 
import Footer from '../include/Footer';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="yc-faq-item">
      <div className="yc-faq-question" onClick={toggleAnswer}>
        <h3>{question}</h3>
        <span className="yc-arrow-icon">{isOpen ? '-' : '+'}</span>
      </div>
      <div className={`yc-faq-answer ${isOpen ? 'yc-open' : 'yc-closed'}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

const faqData = [
  {
    question: 'SIM이 없는 iPhone은 왜 apple.com에서 구입하는 게 좋은가요?',
    answer: 'apple.com에서 구입하신 미개통 iPhone은 연락 기기입니다. 이동통신사 약정 없이 사용 가능합니다.',
  },
  {
    question: '국내에서 개통한 iPhone을 해외 네트워크에서도 사용할 수 있나요?',
    answer: '네, 전세계 어디서든 네트워크 사용이 가능합니다.',
  },
  {
    question: 'iPhone 반품이 가능한가요?',
    answer: '14일 이내에 반품이 가능합니다.',
  },
  {
    question: '새 기기로 자료를 전송하거나 새로 설정하는 일은 쉬운가요?',
    answer: '매우 쉽습니다! 간단한 단계로 기기 전송 및 설정이 가능합니다.',
  },
];

const CheckoutPage = () => {
  const [cartList, setCartList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격 관리 상태
  const [viewPickup, setViewPickup] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null); // 선택된 매장 상태
  const [userAddress, setUserAddress] = useState(''); // 유저 주소 상태
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(''); // 예상 배송일 저장

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

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 추가

  const handleDeliveryClick = () => {
    setViewPickup(false); // Go to delivery view
  };

  const handlePickupClick = () => {
    setViewPickup(true); // Go to pickup view
  };

  const handleStoreClick = (storeNum) => {
    setSelectedStore(storeNum); // 클릭한 매장의 storeNum을 선택된 매장으로 설정
  };




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
      } else {
        console.log(response.data.message); // 실패 시 에러 메시지 출력
      }
    }).catch(error => {
      console.log(error);
    });
  };




  // 유저 주소 정보 가져오기
  const getUserAddress = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      return; // 토큰이 없으면 요청을 보내지 않음
    }

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/user/address`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.result === 'success') {
        if (response.data.apiData && response.data.apiData.userAddress) {
          setUserAddress(response.data.apiData.userAddress); // 유저 주소 정보 저장
        } else {
          console.log('Address data not found in API response.');
        }
      } else {
        console.log(response.data.message); // 실패 시 에러 메시지 출력
      }
    }).catch(error => {
      console.log(error);
    });
  };




  /*---스토어 리스트 가져오기---*/
  const getStoreList = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      return; // 토큰이 없으면 요청을 보내지 않음
    }

    axios({
      method: 'get', 			// put, post, delete                   
      url: `${process.env.REACT_APP_API_URL}/api/user/storelist`,
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
      responseType: 'json' 
    }).then(response => {
      if (response.data.result === "success") {
        setStoreList(response.data.apiData); // 서버에서 가져온 스토어 리스트 저장
      } else {
        console.log(response.data.message); // 실패 시 에러 메시지 출력
      }
    }).catch(error => {
      console.log(error);
    });
  };



  // 총 가격 계산 함수
  const calculateTotalPrice = () => {
    const price = cartList.reduce((sum, cartVo) => {
      return sum + cartVo.productPrice * cartVo.count; // 수량(count)에 따른 가격 계산
    }, 0);
    setTotalPrice(price);
  };




  // 배송 결제 완료 버튼
  const handleDeliveryPayment = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      return; // 토큰이 없으면 요청을 보내지 않음
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/delivery`, // Receipt 인서트 API 엔드포인트
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        storeNum: selectedStore,          // 선택된 매장
        userAddress: userAddress,         // 배송지
        shippingStatus: '배송',           // 배송 상태
        totalPrice: totalPrice,           // 총 결제 금액
      },
    })
    .then(response => {
      if (response.data.result === 'success') {
        alert("결제가 완료되었습니다.");
        navigate('/user/payok'); // 결제 완료 페이지로 이동
      } else {
        console.log(response.data.message); // 실패 시 에러 메시지 출력
      }
    })
    .catch(error => {
      console.log(error);
    });
  };



  // 픽업 결제완료 버튼
  const handlePickupPayment = () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      return; // 토큰이 없으면 요청을 보내지 않음
    }
  
    if (!selectedStoreData) {
      console.log("선택된 매장이 없습니다.");
      return; // 매장이 선택되지 않으면 요청을 보내지 않음
    }
  
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/pickup`, // Receipt 인서트 API 엔드포인트
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        storeNum: selectedStore,          // 선택된 매장
        storeAddress: selectedStoreData.storeAddress,  // 매장 주소
        shippingStatus: '픽업',           // 배송 상태
        totalPrice: totalPrice,           // 총 결제 금액
      },
    })
    .then(response => {
      if (response.data.result === 'success') {
        alert("결제가 완료되었습니다.");
        navigate('/user/payok'); // 결제 완료 페이지로 이동
      } else {
        console.log(response.data.message); // 실패 시 에러 메시지 출력
      }
    })
    .catch(error => {
      console.log(error);
    });
  };
  

  // `useEffect`로 장바구니 데이터를 가져오고, 총 가격 계산
  useEffect(() => {
    getCartList(); // 유저 카트 리스트 가져오기
    getUserAddress(); // 컴포넌트 로드 시 유저 주소 정보 가져오기
    getStoreList(); // 스토어 리스트 가져오기
  }, []);

  useEffect(() => {
    calculateTotalPrice(); // 카트 리스트가 변경될 때마다 총 가격을 계산
  }, [cartList]);

  // 선택된 매장의 정보를 찾아서 반환
  const selectedStoreData = storeList.find(storeVo => storeVo.storeNum === selectedStore);

  return (
    <>
      <Header/>
      <div className="wrap">
        <div className="jm-checkout-page">
          {/* Order Summary */}
          <div id="jm-order-title">
            <h2>결제</h2>
            <span id="jm-order-summary">주문 요약 정보 표시: ₩{totalPrice.toLocaleString()}</span>
          </div>

          {/* Main Content */}
          <main className="jm-checkout-content">
            {!viewPickup ? (
              <>
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

                {/* 유저 주소 */}
                <div className="jm-delivery-address">
                  <span>배송지: {userAddress ? userAddress : '주소를 불러오는 중입니다...'}</span>
                </div>

                {/* 장바구니 리스트 */}
                <div className="jm-product-summary">
                  <ul>
                    {cartList.map((cartVo) => (
                      <li key={cartVo.cartNum} className="jm-product-details">
                        <div className="jm-product-img">
                          <img src={`${process.env.REACT_APP_API_URL}/upload/${cartVo.imageSavedName}`} alt="product" />
                        </div>
                        <div className="jm-product-info">
                          <p>{cartVo.productName} {cartVo.storageSize}</p>
                          <p>색상: {cartVo.colorName} </p>
                          <p>수량: {cartVo.count}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="jm-shipping-bottom">
                  <div className="jm-shipping-info">
                    <div className='jm-d-date-box'>
                      <p className='jm-d-date'>배송:{expectedDeliveryDate}</p>
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

                {/* 배송 결제 버튼 */}
                <div className="jm-continue-button">
                  <button onClick={handleDeliveryPayment}>결제 완료</button>
                </div>
              </>
            ) : (
              <>
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

                {/* 스토어 리스트 */}
                <h2 className="jm-pickup-title">픽업 매장 선택:</h2>
                <span className="jm-store-list-title">모든매장</span>

                <div className='jm-pickup-store-main'>
                  <div className="jm-pickup-store-list">
                    {storeList.map((storeVo) => (
                      <div
                        key={storeVo.storeNum}
                        className={`jm-pickup-store${selectedStore === storeVo.storeNum ? ' selected' : ''}`}
                        onClick={() => handleStoreClick(storeVo.storeNum)}
                        style={{
                          border: selectedStore === storeVo.storeNum ? '1px solid #0071e3' : '1px solid gray',
                          padding: '10px',
                          margin: '10px 0',
                          cursor: 'pointer'
                        }}
                      >
                        <div className="jm-pickup-store-details">
                          <span className='jm-map-ping'>{storeVo.storeNum}</span>
                          <p>{storeVo.storeName}</p>
                        </div>
                        <div>
                          <span className="jm-available">가능 오늘</span>
                          <p>매장 내 픽업</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 선택된 매장의 이미지만 표시 */}
                  <div className="jm-pickup-store-map">
                    {selectedStoreData && (
                      <div>
                        <h3>{selectedStoreData.storeName}</h3>
                      <div className="jm-pickup-store-map-info">픽업 장소: {selectedStoreData.storeName}</div>
                      <div className="jm-pickup-store-map-info">스토어 주소: {selectedStoreData.storeAddress}</div>
                      <div className="jm-pickup-store-map-info">매장 번호:{selectedStoreData.storeNumber}</div>
                      <div className="jm-pickup-store-map-info">월요일-일요일 10:00 오전-10:00 오후</div>
                      <div><h5> 매장 내</h5></div>
                      <div className="jm-pickup-store-map-info">온라인으로 주문하신 제품을 픽업하세요. 기기 설정과 관련한 도움도 받고, 액세서리도 쇼핑하실 수 있습니다.</div>
                      <div className="jm-pickup-store-map-info">주문하신 제품이 준비되면 자세한 픽업 안내를 이메일로 보내 드립니다. 새 기기 설정과 관련하여 도움이 필요하시면 Apple 스페셜리스트가 진행하는 무료 온라인 세션을 예약하세요.</div>
                      <img src={`${process.env.REACT_APP_API_URL}/upload/${selectedStoreData.storeMapImage}`} alt={selectedStoreData.storeMapImage} />
                      </div>
                    )}
                  </div>
                </div>

                {/* 픽업 결제 버튼 */}
                <div className="jm-continue-button">
                  <button onClick={handlePickupPayment}>결제 완료</button>
                </div>
              </>
            )}

            <div className="jm-help-section">
              <p>도움이 더 필요하신가요? <Link to="https://support.apple.com/ko-kr">고객지원</Link> 또는 080-330-8877 번호로 문의하세요.</p>
            </div>     
          </main>
        </div>
      </div>
      <div className="yc-environment-message">
          <p><strong>환경 보호를 위한 Apple의 목표.</strong></p>
          <p>
            2030년까지 탄소 중립을 달성하기 위한 Apple의 지속적인 노력의 일환으로 iPhone 제품 구성에는 전원 어댑터 및 EarPods이 포함되지 않습니다. 대신 급속 충전을 지원하고 USB-C 전원 어댑터 및 컴퓨터 포트와 호환되는 USB-C 충전 케이블은 포함되어 있습니다.
          </p>
          <p>
            호환되는 USB-C 전원 어댑터를 가지고 계신 경우 계속 사용하시길 권장합니다. 하지만 새로운 Apple 전원 어댑터 또는 헤드폰이 필요하다면 원하시는 제품을 구입할 수 있습니다.
          </p>
        </div>

        

        {/* FAQ Section */}
        <section className="yc-faq-section">
          <h2>자주 묻는 질문</h2>
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </section> 
      <Footer/>
    </>
  );
};

export default CheckoutPage;
