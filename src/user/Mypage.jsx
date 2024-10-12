//import 라이브러리
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';
import Modal from './UserInfo-Modal';

//import css
import '../css/user.css';

const Mypage = () => {

    /*---일반 변수 --------------------------------------------*/
    const token = localStorage.getItem('token'); 

    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userName, setUserName] = useState('');
    const [modalName, setModalName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userHp, setUserHp] = useState('');
    const [purchaseList, setPurchaseList] = useState([]); // 구매 내역 상태
    const [likeList, setLikeList] = useState([]); // 관심 목록 상태

    /*---일반 메소드 -----------------------------------------*/
    const getMypage = () => {
        axios({
            method: 'get',   
            url: `${process.env.REACT_APP_API_URL}/api/users/me`,  
            headers: { "Authorization": `Bearer ${token}` },	
            responseType: 'json' 
        }).then(response => {
            console.log(response.data); 

            const userVo = response.data.apiData;

            if (response.data.result === 'success') {
                setUserId(userVo.userId);
                setUserName(userVo.userName);
                setModalName(userVo.userName);
                setUserHp(userVo.userHp);
                setUserAddress(userVo.userAddress);
                setPurchaseList(userVo.purchaseList || []); // 구매 내역
                setLikeList(userVo.likeList || []); // 관심 목록
            } else {
                alert('회원정보 가져오기 실패');
            }

        }).catch(error => {
            console.log(error);
        });
    }

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    const openModal = () => {
        setModalName(userName);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);  
        setUserPw("");
        getMypage(); 
    };

    // 비밀번호
    const handlePassword = (e) => {
        setUserPw(e.target.value);
    }

    // 이름
    const handleModalName = (e) => {
        setModalName(e.target.value);
    }

    // 전화번호
    const handlePhoneNumber = (e) => {
        setUserHp(e.target.value);
    }

    // 주소
    const handleAddress = (e) => {
        setUserAddress(e.target.value);
    }

    // 마운트 됐을때
    useEffect(() => {
        getMypage();
    }, []);

    // 수정버튼 클릭했을때
    const handleModify = (e) => {
        e.preventDefault();

        const userVo = {
            userPw: userPw,
            userName: modalName,
            userHp: userHp,
            userAddress: userAddress
        };
        console.log(userVo);

        axios({
            method: 'put',  
            url: `${process.env.REACT_APP_API_URL}/api/users/me`,
            headers: { 
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`                 
            }, 	
            data: userVo, 
            responseType: 'json' 
        }).then(response => {
            console.log(response.data.apiData); 

            if(response.data.result === 'success') {
                const authUser = response.data.apiData     
                localStorage.setItem('authUser', JSON.stringify(authUser));     
                closeModal(); 
            } else {
                alert("수정실패");
            }

        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <>
            <Header />
            <div id="wrap">
                <div id="container">
                    <div id='mypage'>
                        {/* 사이드바 */}
                        <aside id="aside">
                            <div className="DA-aside-txt">
                                <span className="user-name">{userName}</span>
                                <span className="user-id">{userId}</span>
                                <ul>
                                    <li><Link to='/user/mypage' className="DA-link">개인정보</Link></li>
                                    <li><Link to='/user/wishlist' className="DA-link">관심상품</Link></li>
                                    <li><Link to='/user/purchaselist' className="DA-link">구매내역</Link></li>
                                </ul>
                            </div>
                        </aside>

                        {/* 주요 콘텐츠 */}
                        <main id="content-2"> 
                            <h2>마이페이지</h2>
                            <span id="mypage-txt">개인 정보를 관리하십시오.</span>
                            <br /><br />

                            {/* 정보 수정 섹션 */}
                            <section className="DA-info-section">
                                <div className="DA-info-header">
                                    <h3>정보 수정</h3>
                                    <button className="DA-modal-btn" type='button' onClick={openModal}>수정</button>
                                </div>
                                <div className="DA-info-status">
                                    <p><strong>이름:</strong> {userName}</p>
                                    <p><strong>전화번호:</strong> {userHp}</p>
                                    <p><strong>주소:</strong> {userAddress}</p>
                                </div>
                            </section>

                            {/* 관심 상품 섹션 */}
                            <section className="DA-favorite-section">
                                <div className="DA-favorite-header">
                                    <h3>관심 상품</h3>
                                    <Link to='/user/wishlist' className="DA-link">더보기</Link>
                                </div>
                                <div className="DA-favorite-products">
                                    {likeList.length === 0 ? (
                                        <div className="empty-message">관심상품이 없습니다.</div>
                                    ) : (
                                        likeList.map((like, index) => (
                                            <div className="DA-product-info" key={index}>
                                                <img src={`${process.env.REACT_APP_API_URL}/upload/${like.imageSavedName}`} alt="상품사진" />
                                                <div className="DA-product-details">
                                                    <h4>{like.productName} {like.storageSize} {like.colorName}</h4>
                                                    <p>{(like.totalPrice).toLocaleString()}원</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                            {/* 구매 내역 섹션 */}
                            <section className="DA-purchaseList-section">
                                <div className="DA-purchaseList-header">
                                    <h3>구매 내역</h3>
                                    <Link to='/user/purchaselist' className="DA-link">더보기</Link>
                                </div>
                                <div className="DA-purchaseList-products">
                                    {purchaseList.length === 0 ? (
                                        <div className="empty-message">구매내역이 없습니다.</div>
                                    ) : (
                                        purchaseList.map((purchase, index) => (
                                            <div className="DA-purchaseList-info" key={index}>
                                                <img src={`${process.env.REACT_APP_API_URL}/upload/${purchase.imageSavedName}`} alt="상품사진" />
                                                <div className="DA-purchaseList-details">
                                                    <h4>{purchase.productName} {purchase.storageSize} {purchase.colorName}</h4>
                                                    <p>{(purchase.totalPrice).toLocaleString()}원</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                            {/* 모달 창 */}
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <div className='DA-modalContent'>
                                    <img src="../images/userInfo.png" alt="사람모양사진" />
                                    <p>개인 정보 수정</p>
                                    <form onSubmit={handleModify}>
                                        <input
                                            type='password'
                                            value={userPw}
                                            onChange={handlePassword}
                                            placeholder='암호'
                                            required
                                        />
                                        <input
                                            type='text'
                                            value={modalName}
                                            onChange={handleModalName}
                                            placeholder='이름'
                                            required
                                        />
                                        <input
                                            type='text'
                                            value={userHp}
                                            onChange={handlePhoneNumber}
                                            placeholder='전화번호'
                                            required
                                        />
                                        <input
                                            type='text'
                                            value={userAddress}
                                            onChange={handleAddress}
                                            placeholder='주소'
                                            required
                                        />
                                        <button type='submit'>수정</button>
                                    </form>
                                </div>
                            </Modal>

                        </main>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Mypage;
