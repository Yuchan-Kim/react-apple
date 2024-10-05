//import 라이브러리
import React from 'react';
import { Link } from 'react-router-dom';
// import React, {useState} from 'react';	화면 상태관리
// import { useSearchParams} from 'react-router-dom';	파라미터값사용하는 라우터

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';

//import css
import '../css/user.css';

const LoginForm = () => {

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
                    
                    {/* <div id="aside"></div> */}

                    <div id="content">

                        <div id="user">

                            <div id="content-head">
                                <h1>Apple 계정</h1>
                                <div id="intro-text">Apple Store에 로그인하세요</div>
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
                                        <div id="message"></div>
                                    </div>

                                    {/* <!-- 버튼영역 --> */}
                                    <div className="DA-form-group">
                                        <button type="submit" id="btn-submit">로그인</button>
                                    </div>
                                    {/* 로그인되면 마이페이지 첫화면으로  */}

                                    <div className='DA-form-group'>
                                        <Link to='/user/joinform' id='DA-link' rel="noreferrer noopener">Apple 계정이 없습니까? 지금 만드세요.</Link>
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

export default LoginForm;
