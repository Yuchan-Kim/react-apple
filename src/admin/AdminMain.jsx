import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

//css
import '../css/reset.css';
import '../css/adminMain.css';
import Header from '../include/Header'; 
import Footer from '../include/Footer';

const AdminMain = () => {
    return (
        <>
            <Header/>

            <div id="wrap">
                {/* 컨텐츠 */}
                <div id="contents" className="clearfix">
                    {/* admin_main */}
                    <div id="admin_main">
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
                        <div className="hjy-grid-container">
                        {/* 매장 관리 요약 */}
                            <div className="hjy-section" >
                                <div className="hjy-header">
                                    <h3>매장 관리</h3>
                                    <Link to="/admin/store" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-brief">
                                    <div className="hjy-card">
                                        <img id="store_Img" src="/images/gangnam.jpg" alt="애플스토어"/>
                                        <div className="hjy-detail">
                                            <p> Apple Store Gangnam</p>
                                        </div>
                                    </div>

                                    <div className="hjy-card">
                                        <img id="store_Img" src="/images/gangnam.jpg" alt="애플스토어"/>
                                        <div className="hjy-detail">
                                            <p> Apple Store Gangbook</p>
                                        </div>
                                    </div>

                                    <div className="hjy-card">
                                        <img id="store_Img" src="/images/gangnam.jpg" alt="애플스토어"/>
                                        <div className="hjy-detail">
                                            <p> Apple Store Gangseo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 상품 관리 요약 */}
                            <div className="hjy-section">
                                <div className="hjy-header">
                                    <h3>상품 관리</h3>
                                    <Link to="/admin/product" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-brief">
                                    <div className="hjy-card">
                                        <img id="sotre_Img" src="/images/iPhone.png" alt="상품이미지"/>
                                        <div className="hjy-detail">
                                            <p> iPhone16 Black</p>
                                        </div>
                                    </div>

                                    <div className="hjy-card">
                                        <img id="sotre_Img" src="/images/iPhone.png" alt="상품이미지"/>
                                        <div className="hjy-detail">
                                            <p> iPhone16 White</p>
                                        </div>
                                    </div>

                                    <div className="hjy-card">
                                        <img id="sotre_Img" src="/images/iPhone.png" alt="상품이미지"/>
                                        <div className="hjy-detail">
                                            <p> iPhone16 Gray</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 유저 관리 요약 */}
                            <div className="hjy-list-section">
                                <div className="hjy-list-header">
                                    <h3>회원 관리</h3>
                                    <Link to="/admin/user" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-list-status">
                                    <p>전체: 0</p>
                                </div>
                            </div>

                            {/* 배송 관리 요약 */}
                            <div className="hjy-list-section">
                                <div className="hjy-list-header">
                                    <h3>배송 관리</h3>
                                    <Link to="/admin/delivery" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-list-status">
                                    <p>배송중: 0  | 배송완료: 0</p>
                                </div>
                            </div>

                            {/* 판매 내역 요약 */}
                            <div className="hjy-list-section">
                                <div className="hjy-list-header">
                                    <h3>판매내역</h3>
                                    <Link to="/admin/history" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-list-status">
                                    <p>전체: 0  | 총 수익: 0</p>
                                </div>
                            </div>
                    </div>
                    </div>
                    {/* //admin_main */}
                </div>
                {/* contents */}
            </div>
            <Footer/>
        </>
    );
};

export default AdminMain;
