//import 라이브러리
import React from 'react';
// import React, {useState} from 'react';	화면 상태관리
// import { Link } from 'react-router-dom';	링크걸기
// import { useSearchParams} from 'react-router-dom';	파라미터값사용하는 라우터

//import css
import '../css/user.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

    return (
        <div className="DA-modal-overlay">
            <div className="DA-modal-content">
                <button onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
