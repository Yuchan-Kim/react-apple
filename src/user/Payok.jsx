import React from 'react';


//css imports
import '../css/Payok.css';
import Header from '../include/Header'; 
import Footer from '../include/Footer';

const Payok = () => {
  return (
    <>
    <Header />
    <div className="wrap">
    <div className="jm-order-confirmation-container">
        <h1>모든 준비가 완료되었습니다.</h1>
        <p>확인 내역 및 배송 관련 업데이트를 다음 연락처로 보내드리겠습니다.</p>
        <span className="jm-order-number">주문 번호: 1234-5678-91011</span>

        <div className="jm-shipment-info">
          <div className="jm-shipment-details">
            <div className='jm-shipment-text'>
            <h2>출고 2020/12/10 - 2020/12/11</h2>
            <p>Apple Watch Nike SE GPS + Cellular, <br/>44mm 스페이스 그레이 알루미늄 케이스, <br/>그리고 블랙 Nike 스포츠 루프</p>
            </div>
          </div>
          <div className="jm-product-image">
            <img src="../images/iphone-test.png" alt="Apple Watch Nike SE" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Payok;
