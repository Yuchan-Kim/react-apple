import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/purchase.css';
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

function App() {
  const [selectedColor, setSelectedColor] = useState(null);

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

  const colors = [
    { name: 'Light Blue', code: '#B9C4E0' },
    { name: 'Light Gray', code: '#E2E9EA' },
    { name: 'Peach', code: '#F5E0DD' },
    { name: 'Coral', code: '#F4CAC3' },
    { name: 'Silver', code: '#D4D4D2' },
  ];

  return (
    <>
      <Header />

      <div className="yc-wrap">
        {/* iPhone Purchase Header Section */}
        <section className="yc-purchase-section">
          <div className="yc-purchase-header">
            <span className="yc-new-badge">New</span>
            <h1>iPhone 16 구입하기</h1>
            <p className="yc-price">₩1,250,000부터</p>
          </div>
        </section>

        {/* Model Images Section */}
        <section className="yc-model-images-section">
          <div className="yc-model-images">
            <img src="https://via.placeholder.com/2000x1500" alt="iPhone 16" className="yc-phone-image" />
          </div>

          {/* Model, Color, and Capacity Selection Section */}
          <div className="yc-selection-section">
            {/* Model Selection */}
            <div className="yc-model-selection">
              <h2>모델. 당신에게 딱 맞는 모델은?</h2>
              <div className="yc-model-options">
                <div className="yc-model-option">
                  <p>
                    iPhone 16<br />
                    <span>15.5cm 디스플레이</span>
                  </p>
                  <p className="yc-modelPrice">₩1,250,000부터</p>
                </div>
                <div className="yc-model-option">
                  <p>
                    iPhone 16 Plus<br />
                    <span>17.0cm 디스플레이</span>
                  </p>
                  <p className="yc-modelPrice">₩1,350,000부터</p>
                </div>
              </div>
              <div className="yc-compare-info">
                <p>모델 선택에 도움이 필요하신가요?</p>
                <button className="yc-info-button">+</button>
              </div>
            </div>

            {/* Color Selection */}
            <div className="yc-color-selection">
              <h2>색상. 맘에 드는 색상을 선택하세요.</h2>
              <div className="yc-color-options">
                {colors.map((color) => (
                  <div
                    key={color.name}
                    className={`yc-color-circle ${selectedColor === color.name ? 'yc-selected' : ''}`}
                    style={{ backgroundColor: color.code }}
                    data-color={color.name}
                    onClick={() => setSelectedColor(color.name)}
                  ></div>
                ))}
              </div>
            </div>

            {/* Capacity Selection */}
            <div className="yc-capacity-selection">
              <h2>저장 용량. 당신에게 알맞은 저장 용량은?</h2>
              <div className="yc-capacity-options">
                <div className="yc-capacity-option">
                  <p>128GB</p>
                  <p>₩1,250,000부터</p>
                </div>
                <div className="yc-capacity-option">
                  <p>256GB</p>
                  <p>₩1,400,000부터</p>
                </div>
                <div className="yc-capacity-option">
                  <p>512GB</p>
                  <p>₩1,700,000부터</p>
                </div>
                <div className="yc-capacity-option">
                  <p>1TB</p>
                  <p>₩2,000,000부터</p>
                </div>
              </div>
              <div className="yc-storage-info-box">
                <p>용량이 얼마나 필요할지 확실치 않으신가요?</p>
                <p>자신에게 어느 정도의 저장 용량이 필요할지 감 잡아보기.</p>
                <button className="yc-info-button">+</button>
              </div>
            </div>
          </div>
        </section>

        {/* AppleCare+ Section */}
        <section className="yc-applecare-section">
          <h2>AppleCare+ 보증. 새로 구입한 iPhone을 보호하세요.</h2>
          <div className="yc-applecare-options">
            <div className="yc-applecare-option">
              <span className="yc-applecare-logo">
                <span className="yc-apple-logo"></span>
                <span className="yc-applecare-text"> AppleCare+</span>
              </span>
              <p>우발적인 손상에 대한 횟수 제한 없는 수리*</p>
              <p>Apple 정품 부품으로 진행되는 Apple 인증 수리 서비스</p>
              <p>Apple 전문가의 우선 지원</p>
            </div>
            <div className="yc-applecare-option-nocare">
              <p>AppleCare+ 보증 추가 안 함</p>
            </div>
            <div className="yc-applecare-info">
              <div className="yc-info-box">
                <p className="yc-applecare-addons">
                  AppleCare+의 혜택은 무엇인가요? <br /> <br />
                  떨어뜨리거나 액체를 엎지르는 등의 우발적인 사고로부터 iPhone을 보호할 수 있습니다. 보장 내용을 살펴보세요.
                </p>
                <button className="yc-info-button">+</button>
              </div>
            </div>
          </div>
        </section>

        {/* Final Purchase Section */}
        <section className="yc-final-purchase-section">
          <div className="yc-final-section">
            <div className="yc-final-image">
              {/* <text> 태그는 HTML 표준이 아니므로 <span>으로 변경 */}
              <span>당신의 새<br />iPhone 16입니다.</span>
              <p className="yc-imageDesc">당신이 원하는 대로</p>
              <img src="https://via.placeholder.com/300" alt="iPhone Final" className="yc-final-iphone-image" />
            </div>

            <div className="yc-final-details">
              <div className="yc-final-info">
                <p className="yc-final-price">₩1,250,000부터</p>
              </div>
              <div className="yc-final-info-details">
                <p>
                  시간이 좀 더 필요하신가요?<br />
                  선택한 기기를 관심 목록에 모두 저장해두고 언제든 살펴보던 곳부터 다시 이어보세요.
                </p>
                <p>
                  <Link to="#" className="yc-save-for-later">나중을 위해 저장</Link>
                </p>
              </div>
              <div className="yc-final-info-details3">
                <p>거주 지역의 배송 관련 자세한 정보는 '결제' 단계에서 볼 수 있습니다.</p>
              </div>
            </div>

            <div className="yc-shipping-options">
              <ul className="yc-option">
                <li><span className="yc-icon">🚚</span>무료 배송</li>
                <li><span className="yc-icon">🏬</span>매장에서 픽업</li>
              </ul>
              <button className="yc-continue">계속</button>
            </div>
          </div>
        </section>

        <div className="yc-model-images2">
          <img src="/images/제품구성.jpg" alt="iPhone 16 구성" className="yc-phone-image" />
        </div>

        <div className="yc-environment-message">
          <p><strong>환경 보호를 위한 Apple의 목표.</strong></p>
          <p>
            2030년까지 탄소 중립을 달성하기 위한 Apple의 지속적인 노력의 일환으로 iPhone 16 및 iPhone 16 Plus 제품 구성에는 전원 어댑터 및 EarPods이 포함되지 않습니다. 대신 급속 충전을 지원하고 USB-C 전원 어댑터 및 컴퓨터 포트와 호환되는 USB-C 충전 케이블은 포함되어 있습니다.
          </p>
          <p>
            호환되는 USB-C 전원 어댑터를 가지고 계신 경우 계속 사용하시길 권장합니다. 하지만 새로운 Apple 전원 어댑터 또는 헤드폰이 필요하다면 원하시는 제품을 구입할 수 있습니다.
          </p>
        </div>

        <div className="yc-model-images3">
          <img src="/images/appleContents.jpg" alt="AppleContents" className="yc-phone-image" />
        </div>

        <div className="yc-model-images4">
          <img src="/images/iphoneComparison.jpg" alt="iphoneComparison" className="yc-phone-image" />
        </div>

        <div className="yc-model-images5">
          <img src="/images/iphoneComparison2.jpg" alt="iphoneComparison2" className="yc-phone-image" />
        </div>

        <div className="yc-model-images6">
          <img src="/images/ihoneComparison3.jpg" alt="AppleCarePlus" className="yc-phone-image" />
        </div>

        <div className="yc-model-images7">
          <img src="/images/ihoneComaprison4.jpg" alt="AppleCarePlus" className="yc-phone-image" />
        </div>

        {/* FAQ Section */}
        <section className="yc-faq-section">
          <h2>자주 묻는 질문</h2>
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default App;
