import React from 'react';
import '../css/user.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="DA-modal-container">
            <div className="DA-modal-content apple-modal-content">
                <button onClick={onClose} className="apple-close-btn">&times;</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
