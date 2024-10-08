//import 라이브러리
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    const [userId, setUserId] = useState(""); 
    const [userPw, setUserPw] = useState("");
    const [error, setError] = useState(""); 

    const navigate = useNavigate();

    /*---일반 메소드 -----------------------------------------*/

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    // 아이디 입력
    const handleId = (e) => {
        setUserId(e.target.value);
    }

    // 비밀번호 입력
    const handlePassword = (e) => {
        setUserPw(e.target.value);
    }

    // 로그인버튼 클릭했을때 (전송)
    const handleLogin = (e)=> {
        e.preventDefault(); 

        const userVo = {
            userId: userId,
            userPw: userPw
        }
        console.log(userVo);

        // 서버로 데이터 전송
        axios({
            method: 'post', 
            url: `${process.env.REACT_APP_API_URL}/api/users/login`,

            headers: { "Content-Type": "application/json; charset=utf-8" }, 	// post put

            data: userVo, // put, post, JSON(자동변환됨)

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            console.log(response.data); //수신데이타
            // console.log(response.data.apiData);

            // 응답처리
            if (response.data.result ==='success') {

                JSON.stringify(response.data.apiData); 

                const token = response.headers['authorization'].split(' ')[1];
    
                localStorage.setItem("token", token);
                
                localStorage.setItem("authUser", JSON.stringify(response.data.apiData));

                if (response.data.apiData.userStatus === "회원") {
                    // 리다이렉트
                    navigate("/");
                }else if (response.data.apiData.userStatus === "관리자") {
                    navigate("/admin/main");
                }
                
            }else {
                setError(response.data.message || "로그인 실패");
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
                    
                    {/* <div id="aside"></div> */}

                    <div id="content">

                        <div id="user">

                            <div id="content-head">
                                <h1>Apple 계정</h1>
                                <div id="intro-text">Apple Store에 로그인하세요</div>
                            </div>
                            {/* // content-head */}

                            <div id="joinForm">
                                <form action='' method='' onSubmit={handleLogin}>

                                    {/* 아이디 */}
                                    <div className='DA-form-group' >
                                        <input type='text' id='' name='' value={userId} onChange={handleId} placeholder='아이디' />
                                        {/* <button type='button' name='check' onClick='' >중복체크</button> */}
                                    </div>

                                    {/* 비밀번호 */}
                                    <div className='DA-form-group'>
                                        <input type='password' id='' name='input-pw' value={userPw} onChange={handlePassword} placeholder='암호' />
                                        <div id="message"></div>
                                    </div>

                                    {/* 오류 메시지 */}
                                    {error && (
                                        <div className="DA-error-message">{error}</div> 
                                    )}

                                    {/* <!-- 버튼영역 --> */}
                                    <div className="DA-form-group">
                                        <button type="submit" id="btn-submit">로그인</button>
                                    </div>
                                    {/* 로그인되면 마이페이지 첫화면으로  */}

                                </form>

                                    <div className='DA-form-group'>
                                        <Link to='/user/joinform' id='DA-link' rel="noreferrer noopener">Apple 계정이 없습니까? 지금 만드세요.</Link>
                                    </div>

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
