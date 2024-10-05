//import 라이브러리
import React, {useState} from 'react';
import { Link } from 'react-router-dom';	
// import { useSearchParams} from 'react-router-dom';	파라미터값사용하는 라우터

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';
import ItemComment from './ItemComment';


//import css
import '../css/community.css';


const Comment = () => {

	/*---일반 변수 --------------------------------------------*/

	/*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    // 답글 영역의 표시 여부를 관리하는 상태
    const [showReplyForm, setShowReplyForm] = useState(false);
    // 작성된 댓글 목록을 저장하는 상태
    const [comments, setComments] = useState([]);


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
                            <span>userId</span>
                            <span>작성자</span>
                            <br />
                            <span>상품이름 ex_ iPhone 16</span>
                        </div>

                        <div className="DA-contents">
                            <p>제목 ex_아이폰 16 카메라 튕김</p>
                            <p>내용 ex_카메라 켜서 촬영하면 먹통이되고 바탕화면으로 자동으로 튕깁니다…
                                20일에 구매하였고 재부팅하면 또 안그러는데 구매 후 이틀만에 이런 현상이 두번이나 일어났습니다… 개인 메일주소를 남겨주시면 보다 자세한 동영상을 
                                첨부해 드리겠습니다. 왜그럴까요?
                            </p>
                            <p>게시일: 2024.9.22 오후 02:16</p>
                        </div>
                        {/* // contents */}

                        {/* 답글 버튼 */}
                        <button className='DA-contents-btn' type='button' onClick={toggleReplyForm}>답글</button>

                        {/* 답글 입력 폼 */}
                        {showReplyForm && (
                            <ItemComment 
                                onSubmit={handleSubmitComment}  // 부모로 댓글 전송
                                onCancel={handleCancel}  // 취소 시 처리
                            />
                        )}

                        <div id="comment">
                            <div className="DA-clearfix">
                                <span>댓글: 10</span>
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