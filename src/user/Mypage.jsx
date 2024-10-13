//import 라이브러리
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { useSearchParams} from 'react-router-dom';	파라미터값사용하는 라우터

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';
import Modal from './UserInfo-Modal';

//import css
import '../css/mypage.css';

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
    const [imageSavedName, setImageSavedName] = useState('');


    /*---일반 메소드 -----------------------------------------*/
    const getMypage = ()=> {

        // 서버로 데이터 전송
        axios({
            method: 'get',   // 한명데이터 가져와
            url: `${process.env.REACT_APP_API_URL}/api/users/me`,  // 수정폼의 역할
            headers: { "Authorization": `Bearer ${token}` },		// 토큰받기

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            console.log(response.data); //수신데이타

            const userVo = response.data.apiData;

            if (response.data.result === 'success') {
                // 가져온데이터 화면에 반영
                setUserId(userVo.userId);
                setUserName(userVo.userName);
                setModalName(userVo.userName);
                setUserHp(userVo.userHp);
                setUserAddress(userVo.userAddress);
                setPurchaseList(userVo.purchaseList || []); // 구매 내역
                setLikeList(userVo.likeList || []); // 관심 목록
                
            }else {
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
        setIsModalOpen(false);  // 모달 닫기
        setUserPw("");
        getMypage(); 
    };

    // 비밀번호
    const handlePassword =(e)=> {
        setUserPw(e.target.value);
    }

    // 이름
    const handleName =(e)=> {
        setUserName(e.target.value);
    }

    
    // 이름
    const handleModalName =(e)=> {
        setModalName(e.target.value);
    }

    // 전화번호
    const handlePhoneNumber =(e)=> {
        setUserHp(e.target.value);
    }

    // 주소
    const handleAddress =(e)=> {
        setUserAddress(e.target.value);
    }


    // 마운트 됐을때
    useEffect(()=>{

        getMypage();

    }, []);


    
    // 수정버튼 클릭했을때
    const handleModify  =(e)=> {
        e.preventDefault();

        // 바뀌는 값 모으기
        const userVo = {
            userPw: userPw,
            userName: modalName,
            userHp: userHp,
            userAddress: userAddress
        };
        console.log(userVo);

        // 서버로 데이터 전송
        axios({
            method: 'put',  // 수정
            url: `${process.env.REACT_APP_API_URL}/api/users/me`,

            // 헤더 두번쓰면 안되고 합쳐서 보내줘야함
            headers: { "Content-Type": "application/json; charset=utf-8",
                        "Authorization": `Bearer ${token}`                 // 토큰받기
                    }, 	
            data: userVo, // put, post, JSON(자동변환됨)

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            console.log(response.data.apiData); //수신데이타

            if(response.data.result === 'success') {
                // 로컬스토리지에 authUser의 이름을 변경
                const authUser = response.data.apiData     

                localStorage.setItem('authUser', JSON.stringify(authUser));     

                closeModal(); // 모달 닫기

            }else {
                alert("수정실패");
            }

        }).catch(error => {
            console.log(error);
        });

    };



    return (
        <>
            <Header />
            {/* // header */}

            <div id="wrap">

                <div id="container">
                    <div id='mypage'>

                        <div id="aside">
                            <div className="DA-aside-txt">
                                <span>{userName}</span>
                                <span id="mypage_userId-yc">{userId}</span>
                                <ul>
                                    <li><Link to='/user/mypage' className="DA-link" rel="noreferrer noopener">개인정보</Link></li>
                                    <li><Link to='/user/wishlist' className="DA-link" rel="noreferrer noopener">관심상품</Link></li>
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
                                    <p>이  름 : {userName}</p>
                                    <p>전화번호 : {userHp}</p>
                                    <p>주 소 : {userAddress}</p>
                                </div>
                            </div>
                            {/* // info-section */}

                            <div className="DA-favorite-section">
                                <div className="DA-favorite-header">
                                    <h3>관심 상품</h3>
                                    <Link to='/user/wishlist' className="DA-link" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="DA-favorite-products">
                                    {   (likeList.length == 0) ? (
                                            <div>
                                                <br />
                                                관심상품이 없습니다.
                                            </div>
                                        ) : (
                                            <>
                                                {likeList.map((like, index) => (
                                                    <div className="DA-product-info" key={index}>
                                                        <img src={`${process.env.REACT_APP_API_URL}/upload/${like.imageSavedName}`} alt={like.imageSavedName} />

                                                        <div className="DA-product-details">
                                                            <h4>{like.productName} {like.storageSize} {like.colorName}</h4>
                                                            <p>{(like.productPrice).toLocaleString()}원</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )
                                    }

                                    
                                        {/* <div className="DA-product-info">
                                            <img src="../images/case.png" alt="상품사진" />
                                            <div className="DA-product-details">
                                                <h4>실리콘 케이스</h4>
                                                <p>69,000</p>
                                            </div>
                                        </div> */}
                                </div>
                            </div>
                            {/* // favorite-section */}

                            <div className="DA-purchaseList-section">
                                <div className="DA-purchaseList-header">
                                    <h3>구매 내역</h3>
                                    <Link to='/user/purchaselist' className="DA-link" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="DA-purchaseList-products">
                                    {   (purchaseList.length == 0) ? (
                                                <div>
                                                    <br />
                                                    구매내역이 없습니다.
                                                </div>
                                            ) : (
                                                <>
                                                    {purchaseList.map((purchase, index) => (
                                                        <div className="DA-purchaseList-info" key={index}>
                                                            <img src={`${process.env.REACT_APP_API_URL}/upload/${purchase.imageSavedName}`} alt={purchase.imageSavedName} />

                                                            <div className="DA-purchaseList-details">
                                                                <h4>{purchase.productName} {purchase.storageSize} {purchase.colorName}</h4>
                                                                <p>{(purchase.productPrice).toLocaleString()}원</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                        )
                                    }
                                        {/* <div className="DA-purchaseList-info">
                                            <img src="../images/case.png" alt="상품사진" />
                                            <div className="DA-purchaseList-details">
                                                <h4>실리콘 케이스</h4>
                                                <p>69,000</p>
                                            </div>
                                        </div> */}
                                </div>
                                {/* // purchaseList-products */}
                            </div>
                            {/* // purchaseList-section */}

                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <div id='DA-modalContent'>
                                    <p>개인 정보 수정</p>

                                    <form action="" method="" onSubmit={handleModify}>
                                        <input type='password' id='' name='input-pw' value={userPw} onChange={handlePassword} placeholder='암호' />
                                        <br /><br />
                                        <input type='text' id='' name='' value={modalName} onChange={handleModalName} placeholder='이름' />
                                        <br /><br />
                                        <input type='text' id='' name='' value={userHp} onChange={handlePhoneNumber} placeholder='전화번호' />
                                        <br /><br />
                                        <input type='text' id='' name='' value={userAddress} onChange={handleAddress} placeholder='주소' />
                                        <br /><br /><br />
                                        <button type='submit'>수정</button>
                                    </form>
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
