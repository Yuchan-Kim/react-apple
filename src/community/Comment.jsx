//import 라이브러리
import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';	
import axios from 'axios';
// import { useSearchParams} from 'react-router-dom';	파라미터값사용하는 라우터

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';
// import ItemComment from './ItemComment';
///////////////////////////////////////////////////

//import css
import '../css/community.css';


const Comment = () => {

	/*---일반 변수 --------------------------------------------*/

    /*---라우터 관련------------------------------------------*/
    const { boardNum } = useParams();
    const navigate = useNavigate();

	/*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    // 답글 영역의 표시 여부를 관리하는 상태
    const [showCommentForm, setShowCommentForm] = useState(false);
    // 작성된 댓글 목록을 저장하는 상태
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState(''); // 댓글 입력 상태
    const [commentNum, setCommentNum] = useState(''); // 댓글 입력 상태

    const [token, setToken] = useState(localStorage.getItem('token')); 
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));


    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userNum, setUserNum] = useState("");
    const [productName, setProductName] = useState("");
    const [boardTitle, setBoardTitle] = useState("");
    const [boardContent, setBoardContent] = useState("");
    const [boardDate, setBoardDate] = useState("");
    const [commentDateTime, setCommentDateTime] = useState("");


	/*---일반 메소드 -----------------------------------------*/
    // 답글리스트 뽑는 메소드
    const getCommentList = ()=> {

        // 서버로 데이터 전송
        axios({
            method: 'get', // put, post, delete  수정폼-> 데이터 가져오기
            url: `${process.env.REACT_APP_API_URL}/api/communitys/${boardNum}`,

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            console.log(response.data.result); //수신데이타  성공실패

            if(response.data.result === 'success') {
                // 성공로직
                // useSate 사용해서 값 대입
                setUserId(response.data.apiData.userId);
                setUserName(response.data.apiData.userName);
                setUserNum(response.data.apiData.userNum);
                setProductName(response.data.apiData.productName);
                setBoardTitle(response.data.apiData.boardTitle);
                setBoardContent(response.data.apiData.boardContent);
                setBoardDate(response.data.apiData.boardDate);

                setCommentList(response.data.apiData.commentList);  // 댓글 목록을 상태에 설정

                console.log(response.data.apiData.commentList);
            }else {
                // 실패로직 -> 리스트로 보내기
                navigate("/community");
            }

        }).catch(error => {
            console.log(error);
        }); 

    }

	/*---생명주기 + 이벤트 관련 메소드 ----------------------*/


    // 답글 폼 보이기/숨기기 토글
    const toggleCommentForm = () => {
        setShowCommentForm((prev) => !prev);
    };

    // 댓글 입력 핸들러
    const handleComment = (e) => {
        setComment(e.target.value);
    };

    // 취소 시 처리
    const handleCancel = () => {
        setComment('');
        setShowCommentForm(false); // 폼 숨기기
    };


    // 마운트됐을때
    useEffect(()=>{
        console.log(boardNum);

        getCommentList();
        
    }, []); 


    // 글쓰기 (답글)
    const handleSubmitComment = (e)=> {
        e.preventDefault();    
        if (!comment.trim()) return alert('댓글을 입력하세요.');

        // 데이터 모으고 묶기
        const commentVo  = {
            comment: comment,
            boardNum: boardNum,
            userNum: authUser.userNum
        }
        console.log(commentVo);

        // 서버로 데이터 전송
        axios({
            method: 'post',         // 저장 (등록)
            url: `${process.env.REACT_APP_API_URL}/api/comments`,

            headers: { "Content-Type": "application/json; charset=utf-8" }, 	// post put 보낼때

            data: commentVo, // put, post, JSON(자동변환됨)

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            console.log("-----",response.data); //수신데이타
            console.log("-----",response.data.apiData.comment); //수신데이타

            if (response.data.result ==='success') {

                setComment('');
                setShowCommentForm(false); // 폼 숨기기
                
                getCommentList();
                
            }else {
                alert("댓글 등록실패");
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

                    <div id='nav'>
                        <div className="DA-tip_catrgory">
                            <Link className='DA-link' to="#" rel="noreferrer noopener">Community</Link>
                        </div>
                        <div className="DA-tip">
                            <p className="DA-tip1">유용한 답변을 다른 사람들과도 공유하고 싶으신가요? 그렇다면 추천 기능을 이용해보세요!</p>
                            <p className="DA-tip2">회원님의 문제를 해결할 수 있도록 도움을 주신 분이 있었나요? 아니면 다른 사람의 답변이나 사용자 강좌가 도움이 되었나요? 그렇다면 추천해 주세요.</p>
                            <p className="DA-tip3">자세히 알아보기: <Link className='DA-link' to="#" rel="noreferrer noopener">추천하는 방법 알아보기 - Apple 커뮤니티</Link></p>
                        </div>
                    </div>

                    <div id="content">
                        <div className="DA-writer-info">
                            <img className="DA-join-png" src="/images/person.svg" alt="프로필사진"/>
                            <span>{userId}</span>
                            <span>작성자</span>
                            <br />
                            <span>{productName}</span>
                        </div>

                        <div className="DA-contents">
                            <p>{boardTitle}</p>
                            <p>{boardContent}
                            </p>
                            <p>{boardDate}</p>
                        </div>
                        {/* // contents */}

                        {/* 답글 버튼 */}
                        {
                            (token != null)?( //로그인 했을때
                                <button className='DA-contents-btn' type='button' onClick={toggleCommentForm}>답글</button>
                            ):(         //로그인 안했을때
                                <div></div>
                            )
                        }

                        {/* 답글 입력 폼 */}
                        <form action='' method='' onSubmit={handleSubmitComment}>
                            {showCommentForm && (
                                <div className='DA-commentClick'>
                                    <textarea value={comment} onChange={handleComment} placeholder="의견을 알려 주십시오."></textarea>
                                    <br />
                                    <button className='DA-commentWrite-btn' type='submit' >글쓰기</button>
                                    <button className='DA-commentCancel-btn' type='button' onClick={handleCancel}>취소</button>
                                </div>
                            )}
                        </form>


                        <div id="comment">
                            <div className="DA-clearfix">
                                <span>댓글: {commentList.length}</span>
                                <span>정렬기준: 최신순</span>
                            </div>

                                {/* 댓글 목록 */}
                                {commentList && commentList.length > 0 ? (
                                    commentList.map((commentList) => (
                                        <div key={commentList.commentNum}>
                                            <div className="DA-user-info">
                                                <img className="DA-join-png" src="/images/person.svg" alt="프로필사진" />
                                                <span>{commentList.userId}</span>
                                            </div>
                                            <p className='DA-whoComment'>{commentList.commentDateTime}</p>
                                            <div className="DA-contents">
                                                <p>{commentList.comment}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="DA-user-info">댓글이 없습니다.</div>  // 댓글이 없을 경우 표시할 내용
                                )}
                                
                        </div>
                        {/* // comment */}

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

export default Comment;