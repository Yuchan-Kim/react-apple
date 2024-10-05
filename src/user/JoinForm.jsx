//import 라이브러리
import React from 'react';
// import React, {useState} from 'react';	화면 상태관리
// import { Link } from 'react-router-dom';	링크걸기
// import { useSearchParams} from 'react-router-dom';	파라미터값사용하는 라우터

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';

//import css
import '../css/user.css';

const JoinForm = () => {

    /*---일반 변수 --------------------------------------------*/

    /*---라우터 관련------------------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/

    /*---일반 메소드 -----------------------------------------*/

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/


    return (
        <>
            <Header />
            {/* // header */}

            <div id="wrap">

                <div id="container">

                    <div id="content">

                        <div id="user">

                            <div id="content-head">
                                <h1>Apple 계정 생성</h1>
                                <div id="intro-text">하나의 Apple 계정으로 모든 Apple 서비스를 이용할 수 있습니다.</div>
                            </div>
                            {/* // content-head */}

                            <div id="joinForm">
                                <form action='' method='' onSubmit=''>

                                    {/* 아이디 */}
                                    <div className='DA-form-group' >
                                        <input type='text' id='' name='' value='' onChange='' placeholder='아이디' />
                                        {/* <button type='button' name='check' onClick='' >중복체크</button> */}
                                    </div>

                                    {/* 비밀번호 */}
                                    <div className='DA-form-group'>
                                        <input type='password' id='' name='input-pw' value='' onChange='' placeholder='암호' />
                                        <br /><br />
                                        <input type='password' id='' name='input-pw' value='' onChange='' placeholder='암호 확인' />
                                        <div id="message"></div>
                                    </div>

                                    {/* 이름 */}
                                    <div className='DA-form-group'>
                                        <input type='text' id='' name='' value='' onChange='' placeholder='이름' />
                                    </div>
                                    
                                    {/* 전화번호 */}
                                    <div className='DA-form-group'>
                                        <input type='text' id='' name='' value='' onChange='' placeholder='전화번호' />
                                        <div id='tel-txt'>
                                        항상 사용할 수 있는 전화번호를 입력하십시오. 새 기기나 웹 브라우저에 로그인할 때
                                        <br />해당 전화번호를 사용하여 신원을 확인합니다. 메시지 또는 데이터 요금이 적용될 수
                                        <br />있습니다.
                                        </div>
                                    </div>
                                    
                                    {/* 주소 */}
                                    <div className='DA-form-group'>
                                        <input type='text' id='' name='' value='' onChange='' placeholder='주소' />
                                    </div>

                                    {/* <!-- 약관동의 --> */}
                                    <div className="DA-form-group">
                                        <input type="checkbox" id="chk-agree" value="" name="" />
                                        <label htmlFor="chk-agree">Apple의 개인정보 처리방침에 따라 개인 정보를 수집, 사용, 타사에  
                                            <br />대한 제공 및 처리하는 데 동의합니다.
                                        </label> 
                                    </div>

                                    <div className="DA-form-group">
                                        <img id="join-png" src="/images/join.png" alt="손잡는사진"/>
                                    </div>
                                    <div className="DA-form-group">
                                        <div id='join-txt'>
                                            Apple 계정 정보를 사용해 안전하게 계정에 로그인하고 데이터에 액세스합니다. Apple에서는 보안, 지원 및 <br />
                                            보고 목적으로 특정 데이터를 기록합니다. 동의하는 경우 Apple 서비스의 사용 정보에 기반한 마케팅<br /> 
                                            이메일과 소식 전송에 Apple 계정 정보를 사용할 수 있습니다.
                                        </div>
                                    </div>

                                    {/* <!-- 버튼영역 --> */}
                                    <div className="DA-form-group">
                                        <button type="submit" id="btn-submit">회원가입</button>
                                    </div>
                                </form>

                            </div>
                            {/* // joinForm */}

                        </div>
                        {/* // user */}

                    </div>
                    {/* // content */}

                </div>
                {/* // container */}

            </div>
            {/* // wrap */}

            <Footer />
            {/* // Footer */}
        </>
    );
}

export default JoinForm;
