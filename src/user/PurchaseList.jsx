//import 라이브러리
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { useSearchParams} from 'react-router-dom';	파라미터값사용하는 라우터

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';

//import css
import '../css/user.css';

const PurchaseList = () => {

    /*---일반 변수 --------------------------------------------*/
    const token = localStorage.getItem('token'); 

    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    const [purchaseList, setPurchaseList] = useState([]);

    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userNum, setUserNum] = useState('');
    const [imageSavedName, setImageSavedName] = useState('');


    /*---일반 메소드 -----------------------------------------*/
    const getPurchaseList = ()=> {

        // 서버로 데이터 전송
        axios({
            method: 'get',   // 한명데이터 가져와
            url: `${process.env.REACT_APP_API_URL}/api/purchaselist`, 
            headers: { "Authorization": `Bearer ${token}`}, 	

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            console.log(response.data); //수신데이타

            const productList = response.data.apiData;

            if (response.data.result === 'success') {
                // 가져온데이터 화면에 반영
                setPurchaseList(productList);
                setUserId(productList[0].userId);
                setUserName(productList[0].userName);
                setUserNum(productList[0].userNum);
                
            }else {
                alert('구매이력 가져오기 실패');
            }

        }).catch(error => {
            console.log(error);
        });
        
    }


    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    useEffect(()=>{
        console.log("마운트 되었을때"); 
        getPurchaseList();

    }, []);


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
                                <span>{userId}</span>
                                <ul>
                                    <li><Link to='/user/mypage' className="DA-link" rel="noreferrer noopener">개인정보</Link></li>
                                    <li><Link to='/user/wishlist' className="DA-link" rel="noreferrer noopener">관심상품</Link></li>
                                    <li><Link to='/user/purchaselist' className="DA-link" rel="noreferrer noopener">구매내역</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* // aside */}

                        <div id="content-3"> 
                            <h2>주문하신 제품.</h2>

                            {/* 삼항연산자 */}
                            {  
                                (purchaseList.length === 0) ? (   // 거짓일때
                                    // 구매물품이 없을때
                                    <div id='DA-buy-none'>
                                        <p>
                                            구매하신 제품이 없습니다.<br /><br /><br /><br />
                                            주문이 보이지 않습니까? <Link to='/user/mypage' className="DA-buyLink" rel="noreferrer noopener">지금 구매하기</Link>
                                            <br /><br />
                                            현재 로그인되어 있는 계정은 {userId}입니다.
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

                                                {purchaseList.map((purchase, index)=>{
                                                    return(
                                                        <div className="DA-clearfix" key={index}>
                                                            <img src={`${process.env.REACT_APP_API_URL}/upload/${imageSavedName}`} alt="상품사진" />
                                                            {/* imageSavedName */}
                                                            <div className="DA-details">
                                                                <p>{purchase.productName}</p>
                                                                <p>{purchase.colorName}</p>
                                                                <p>{purchase.productCount}</p>
                                                                <p>{purchase.totalPrice}</p>
                                                                <p>{purchase.purchasedDate}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                
                                                {/* <div className="DA-clearfix">
                                                    <img src="../images/case.png" alt="상품사진" />
                                                    <div className="DA-details">
                                                        <p>실리콘 케이스</p>
                                                        <p>색상: ex_yellow</p>
                                                        <p>수량: ex_2</p>
                                                        <p>가격: 23,000</p>
                                                        <p>구매날짜: ex_2024-06-18</p>
                                                    </div>
                                                </div> */}
                                                
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
