import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// css import
import '../css/reset.css';
import '../css/Main.css'; // CSS 파일 import
import Header from '../include/Header'; 
import Footer from '../include/Footer';

const Wishlist = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 추가
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        'https://is1-ssl.mzstatic.com/image/thumb/hCfBMF1R8mitgipZtRrJIw/1250x703.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/rD_t7Cae0fHUD0oeqfejUA/1250x703.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/0JHAH9rqI68Wcs6W-7ImKQ/1250x703.jpg',
        'https://is1-ssl.mzstatic.com/image/thumb/fFOltSfH_F9HhYQHU1yDeg/1250x703.jpg',
    ];

    const handleIphone16ProClick = () => {
        navigate(`/purchase/1208`);
    };
    const handleIphone16Click = () => {
        navigate(`/purchase/1148`);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Changes every 3 seconds

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, [images.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <>
        <Header/>
        <div className='wrap'>
        <div className="jm-iphone-page-container">
            {/* iPhone 16 Pro Section */}
            <div className="jm-iphone-section">
            <h1 className="jm-iphone-title">iPhone 16 Pro</h1>
            <div className="jm-iphone-link"><Link to=""></Link></div>
            <div className="jm-iphone-buttons">
                <button className="jm-iphone-btn learn-more" onClick={handleIphone16ProClick}><span>더 알아보기</span></button>
            </div>
            <p className="jm-iphone-caption">Apple Intelligence, 연내 미국 영어로 우선 출시 예정*</p>
            </div>

            {/* iPhone 16 Section */}
            <div className="jm-iphone-section1">
            <h1 className="jm-iphone-title">iPhone 16</h1>
            <div className="jm-iphone-link"><Link to=""></Link></div>
            <div className="jm-iphone-buttons">
            <button to="/purchase/1148" className="jm-iphone-btn learn-more" onClick={handleIphone16Click}><span className='jm-more'>더 알아보기</span></button>
            </div>
            <p className="jm-iphone-caption">Apple Intelligence, 연내 미국 영어로 우선 출시 예정*</p>
            </div>
        </div>
        <div className='jm-apple-tv'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg" alt="appleTv"/>
        </div>

        {/* Slider Section */}
        <div className="jm-slider-container">
            <div
                className="jm-slider"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div className="jm-slide" key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            <a href='https://tv.apple.com/kr'><button className="jm-watch-now-btn">지금 시청하기</button></a>

            {/* Pagination Dots */}
            <div className="jm-pagination">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
        </div>
        <Footer/>
        </>
    );
};

export default Wishlist;
