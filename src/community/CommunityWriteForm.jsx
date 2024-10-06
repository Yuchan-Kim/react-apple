//import 라이브러리
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';	

import '../css/reset.css';
import '../css/communityWriteForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const CommunityWriteForm = () => {

    /*---라우터 관련-------------------------------*/
    
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const [productName, setProductName] = useState([]);   // select문에 기기이름
    const [selectedProduct, setSelectedProduct] = useState('');

    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser'))); // 세션 스토리지에서 userNum 가져오기 (로그인세션)
    const userNum = authUser ? authUser.userNum : null; // userNum을 추출

    const navigate = useNavigate();

    /*---일반 변수--------------------------------*/
    
    /*---일반 메소드 -----------------------------*/
    
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    // 제목
    const handleTitle = (e) => {
        setBoardTitle(e.target.value);
    }
    
    // 기기
    const handleProduct = (e) => {
        setSelectedProduct(e.target.value);
    }
    
    // 내용
    const handleContent = (e) => {
        setBoardContent(e.target.value);
    }

    // 마운트됐을때
    useEffect(()=>{
        console.log("마운트 됐어요");

        // 서버로 데이터 전송
        axios({
            method: 'get', // put, post, delete
            url: `${process.env.REACT_APP_API_URL}/api/communitys/product`,

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            console.log(response); //수신데이타
            setProductName(response.data.apiData);

        }).catch(error => {
            console.log(error);
        });

    }, []);


    // 글쓰기
    const handleWrite = (e)=> {
        e.preventDefault();    

        // 데이터 모으고 묶기
        const communityVo = {
            userNum: userNum,
            boardTitle: boardTitle,
            productNum:parseInt(selectedProduct),
            boardContent: boardContent

        }
        console.log("communityVo" +communityVo);

        // 서버로 데이터 전송
        axios({
            method: 'post',        
            url: `${process.env.REACT_APP_API_URL}/api/communitys`,

            headers: { "Content-Type": "application/json; charset=utf-8" }, 	// post put 보낼때

            data: communityVo, // put, post, JSON(자동변환됨)

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            //console.log(response.data); //수신데이타
            console.log(communityVo);

            if (response.data.result ==='success') {
                // 리다이렉트
                navigate("/community");
            
            }else {
                alert("등록실패");
            }

        }).catch(error => {
            console.log(error);
        });

    }



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

                        <form action="#" method="" onSubmit={handleWrite}>
                            <div className="hjy-title">
                                <p>① 내용이 압축적으로 설명된 제목으로 시작합니다.</p>
                                <label className="hjy-form-text" htmlFor="txt-title"></label>
                                <input type="text" id="txt-title" name="" value={boardTitle} onChange={handleTitle} placeholder="예: 기기 발열 및 배터리 문제 발생"/>
                            </div>

                            <div className="hjy-device">
                                <p>② 사용 중인 기기를 입력하세요.</p>
                                <label className="hjy-form-text" htmlFor="txt-device"></label>
                                <select id="txt-device" name="productName" value={selectedProduct} onChange={handleProduct}>
                                    <option value="">예: iPhone 16 Pro</option>
                                    {productName.map((communityVo) => (
                                        <option key={communityVo.productNum} value={communityVo.productNum}>{communityVo.productName}</option> 
                                    ))}
                                </select>
                            </div>

                            <div className="hjy-content">
                                <p>③ 보다 자세한 정보를 제공합니다.</p>
                                <textarea name="content" cols="72" rows="5" value={boardContent} onChange={handleContent} placeholder="문제를 재현하는 단계, 해당 기기 및 소프트웨어 등에 대한 자세한 정보를 제공하면 커뮤니티 회원이 질문에 답변하는 데 도움이 됩니다. 개인 정보는 포함하지 마세요."></textarea>
                            </div>

                            <div className="hjy-btns">
                                <button type="submit">글쓰기</button>
                                <Link to="/community" rel="noreferrer noopener">취소</Link>
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