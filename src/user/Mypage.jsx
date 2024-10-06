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
import '../css/user.css';

const Mypage = () => {

    /*---일반 변수 --------------------------------------------*/
    const token = localStorage.getItem('token'); 

    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    /*---일반 메소드 -----------------------------------------*/

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 비밀번호
    const handlePassword =(e)=> {
        setPassword(e.target.value);
    }

    // 이름
    const handleName =(e)=> {
        setName(e.target.value);
    }

    // 전화번호
    const handlePhoneNumber =(e)=> {
        setPhoneNumber(e.target.value);
    }

    // 주소
    const handleAddress =(e)=> {
        setAddress(e.target.value);
    }


    // 마운트 됐을때
    useEffect(()=>{
        console.log("마운트 되었을때"); 

        // 서버로 데이터 전송
        axios({
            method: 'get',   // 한명데이터 가져와
            url: `${process.env.REACT_APP_API_URL}/api/users/me`,  // 수정폼의 역할
            headers: { "Authorization": `Bearer ${token}` },		// 토큰받기

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            console.log(response.data); //수신데이타

            const userVo = response.data.apiData
            // console.log(userVo);

            if (response.data.result === 'success') {
                // 가져온데이터 화면에 반영
                setId(userVo.id);
                setName(userVo.name);
                setPhoneNumber(userVo.phoneNumber);
                setAddress(userVo.address);
                
            }else {
                alert('회원정보 가져오기 실패');
            }

        }).catch(error => {
            console.log(error);
        });

    }, []);


    
    // 수정버튼 클릭했을때
    const handleModify  =(e)=> {
        e.preventDefault();

        // 바뀌는 값 모으기
        const userVo = {
            password: password,
            name: name,
            phoneNumber: phoneNumber,
            address: address
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
                const authUser = response.data.apiData      // 스프링부트에서 보내준?userVo
                // console.log(JSON.stringify(authUser));              // 문자열로 교체

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
                                <span>{name}</span>
                                <span>{id}</span>
                                <ul>
                                    <li><Link to='/user/mypage' className="DA-link" rel="noreferrer noopener">개인정보</Link></li>
                                    <li><Link to='user/wishlist' className="DA-link" rel="noreferrer noopener">관심상품</Link></li>
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
                                    <p>이  름 : {name}</p>
                                    <p>전화번호 : {phoneNumber}</p>
                                    <p>주 소 : {address}</p>
                                </div>
                            </div>
                            {/* // info-section */}

                            <div className="DA-favorite-section">
                                <div className="DA-favorite-header">
                                    <h3>관심 상품</h3>
                                    <Link to='user/wishlist' className="DA-link" rel="noreferrer noopener">더보기</Link>
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

                                    <form action="" method="" onSubmit={handleModify}>
                                        <input type='password' id='' name='input-pw' value={password} onChange={handlePassword} placeholder='암호' />
                                        <br /><br />
                                        <input type='text' id='' name='' value={name} onChange={handleName} placeholder='이름' />
                                        <br /><br />
                                        <input type='text' id='' name='' value={phoneNumber} onChange={handlePhoneNumber} placeholder='전화번호' />
                                        <br /><br />
                                        <input type='text' id='' name='' value={address} onChange={handleAddress} placeholder='주소' />
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
