import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

//css imports
import '../css/reset.css';
import '../css/Payok.css';
import Header from '../include/Header'; 
import Footer from '../include/Footer';

const Payok = () => {

  const [historyList, setHistoryList] = useState([]);

  /*---유저 구매리스트 가져오기---*/
  const getHistoryList = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      return; // 토큰이 없으면 요청을 보내지 않음
    }

    axios({
      method: 'get', 			// put, post, delete                   
      url: 'http://localhost:9000/api/user/payok',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
      responseType: 'json' 
    }).then(response => {
      if (response.data.result === "success") {
        setHistoryList(response.data.apiData); // 서버에서 가져온 리스트 저장
      } else {
        console.log(response.data.message); // 실패 시 에러 메시지 출력
      }
    }).catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    getHistoryList(); // 리스트 가져오기
  }, []);

  // 날짜에 3일 더하기
  const addDays = (dateStr, days) => {
    const date = new Date(dateStr); // 문자열을 Date 객체로 변환
    date.setDate(date.getDate() + days); // 날짜에 days만큼 더함
    return date.toISOString().split('T')[0]; // yyyy-mm-dd 형식으로 반환
  };

  return (
    <>
      <Header />
      <div className="wrap">
        <div className="jm-order-confirmation-container">
          <h1>모든 준비가 완료되었습니다.</h1>
          <p>확인 내역 및 배송 관련 업데이트를 다음 연락처로 보내드리겠습니다.</p>

          {historyList.length > 0 && (
            <>
              {/* shippingStatus가 '배송'일 때 주소와 날짜는 한 번만 표시 */}
              {historyList[0].shippingStatus === '배송' && (
                <>
                  <span className="jm-order-number">배송 주소: {historyList[0].userAddress}</span>
                  <h2>{historyList[0].purchasedDate} - {addDays(historyList[0].purchasedDate, 3)}</h2>
                </>
              )}

              {/* shippingStatus가 '픽업'일 때 픽업 정보와 날짜는 한 번만 표시 */}
              {historyList[0].shippingStatus === '픽업' && (
                <>
                <h2>구매완료 - {historyList[0].purchasedDate}</h2>
                <div className='jm-pickup-StireAddress'>
                <div className='jm-pickup-StoreAddress-info'>
                  <span className="jm-order-number">픽업 장소: {historyList[0].storeName} <br/><br/> 스토어 주소: {historyList[0].storeAddress}</span>
                </div>
                <div className='jm-payment-info-StoreMApImg'>
                <img src={historyList[0].storeMapImage} alt={historyList[0].storeMapImage} />
                </div>
                </div>
                </>
              )}
            </>
          )}

          
            <div className="jm-product-summary">
              <ul>
              {historyList.map((historyVo, index) => (
               <li key={historyVo.cartNum} className="jm-product-details">
                        <div className="jm-product-img"key={historyVo.historyNum}>
                          <img src={historyVo.imageSavedName} alt="product" />
                        </div>
                        <div className="jm-product-info">
                          <p>{historyVo.productName} {historyVo.storageSize}</p>
                          <p>색상: {historyVo.colorName} </p>
                          <p>수량: {historyVo.productCount}</p>
                        </div>
                </li>
                ))}
              </ul>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payok;
