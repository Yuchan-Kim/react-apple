import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

// CSS imports
import '../css/reset.css';
import '../css/storeDetail.css'; 
import Header from '../include/Header'; 
import Footer from '../include/Footer';



const StoreDetail = () => {
    const [searchParams] = useSearchParams();
    const storeNum = searchParams.get('storeNum');

    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [storeNumber, setStoreNumber] = useState('');
    const [storeImage, setstoreImg] = useState(); 
    const [storeMapImage, setMapImg] = useState();

    const getStoreList = () => {
        if (storeNum) {  // storeNum이 유효한 경우에만 실행
            axios({
                method: 'get', // put, post, delete
                url: `${process.env.REACT_APP_API_URL}/api/store/detail/${storeNum}`,
                responseType: 'json' // 수신타입
            }).then(response => {
                console.log(response.data); // 수신데이터 확인
    
                if(response.data.result === 'success') {
                    setStoreName(response.data.apiData.storeName);
                    setStoreAddress(response.data.apiData.storeAddress); // storeAddress로 수정
                    setStoreNumber(response.data.apiData.storeNumber); // storeNumber로 수정
                    setstoreImg(response.data.apiData.storeImage); // storeAddress로 수정
                    setMapImg(response.data.apiData.storeMapImage); // storeNumber로 수정
                } else {
                    alert("매장 정보 가져오기 실패");
                }
    
            }).catch(error => {
                console.log(error);
            });
        }
    }
    
    useEffect(() => {
        getStoreList();
    }, [storeNum]);  // storeNum이 변경될 때만 useEffect 재실행


    return (
        <>
            <div className="j-body-style">
                <Header />
                {/* Main Content */}
                <main classname="j-main">
                    {/* Store Information */}
                    <section className="j-store-info">
                        <h1>{storeName}</h1>
                    </section>

                    {/* Store Image */}
                    <section className="j-store-image">
                        <img 
                            src={`${process.env.REACT_APP_API_URL}/upload/${storeImage}`}
                            alt="storeimage" 
                        />
                    </section>

                    {/* Store Details Grid */}
                    <section className="j-store-details">
                        <div>
                            <h2 className='j-summary-heading'>주소</h2>
                            <p className='j-store-details-details'>{storeAddress}</p>
                            <p className='j-store-details-details'>{storeNumber}</p>
                            <p className='j-store-details-MapImage'>
                                <img src={`${process.env.REACT_APP_API_URL}/upload/${storeMapImage}`} alt="storeMapImage" />
                            </p>
                        </div>
                        <div>
                            <h2 className='j-summary-heading'>매장 운영 시간</h2>
                            <p className='j-store-details-details'>월요일		10:00 오전 - 10:00 오후</p>
                            <p className='j-store-details-details'>회요일		10:00 오전 - 10:00 오후</p>
                            <p className='j-store-details-details'>수요일		10:00 오전 - 10:00 오후</p>
                            <p className='j-store-details-details'>목요일		10:00 오전 - 10:00 오후</p>
                            <p className='j-store-details-details'>금요일		10:00 오전 - 10:00 오후</p>
                            <p className='j-store-details-details'>토요일		10:00 오전 - 10:00 오후</p>
                            <p className='j-store-details-details'>일요일		10:00 오전 - 10:00 오후</p>
                        </div>
                        <div>
                            <h2 className='j-summary-heading'>도움이 필요할 땐</h2>
                            <p className='j-store-details-details'>자신에게 맞는 제품 고르는 걸 도와드릴까요? Apple Store에서 당신만을 위한 전담 스페셜리스트와 함께 쇼핑하는 일대일 세션을 할 수 있습니다.</p>
                            <br />
                            <p className='j-store-details-details'>기기 설정부터 Apple 계정 복구, 스크린 교체까지 Genius 수리 서비스를 이용하실 수 있습니다</p>
                            <br />
                            <p className='j-store-details-details'>Apple 매장에서는 온디맨드 비디오 서비스를 통해 즉시 무료로 수어 통역 서비스를 이용하실 수 있습니다. 매장 내 세션 및 이벤트 참여 시 사전 요청을 하시면 대면 통역 서비스도 무료로 받으실 수 있습니다.°</p>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default StoreDetail;
