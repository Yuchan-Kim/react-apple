// src/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import '../css/footer.css';

const Footer = () => {
    return (
        <footer className="yc-apple-footer">
        {/* 회사 정보 섹션 */}
        <div className="yc-company-info">
            <p>사업자등록번호: 120-81-84429 | 통신판매업신고번호: 제 2011-서울강남-00810호</p>
            <p>대표이사: PETER DENWOOD | 주소: 서울 특별시 강남구 영동대로 517</p>
            <p>대표전화: 080-330-8877 | 팩스: 02-6928-0000</p>
        </div>

        {/* 푸터 상단 섹션 */}
        <div className="yc-footer-top">
            <div className="yc-footer-section">
            <h4>쇼핑 및 알아보기</h4>
            <ul>
                <li><Link to="/">Store</Link></li>
                <li><Link to="/">Mac</Link></li>
                <li><Link to="/">iPad</Link></li>
                <li><Link to="/">iPhone</Link></li>
                <li><Link to="/">Watch</Link></li>
                <li><Link to="/">AirPods</Link></li>
                <li><Link to="/">TV 및 홈</Link></li>
                <li><Link to="/">AirTag</Link></li>
                <li><Link to="/">액세서리</Link></li>
                <li><Link to="/">지갑</Link></li>
            </ul>
            </div>

            <div className="yc-footer-section">
            <h4>계정</h4>
            <ul>
                <li><Link to="/">Apple 계정 관리</Link></li>
                <li><Link to="/">Apple Store 계정</Link></li>
                <li><Link to="/">iCloud.com</Link></li>
            </ul>
            <h4>엔터테인먼트</h4>
            <ul>
                <li><Link to="/">Apple One</Link></li>
                <li><Link to="/">Apple TV+</Link></li>
                <li><Link to="/">Apple Music</Link></li>
                <li><Link to="/">Apple Arcade</Link></li>
                <li><Link to="/">Apple Podcasts</Link></li>
                <li><Link to="/">Apple Books</Link></li>
            </ul>
            </div>

            <div className="yc-footer-section">
            <h4>Apple Store</h4>
            <ul>
                <li><Link to="/">매장 찾기</Link></li>
                <li><Link to="/">Genius Bar</Link></li>
                <li><Link to="/">Today at Apple</Link></li>
                <li><Link to="/">Apple 캠프</Link></li>
                <li><Link to="/">Apple Store 앱</Link></li>
                <li><Link to="/">인증 리퍼비쉬 제품</Link></li>
                <li><Link to="/">Apple Trade In</Link></li>
                <li><Link to="/">주문 상태</Link></li>
                <li><Link to="/">쇼핑 도움말</Link></li>
            </ul>
            </div>

            <div className="yc-footer-section">
            <h4>비즈니스</h4>
            <ul>
                <li><Link to="/">Apple과 비즈니스</Link></li>
                <li><Link to="/">비즈니스를 위한 제품 쇼핑하기</Link></li>
            </ul>
            <h4>교육</h4>
            <ul>
                <li><Link to="/">Apple 그리고 교육</Link></li>
                <li><Link to="/">초중고용 제품 쇼핑하기</Link></li>
                <li><Link to="/">대학생을 위한 제품 쇼핑하기</Link></li>
            </ul>
            </div>

            <div className="yc-footer-section">
            <h4>Apple의 가치관</h4>
            <ul>
                <li><Link to="/">손쉬운 사용</Link></li>
                <li><Link to="/">환경</Link></li>
                <li><Link to="/">개인정보 보호</Link></li>
                <li><Link to="/">공급망</Link></li>
            </ul>
            <h4>Apple 정보</h4>
            <ul>
                <li><Link to="/">Newsroom</Link></li>
                <li><Link to="/">Apple 리더십</Link></li>
                <li><Link to="/">채용 안내</Link></li>
                <li><Link to="/">윤리 및 규정 준수</Link></li>
                <li><Link to="/">이벤트</Link></li>
                <li><Link to="/">입찰과 창출</Link></li>
                <li><Link to="/">Apple 연락처</Link></li>
            </ul>
            </div>
        </div>

        {/* 푸터 하단 섹션 */}
        <div className="yc-footer-bottom">
            <p>다양한 쇼핑 방법: <Link to="/">Apple Store를 방문</Link>하거나, <Link to="/">리셀러</Link>를 찾아보거나, 080-330-8877번으로 전화하세요.</p>
            <p>Copyright © 2024 Apple Inc. 모든 권리 보유. | <Link to="/">개인정보 처리방침</Link> | <Link to="/">약관</Link> | <Link to="/">판매 및 환불</Link> | <Link to="/">법적 고지</Link> | <Link to="/">사이트 맵</Link> | 대한민국</p>
        </div>
        </footer>
    );
};

export default Footer;
