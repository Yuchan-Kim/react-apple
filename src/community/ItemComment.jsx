// import 라이브러리
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';	링크걸기
// import { useSearchParams} from 'react-router-dom';	파라미터값사용하는 라우터

// import css
import '../css/community.css';

/// 안쓰는 폼 한페이지에 합쳤음

const ItemComment = ({ onSubmit, onCancel }) => {

    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    const [comment, setComment] = useState('');

    /*---일반 메소드 -----------------------------------------*/

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    const handleComment = (e) => {
        setComment(e.target.value);
    };

    // 글쓰기 버튼 클릭 시
    const handleSubmitComment = () => {
        if (comment.trim()) {
            onSubmit(comment);  // 부모 컴포넌트로 댓글 전송
            setComment(''); // 댓글 입력 초기화
        }
    };

    // 취소 버튼 클릭 시
    const handleCancel = () => {
        onCancel(); // 부모 컴포넌트에 취소 요청
        setComment(''); // 댓글 입력 초기화
    };

    return (
        <>
            {/* 답글버튼 눌렀을때 나타날 화면 */}
            <div className='DA-commentClick'>
                <textarea value={comment} onChange={handleComment} placeholder="의견을 알려 주십시오."></textarea>
                <br />
                <button className='DA-commentWrite-btn' type='button' onClick={handleSubmitComment}>글쓰기</button>
                <button className='DA-commentCancel-btn' type='button' onClick={handleCancel}>취소</button>
            </div>
        </>
    );
}

export default ItemComment;
