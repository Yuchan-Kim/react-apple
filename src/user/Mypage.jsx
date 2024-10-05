//import 라이브러리
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import { useSearchParams} from 'react-router-dom';	파라미터값사용하는 라우터

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';
import Modal from './UserInfo-Modal';

//import css
import '../css/user.css';

const Mypage = () => {

    /*---일반 변수 --------------------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

    /*---일반 메소드 -----------------------------------------*/

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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

                        <div id="content-2"> 
                            <h2>마이페이지</h2>
                            <span id="mypage-txt">개인 정보를 관리하십시오.</span>
                            <br /><br />

                            <div className="DA-info-section">
                                <div className="DA-info-header">
                                    <h3>정보 수정</h3>
                                    <button id="DA-modal-btn" type='button' onClick={openModal}>수정</button>
                                </div>
                                <div className="DA-info-status">
                                    <p>이  름 : userName</p>
                                    <p>전화번호 : userPhone</p>
                                    <p>주 소 : userAddress</p>
                                </div>
                            </div>
                            {/* // info-section */}

                            <div className="DA-favorite-section">
                                <div className="DA-favorite-header">
                                    <h3>관심 상품</h3>
                                    <Link to='' className="DA-link" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="DA-favorite-products">
                                    {/* <form action="" method="" onSubmit=""> */}
                                        <div className="DA-product-info">
                                            <img src="../images/USB.png" alt="상품사진" />
                                            <div className="DA-product-details">
                                                <h4>USB-C 전원 어댑터</h4>
                                                <p>28,000</p>
                                            </div>
                                        </div>
                                        <div className="DA-product-info">
                                            <img src="../images/case.png" alt="상품사진" />
                                            <div className="DA-product-details">
                                                <h4>실리콘 케이스</h4>
                                                <p>69,000</p>
                                            </div>
                                        </div>
                                    {/* </form> */}
                                </div>
                            </div>
                            {/* // favorite-section */}

                            <div className="DA-purchaseList-section">
                                <div className="DA-purchaseList-header">
                                    <h3>구매내역</h3>
                                    <Link to='/user/purchaselist' className="DA-link" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="DA-purchaseList-products">
                                    {/* <form action="" method="" onSubmit=""> */}
                                        <div className="DA-purchaseList-info">
                                            <img src="../images/USB.png" alt="상품사진" />
                                            <div className="DA-purchaseList-details">
                                                <h4>USB-C 전원 어댑터</h4>
                                                <p>28,000</p>
                                            </div>
                                        </div>
                                        <div className="DA-purchaseList-info">
                                            <img src="../images/case.png" alt="상품사진" />
                                            <div className="DA-purchaseList-details">
                                                <h4>실리콘 케이스</h4>
                                                <p>69,000</p>
                                            </div>
                                        </div>
                                    {/* </form> */}
                                </div>
                                {/* // purchaseList-products */}
                            </div>
                            {/* // purchaseList-section */}

                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <div id='DA-modalContent'>
                                    <img src="../images/userInfo.png" alt="사람모양사진" />
                                    <p>개인 정보 수정</p>
                                    <input type='password' id='' name='input-pw' value='' onChange='' placeholder='암호' />
                                    <br /><br />
                                    <input type='text' id='' name='' value='' onChange='' placeholder='이름' />
                                    <br /><br />
                                    <input type='text' id='' name='' value='' onChange='' placeholder='전화번호' />
                                    <br /><br />
                                    <input type='text' id='' name='' value='' onChange='' placeholder='주소' />
                                    <br /><br /><br />
                                    <button type='submit'>수정</button>
                                </div>
                            </Modal>

                        </div>
                        {/* // content-2 */}

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

export default Mypage;
