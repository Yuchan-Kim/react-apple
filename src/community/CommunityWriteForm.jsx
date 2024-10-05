//import 라이브러리
import React from "react";
import { Link } from 'react-router-dom';

import '../css/reset.css';
import '../css/communityWriteForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const CommunityWriteForm = () => {

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
                    <div id="community-write" className="clearfix">
                        {/* <div className="write-catrgory">
                            <Link to="/community" rel="noreferrer noopener">Community</Link>
                        </div> */}
                        <div className="hjy-explanation">
                            <p className="hjy-exp1">질문하기</p>
                            <p className="hjy-exp2">더 나은 질문이 더 나은 답변을 얻게 됩니다.</p>
                            <p className="hjy-exp3">커뮤니티에 올리는 질문에는 기기, 소프트웨어 및 문제에 대한 명확한 설명 등 자세한 정보가 포함되어야</p>
                            <p className="hjy-exp4">합니다. 스크린샷이 문제 설명에 도움이 될 수 있지만 개인 정보는 포함되지 않도록 합니다.</p>
                        </div>

                        <form action="#" method="">
                            <div className="hjy-title">
                                <p>① 내용이 압축적으로 설명된 제목으로 시작합니다.</p>
                                <label className="hjy-form-text" htmlFor="txt-title"></label>
                                <input type="text" id="txt-title" name="" value="" placeholder="예: 기기 발열 및 배터리 문제 발생"/>
                            </div>

                            <div className="hjy-device">
                                <p>② 사용 중인 기기를 입력하세요.</p>
                                <label className="hjy-form-text" htmlFor="txt-device"></label>
                                <input type="text" id="txt-device" name="" value="" placeholder="예: iPhone 16 Pro "/>
                            </div>

                            <div className="hjy-content">
                                <p>③ 보다 자세한 정보를 제공합니다.</p>
                                <textarea name="content" cols="72" rows="5" value="" placeholder="문제를 재현하는 단계, 해당 기기 및 소프트웨어 등에 대한 자세한 정보를 제공하면 커뮤니티 회원이 질문에 답변하는 데 도움이 됩니다. 개인 정보는 포함하지 마세요."></textarea>
                            </div>

                            <div className="hjy-btns">
                                <button type="submit">글쓰기</button>
                                <Link to="#" rel="noreferrer noopener">취소</Link>
                            </div>
                        </form>

                    </div>
                    {/* community */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default CommunityWriteForm;