//import 라이브러리
import React from "react";
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import '../css/reset.css';
import '../css/communityList.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const CommunityList = () => {

    /*---라우터 관련-------------------------------*/
    
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    /*---일반 변수--------------------------------*/
    
    /*---일반 메소드 -----------------------------*/
    
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    
    return (
        <>
            <Header/>
            <div id="wrap">
                
                {/* contents */}
                <div id="contents">
                    <div id="community" className="clearfix">
                        <div className="hjy-tip-catrgory">
                            <Link to="/community" rel="noreferrer noopener">Community</Link>
                        </div>
                        <div className="hjy-tip">
                            <p className="hjy-tip1">유용한 답변을 다른 사람들과도 공유하고 싶으신가요? 그렇다면 추천 기능을 이용해보세요!</p>
                            <p className="hjy-tip2">회원님의 문제를 해결할 수 있도록 도움을 주신 분이 있었나요? 아니면 다른 사람의 답변이나 사용자 강좌가 도움이 되었나요? 그렇다면 추천해 주세요.</p>
                            <p className="hjy-tip3">자세히 알아보기: <Link to="#" rel="noreferrer noopener">추천하는 방법 알아보기 - Apple 커뮤니티</Link></p>
                        </div>
                        <div id="tip-search" className="clearfix">
                            <div className="hjy-img">
                                <img src="/images/iphone2.png" alt="상품이미지"/>
                            </div>
                            <div id="tip-keyword" className="clearfix">
                                <div className="hjy-tip-text">
                                    iPhone/ACC
                                </div>
                                <form action="" method="">
                                    <div className="hjy-input-container">
                                        <button type="button"><FaSearch /></button>
                                        <label htmlFor="keyword"></label>
                                        <input type="text" id="keyword" name="" value="" placeholder="검색 또는 질문하기"/>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div id="filter" className="clearfix">
                            <div id="action-left">
                                <Link to="/community/comment" rel="noreferrer noopener">커뮤니티에 질문하기</Link>
                            </div>
                            <div id="action-right">
                                <span>페이지1</span>
                                <Link to="#" rel="noreferrer noopener">&gt;</Link>
                            </div>
                        </div>

                        {/* <div id="filter" className="clearfix">
                            <div id="action-left">
                                <button>
                                    <span><img src="/images/filter.png" alt="필터"/></span>
                                    <span>필터</span>
                                </button>
                            </div>
                            <div id="action-right">
                                <span>페이지1</span>
                                <Link to="#" rel="noreferrer noopener">&gt;</Link>
                            </div>
                        </div> */}

                        {/* 반복구간 */}
                        <div id="community-post" className="clearfix">
                            <div className="hjy-profile">
                                <img src="/images/profile.jpg" alt="프로필"/>
                            </div>
                            <div className="hjy-title">
                                아이폰16프로 카메라 튕김
                            </div>
                            <div id="content" className="clearfix">
                                <div className="hjy-time">
                                    마지막 답글 20시간 전 작성자: gotohome
                                </div>
                                <div className="hjy-comment">
                                    댓글: 13
                                    </div>
                                <div className="hjy-hit">
                                    조회: 100
                                    </div>
                                <div className="hjy-question">
                                    질문자: 홍길동
                                </div>
                            </div>
                        </div>

                        <div id="community-post" className="clearfix">
                            <div className="hjy-profile">
                                <img src="/images/profile.jpg" alt="프로필"/>
                            </div>
                            <div className="hjy-title">
                                아이폰16프로 카메라 튕김
                            </div>
                            <div id="content" className="clearfix">
                                <div className="hjy-time">
                                    마지막 답글 20시간 전 작성자: gotohome
                                </div>
                                <div className="hjy-comment">
                                    댓글: 13
                                    </div>
                                <div className="hjy-hit">
                                    조회: 100
                                    </div>
                                <div className="hjy-question">
                                    질문자: 홍길동
                                </div>
                            </div>
                        </div>

                        <div id="community-post" className="clearfix">
                            <div className="hjy-profile">
                                <img src="/images/profile.jpg" alt="프로필"/>
                            </div>
                            <div className="hjy-title">
                                아이폰16프로 카메라 튕김
                            </div>
                            <div id="content" className="clearfix">
                                <div className="hjy-time">
                                    마지막 답글 20시간 전 작성자: gotohome
                                </div>
                                <div className="hjy-comment">
                                    댓글: 13
                                    </div>
                                <div className="hjy-hit">
                                    조회: 100
                                    </div>
                                <div className="hjy-question">
                                    질문자: 홍길동
                                </div>
                            </div>
                        </div>
                        {/* //반복구간 */}

                    </div>
                    {/* community */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default CommunityList;
