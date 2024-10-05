//import 라이브러리
import React, { useState } from "react";
import { Link } from 'react-router-dom';

import '../css/reset.css';
import '../css/storeAddForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const StoreAddForm = () => {

    /*---라우터 관련-------------------------------*/
    
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [storeNumber, setStoreNumber] = useState('');
    const [img, setImg] = useState();

    /*---일반 변수--------------------------------*/
    
    /*---일반 메소드 -----------------------------*/
    
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleAddress = (e) => {
        setAddress(e.target.value);
    }

    const handleStoreNumber = (e) => {
        setStoreNumber(e.target.value);
    }

    const handleImg = (e) => {
        setImg(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    return (
        <>
            <Header/>

            <div id="wrap">

                {/* 컨텐츠 */}
                <div id="contents">
                    {/* store_add */}
                    <div id="store_add" className="clearfix">
                        {/* aside */}
                        <div id="asides">
                            <h2><Link to="/admin/main" rel="noreferrer noopener">관리자 페이지</Link></h2>
                            <div id="sub_list"> 
                                <ul>
                                    <li><Link to="/admin/store" rel="noreferrer noopener">매장 관리</Link></li>
                                    <li><Link to="/admin/product" rel="noreferrer noopener">상품 관리</Link></li>
                                    <li><Link to="/admin/user" rel="noreferrer noopener">유저 관리</Link></li>
                                    <li><Link to="/admin/dilivery" rel="noreferrer noopener">배송 관리</Link></li>
                                    <li><Link to="/admin/history" rel="noreferrer noopener">판매 관리</Link></li>
                                </ul>
                            </div>
                        </div>
                    {/* //aside */}

                    {/* 상품 등록폼 */}
                    <div id="store_add_area">
                        <div id="store_new" >
                            <h2>매장 등록</h2>
                            <div id="store_add_item" className="clearfix" >
                                <form action="" method="post" onSubmit={handleSubmit}>
                                    <div className="hjy_store_content">
                                        <label htmlFor="store_name">이름:</label>
                                        <input type="text" id="store_name" name="" value={name} onChange={handleName} placeholder="이름을 입력하세요"/>
                                    </div>
                                    <div className="hjy_store_content">
                                        <label htmlFor="store_address">주소:</label>
                                        <input type="text" id="store_address" name="" value={address} onChange={handleAddress} placeholder="주소를 입력하세요"/>
                                    </div>
                                    <div className="hjy_store_content">
                                        <label htmlFor="store_number">전화번호:</label>
                                        <input type="text" id="store_number" name="" value={storeNumber} onChange={handleStoreNumber} placeholder="전화번호를 입력하세요"/>
                                    </div>
                                    <div className="hjy_store_content">
                                        <label htmlFor="store_image">이미지:</label>
                                        <input type="file" id="store_image" name="file" onChange={handleImg}/>
                                    </div>
                                    <div className="hjy_store_add_btnbox">
                                        <div className="hjy_store_add_btn">
                                            <button type="submit">등록</button>
                                        </div>
                                        <div className="hjy_store_cancel_btn">
                                            <button type="button"><Link to="/admin/store" rel="noreferrer noopener">취소</Link></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* //store_infos */}

                    </div>
                    {/* store_modify_area */}

                    </div>
                    {/* //store_add */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default StoreAddForm;
