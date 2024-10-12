//import 라이브러리
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userPw2, setUserPw2] = useState('');
    const [userName, setUserName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userHp, setUserHp] = useState('');

    const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태 추가

    const navigate = useNavigate();

    /*---일반 메소드 -----------------------------------------*/

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    // 아이디
    const handleId =(e)=> {
        setUserId(e.target.value);
    }

    // 비밀번호 일치 여부 체크
    const checkPassword = (userPw, setUserPw2) => {
        setPasswordMatch(userPw === setUserPw2);
    };

    // 비밀번호
    const handlePassword =(e)=> {
        setUserPw(e.target.value);
        checkPassword(e.target.value, userPw2)    // 일치여부 체크
    }
    // 비밀번호
    const handlePassword2 =(e)=> {
        setUserPw2(e.target.value);
        checkPassword(userPw, e.target.value)    // 일치여부 체크
    }

    // 이름
    const handleName =(e)=> {
        setUserName(e.target.value);
    }

    // 주소
    const handleAddress =(e)=> {
        setUserAddress(e.target.value);
    }

        
    // 전화번호
    const handlePhoneNumber =(e)=> {
        setUserHp(e.target.value);
    }

    // 중복체크 클릭했을때
    const handleCheck = ()=> {

        const unionVo= {
            userId: userId
        }
        console.log(unionVo);

         // 서버로 데이터 전송
        axios({
            method: 'post',         // 저장 (등록)
            url: `${process.env.REACT_APP_API_URL}/api/users/${userId}`,

            headers: { "Content-Type": "application/json; charset=utf-8" }, 	// post put 보낼때

            data: unionVo, // put, post, JSON(자동변환됨)

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            console.log(response.data); //수신데이타

            if (response.data.result ==='success') {
                alert("사용가능한 아이디입니다.");
            
            }else {
                alert("이미 가입된 아이디입니다.");
            }

        }).catch(error => {
            console.log(error);
        });

    }

    // 회원가입버튼 클릭했을때
    const handleJoin = (e)=> {
        e.preventDefault(); 

        const unionVo= {
            userId: userId,
            userPw: userPw,
            userName: userName,
            userAddress: userAddress,
            userHp: userHp
        }
        console.log(unionVo);

        // 서버로 데이터 전송
        axios({
            method: 'post',         // 저장 (등록)
            url: `${process.env.REACT_APP_API_URL}/api/users`,

            headers: { "Content-Type": "application/json; charset=utf-8" }, 	

            data: unionVo, // put, post, JSON(자동변환됨)

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            console.log(response.data); //수신데이타

            if (response.data.result ==='success') {
                // 리다이렉트
                navigate("/user/loginform");
            
            }else {
                alert("회원등록실패");
            }

        }).catch(error => {
            console.log(error);
        });

    }


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
                                <form action='' method='' onSubmit={handleJoin}> 

                                    {/* 아이디 */}
                                    <div className='DA-form-group id-check-group'>
                                        <input type='text' id='' className='DA-id' value={userId} onChange={handleId} placeholder='아이디' />
                                        <button type='button' className='DA-idcheck' onClick={handleCheck} >중복체크</button> 
                                    </div>

                                    {/* 비밀번호 */}
                                    <div className='DA-form-group'>
                                        <input type='password' id='' name='input-pw' value={userPw} onChange={handlePassword} placeholder='암호' />
                                        <br /><br />
                                        <input type='password' id='' name='input-pw' value={userPw2} onChange={handlePassword2} placeholder='암호 확인' />

                                        <div id="DA-message">
                                            {/* true가 아닐때   암호확인에 글이있을때 */}
                                            {!passwordMatch && userPw2 && (
                                                <span id="Da-F-message">입력한 암호가 일치하지 않습니다.</span>
                                            )}
                                            {passwordMatch && userPw2 && (
                                                <span></span>
                                            )}
                                        </div>

                                    </div>

                                    {/* 이름 */}
                                    <div className='DA-form-group'>
                                        <input type='text' id='' name='' value={userName} onChange={handleName} placeholder='이름' />
                                    </div>
                                    
                                    {/* 전화번호 */}
                                    <div className='DA-form-group'>
                                        <input type='text' id='' name='' value={userHp} onChange={handlePhoneNumber} placeholder='전화번호' />
                                        <div id='tel-txt'>
                                        항상 사용할 수 있는 전화번호를 입력하십시오. 새 기기나 웹 브라우저에 로그인할 때
                                        <br />해당 전화번호를 사용하여 신원을 확인합니다. 메시지 또는 데이터 요금이 적용될 수
                                        <br />있습니다.
                                        </div>
                                    </div>
                                    
                                    {/* 주소 */}
                                    <div className='DA-form-group'>
                                        <input type='text' id='' name='' value={userAddress} onChange={handleAddress} placeholder='주소' />
                                    </div>

                                    {/* <!-- 약관동의 --> */}
                                    <div className="DA-form-group">
                                        <input type="checkbox" id="chk-agree" value="" name="" required />
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
