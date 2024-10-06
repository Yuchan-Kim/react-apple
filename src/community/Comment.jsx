//import 라이브러리
import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';	
import axios from 'axios';
// import { useSearchParams} from 'react-router-dom';	파라미터값사용하는 라우터

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';
import ItemComment from './ItemComment';


//import css
import '../css/community.css';


const Comment = () => {

	/*---일반 변수 --------------------------------------------*/

    /*---라우터 관련------------------------------------------*/
    const { boardNum } = useParams();
    const navigate = useNavigate();

	/*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    // 답글 영역의 표시 여부를 관리하는 상태
    const [showReplyForm, setShowReplyForm] = useState(false);
    // 작성된 댓글 목록을 저장하는 상태
    const [comments, setComments] = useState([]);

    const [token, setToken] = useState(localStorage.getItem('token')); 

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [productName, setProductName] = useState("");
    const [boardTitle, setBoardTitle] = useState("");
    const [boardContent, setBoardContent] = useState("");
    const [boardDate, setBoardDate] = useState("");


	/*---일반 메소드 -----------------------------------------*/

	/*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    // 댓글 작성 후 처리        ...comments는 기존의 comments 배열을 복사한 후, 그 뒤에 새 댓글을 추가하는 형태, newComment는 새로운댓글내용,  toLocaleString는 현재 시각
    const handleSubmitComment = (newComment) => {
        setComments([...comments, { id: comments.length + 1, text: newComment, date: new Date().toLocaleString() }]);
        setShowReplyForm(false); // 댓글 작성 후 입력 폼 숨기기
    };


    // 답글 폼 보이기/숨기기 토글
    const toggleReplyForm = () => {
        setShowReplyForm((prev) => !prev);
    };

    // 취소 시 처리
    const handleCancel = () => {
        setShowReplyForm(false); // 폼 숨기기
    };


    // 마운트됐을때
    useEffect(()=>{
        console.log(boardNum);

        // 서버로 no값 보내서 no데이터 받기 그리고 화면에 출력하기 
        // 서버로 데이터 전송
        axios({
            method: 'get', // put, post, delete  수정폼-> 데이터 가져오기
            url: `${process.env.REACT_APP_API_URL}/api/communitys/${boardNum}`,

            responseType: 'json' //수신타입 받을때
        }).then(response => {
            console.log(response.data.result); //수신데이타  성공실패
            // console.log(response.data.apiData.name); //수신데이타   수정할사람의 이름

            if(response.data.result === 'success') {
                // 성공로직
                // useSate 사용해서 값 대입
                setId(response.data.apiData.id);
                setName(response.data.apiData.name);
                setProductName(response.data.apiData.productName);
                setBoardTitle(response.data.apiData.boardTitle);
                setBoardContent(response.data.apiData.boardContent);
                setBoardDate(response.data.apiData.boardDate);


            }else {
                // 실패로직 -> 리스트로 보내기
                navigate("/community");

            }

        }).catch(error => {
            console.log(error);
        }); 

    }, []); 


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
                            <span>{id}</span>
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
                                <button className='DA-contents-btn' type='button' onClick={toggleReplyForm}>답글</button>
                            ):(         //로그인 안했을때
                                <div></div>
                            )
                        }

                        {/* 답글 입력 폼 */}
                        {showReplyForm && (
                            <ItemComment 
                                onSubmit={handleSubmitComment}  // 부모로 댓글 전송
                                onCancel={handleCancel}  // 취소 시 처리
                            />
                        )}

                        <div id="comment">
                            <div className="DA-clearfix">
                                <span>댓글: ~</span>
                                <span>정렬기준: 최신순</span>
                            </div>

                            <form action='' method='' onSubmit="">

                                {/* 댓글 목록 */}
                                {comments.map((comment) => (
                                    <div key={comment.id}>
                                        <div className="DA-user-info">
                                            <img className="DA-join-png" src="/images/person.svg" alt="프로필사진" />
                                            <span>userId</span>
                                        </div>
                                        <p className='DA-whoComment'>{`누구~님에게 답변 ${comment.date}`}</p>
                                        <div className="DA-contents">
                                            <p>{comment.text}</p>
                                        </div>
                                    
                                    </div>
                                ))}

                                <div className="DA-user-info">
                                    <img className="DA-join-png" src="/images/person.svg" alt="프로필사진"/>
                                    <span>userId</span>
                                </div>
                                <p className='DA-whoComment'>누구~님에게 답변 2024.9.22 오후 02:16</p>
                                <div className="DA-contents">
                                    <p>
                                        저도 그런증상인데 하드웨어는 문제없고 소프트웨어 문제인것 같다고 고객센터 문의해서 답변 받았어요 ㅠㅠ 카메라앱을 지우고 다시 깔거나 핸드폰 초기화 하라고 
                                        하네요... 기본앱이라 지워지지도 않던데..ㅠㅠ 핸드폰 반품하고 싶어요 진짜 짜증나서 ㅠㅠ
                                    </p>
                                </div>
                                
                                <div className="DA-user-info">
                                    <img className="DA-join-png" src="/images/person.svg" alt="프로필사진"/>
                                    <span>userId</span>
                                </div>
                                <p className='DA-whoComment'>누구~님에게 답변 2024.11.19 오후 07:43</p>
                                <div className="DA-contents">
                                    <p>
                                        저도 똑같아요. 이게 전체적으로 소프트웨어 문제인가요.. 초기화 힘든데..
                                    </p>
                                </div>
                                

                            </form>
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