//import 라이브러리
import React from 'react';
import { Link } from 'react-router-dom';
// import { useSearchParams} from 'react-router-dom';	파라미터값사용하는 라우터

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';

//import css
import '../css/user.css';

const PurchaseList = () => {

    /*---일반 변수 --------------------------------------------*/
    const buy = true; 

    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/

    /*---일반 메소드 -----------------------------------------*/

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/

    return (
        <>
            <Header />
            {/* // header */}

            <div id="wrap">

                <div id="container">
                    <div id='mypage'>

                        <div id="aside">
                            <div className="DA-aside-txt">
                                <span>유저이름</span>
                                <span>유저아이디</span>
                                <ul>
                                    <li><Link to='/user/mypage' className="DA-link" rel="noreferrer noopener">개인정보</Link></li>
                                    <li><Link to='' className="DA-link" rel="noreferrer noopener">관심상품</Link></li>
                                    <li><Link to='/user/purchaselist' className="DA-link" rel="noreferrer noopener">구매내역</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* // aside */}

                        <div id="content-3"> 
                            <h2>주문하신 제품.</h2>

                            {/* 삼항연산자 */}
                            {
                                (buy !== true) ? (   // 거짓일때
                                    // 구매물품이 없을때
                                    <div id='DA-buy-none'>
                                        <p>
                                            구매하신 제품이 없습니다.<br /><br /><br /><br />
                                            주문이 보이지 않습니까? <Link to='/user/mypage' className="DA-buyLink" rel="noreferrer noopener">지금 구매하기</Link>
                                            <br /><br />
                                            현재 로그인되어 있는 계정은 userId입니다.
                                            <br /><br />
                                            간혹 Apple 계정이 여러 개인 분들이 계신데 고객님도 그런 경우일 수 있습니다. 다른 계정도 갖고 계시다면
                                            <br />로그아웃했다가 그 Apple ID로 다시 로그인해보세요.
                                        </p>
                                    </div>
                                ) : (         // 참일때
                                    // 구매물품이 있을때
                                    <div>
                                        <div className="DA-purchaseList">
                                            <div className="DA-purchaseList-header">
                                                <h3>구매 정보</h3>
                                            </div>
                                            <div className="DA-products">

                                                <div className="DA-clearfix">
                                                    <img src="../images/USB.png" alt="상품사진" />
                                                    <div className="DA-details">
                                                        <p>USB-C 전원 어댑터</p>
                                                        <p>색상: ex_white</p>
                                                        <p>수량: ex_1</p>
                                                        <p>가격: 28,000</p>
                                                        <p>구매날짜: ex_2024-10-04</p>
                                                    </div>
                                                </div>
                                                <div className="DA-clearfix">
                                                    <img src="../images/case.png" alt="상품사진" />
                                                    <div className="DA-details">
                                                        <p>실리콘 케이스</p>
                                                        <p>색상: ex_yellow</p>
                                                        <p>수량: ex_2</p>
                                                        <p>가격: 23,000</p>
                                                        <p>구매날짜: ex_2024-06-18</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            {/* // DA-purchaseList-products */}
                                        </div>
                                        {/* // DA-purchaseList-section */}
                                    </div>
                                )
                            }

                        </div>
                        {/* // content-3 */}

                    </div>
                </div>
                {/* <!-- //container  --> */}

                {/* <!-- footer import -->  */}
                    <Footer />
                {/* <!-- //footer -->  */}

            </div>
            {/* <!-- //wrap --> */}

        </>
    );
}

export default PurchaseList;
