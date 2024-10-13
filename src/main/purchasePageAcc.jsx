import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/purchaseAcc.css';
import Header from '../include/Header';
import Footer from '../include/Footer';
import { BsMenuButtonFill } from 'react-icons/bs';

function PurchaseACC() {
  const { productDetailNum } = useParams();

  const [productAccInfo, setProductAccInfo] = useState({});
  const [infoImagesAcc, setInfoImagesAcc] = useState([]);
  const [productImagesAcc, setProductImagesAcc] = useState([]);
  const [relatedModelsAcc, setRelatedModelAcc] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  // AppleCare 선택 상태 관리
  const [selectedAppleCareAcc, setSelectedAppleCareAcc] = useState(null);

  useEffect(() => {
    // 제품 기본 정보 가져오기
    axios.get(`${process.env.REACT_APP_API_URL}/api/productAcc/${productDetailNum}/info`)
      .then(response => {
        setProductAccInfo(response.data.apiData);
      })
      .catch(error => {
        console.error('제품 기본 정보를 가져오는 중 오류 발생:', error);
      });

    // 제품 이미지 가져오기
    axios.get(`${process.env.REACT_APP_API_URL}/api/productAcc/${productDetailNum}/productimages`)
      .then(response => {
        setProductImagesAcc(response.data.apiData);
        setCurrentImageIndex(0); // 이미지 로드 시 인덱스 초기화
      })
      .catch(error => {
        console.error('제품 이미지를 가져오는 중 오류 발생:', error);
      });

    // 추가 이미지 가져오기
    axios.get(`${process.env.REACT_APP_API_URL}/api/productAcc/${productDetailNum}/infoImages`)
      .then(response => {
        setInfoImagesAcc(response.data.apiData);
      })
      .catch(error => {
        console.error('추가 이미지를 가져오는 중 오류 발생:', error);
      });

    // 관련 악세사리 가져오기
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/${productDetailNum}/relatedProducts`)
      .then(response => {
        setRelatedModelAcc(response.data.apiData);
      })
      .catch(error => {
        console.error('관련 악세사리를 가져오는 중 오류 발생:', error);
      });
  }, [productDetailNum]);

  // AppleCare 옵션 클릭 처리
  const handleAppleCareAccOptionClick = (option) => {
    setSelectedAppleCareAcc(selectedAppleCareAcc === option ? null : option);
  }

  // 이미지 넘기기 (순환하지 않도록 수정)
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex < productImagesAcc.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };
  
  // 장바구니 추가
  const handleAddToCart = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/user/loginform");
      return;  // 오류가 있으면 함수 중단
    }

    if (!productDetailNum) {
      console.error("productDetailNum이 없습니다.");
      return;
    }

    // axios 요청 반환
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/product/addtocart`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        productDetailNum: productDetailNum,
      }
    })
    .then(response => {
      if (response.data.result === "success") {
        console.log("장바구니 추가 성공");
        navigate('/user/cart');
      } else {
        console.log(response.data.message);
        navigate('/user/cart');
      }
    })
    .catch(error => {
      console.log("장바구니 추가 실패", error);
    });
  };

  // 관심상품 추가
  const handleAddToLiked = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate('/user/loginform');
      return;
    }

    if (!productDetailNum) {
      console.error("productDetailNum이 없습니다.");
      return;
    }

    // axios 요청 반환
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/api/user/addtoliked`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        productDetailNum: productDetailNum,  // 관심 상품 추가를 위한 productDetailNum
      }
    })
    .then(response => {
      if (response.data.result === "success") {
        console.log("관심 상품 추가 성공");
        navigate('/user/wishlist');
      } else {
        console.log(response.data.message);
        navigate('/user/wishlist');
      }
    })
    .catch(error => {
      console.log("관심 상품 추가 실패", error);
    });
  };

  if (!productImagesAcc || productImagesAcc.length === 0) {
    return <p>No images available.</p>;
  }

  return (
    <>
      <Header />

      <div className="wrap">
        {/* ACC Purchase Header Section */}
        <section className="yc-acc-purchase-section">
          <div className="yc-acc-purchase-header">
            <h1>{productAccInfo.productName || '제품 정보 없음'} 구매하기</h1>
            <p className="yc-acc-price">
              {productAccInfo.productPrice !== undefined 
                ? `₩ ${productAccInfo.productPrice.toLocaleString()}` 
                : '가격 정보를 불러오는 중...'}
            </p>
          </div>
        </section>

        {/* Model Images Section */}
        <section className="yc-acc-model-images-section">
          <div className="yc-acc-model-images-wrapper">
            {productImagesAcc.length > 0 ? (
              <>
                {/* Prev 버튼: 첫 번째 이미지가 아닐 때만 표시 */}
                {currentImageIndex > 0 && (
                  <button 
                    className="yc-accprev-button" 
                    onClick={handlePrevImage}
                    aria-label="이전 이미지"
                  >
                    &#10094;
                  </button>
                )}
                
                <img
                  src={`${process.env.REACT_APP_API_URL}/upload/${productImagesAcc[currentImageIndex].imageSavedName}`}
                  alt={productImagesAcc[currentImageIndex].imageSavedName}
                  className="yc-acc-phone-image"
                />

                {/* Next 버튼: 마지막 이미지가 아닐 때만 표시 */}
                {currentImageIndex < productImagesAcc.length - 1 && (
                  <button 
                    className="yc-accnext-button" 
                    onClick={handleNextImage}
                    aria-label="다음 이미지"
                  >
                    &#10095;
                  </button>
                )}
              </>
            ) : (
              <p>No images to display.</p>
            )}
          </div>

          {/* Selection Section */}
          <div className="yc-acc-selection-section">
            <h2>AppleCare+ 보증. 새로 구입한 악세사리를 보호하세요.</h2>
            <div className="yc-acc-applecare-options">
              {/* AppleCare+ 선택 */}
              <div
                className={`yc-acc-applecare-option ${selectedAppleCareAcc === 'applecare' ? 'yc-selected' : ''}`}
                onClick={() => handleAppleCareAccOptionClick('applecare')}
              >
                <span className="yc-acc-applecare-logo">
                  <span className="yc-acc-apple-logo"></span>
                  <span className="yc-acc-applecare-text"> AppleCare+</span>
                </span>
                <p>우발적인 손상에 대한 횟수 제한 없는 수리*</p>
                <p>Apple 정품 부품으로 진행되는 Apple 인증 수리 서비스</p>
                <p>Apple 전문가의 우선 지원</p>
              </div>

              {/* AppleCare+ 보증 추가 안 함 */}
              <div
                className={`yc-acc-applecare-option-nocare ${selectedAppleCareAcc === 'nocare' ? 'yc-selected' : ''}`}
                onClick={() => handleAppleCareAccOptionClick('nocare')}
              >
                <p>AppleCare+ 보증 추가 안 함</p>
              </div>
              <div className="yc-acc-applecare-info">
                <div className="yc-acc-info-box">
                  <p className="yc-acc-applecare-addons">
                    AppleCare+의 혜택은 무엇인가요? <br /> <br />
                    떨어뜨리거나 액체를 엎지르는 등의 우발적인 사고로부터 iPhone을 보호할 수 있습니다. 보장 내용을 살펴보세요.
                  </p>
                </div>
              </div>
            </div>

            {/* Price and Buttons */}
            <div className="yc-acc-price-section">
              {productAccInfo && productAccInfo.productPrice !== undefined ? (
                <>
                  <button 
                    className="yc-acc-continue" 
                    onClick={handleAddToLiked}
                  >
                    관심상품 추가
                  </button>
                  <button
                    className="yc-acc-continue" 
                    onClick={handleAddToCart}
                  >
                    장바구니에 추가
                  </button>
                </>
              ) : (
                <p>가격 정보를 불러오는 중...</p>
              )}
            </div>
          </div>
        </section>

        {/* 추가 이미지 섹션 */}
        <section className="yc-acc-additional-images">
          {infoImagesAcc.map((image, index) => (
            <div key={index} className="yc-acc-model-images-small">
              <img 
                src={`${process.env.REACT_APP_API_URL}/upload/${image.infoImageSavedName}`} 
                alt={image.infoImageSavedName}
                className="yc-acc-image"
              />
            </div>
          ))}
        </section>

        {/* Recommended Accessories Section */}
        <section className="yc-recommended-accessories">
          <h2 className="yc-section-title">마음에 들 만한 액세서리</h2>
          <div className="yc-accessory-list"> 
            {relatedModelsAcc.length > 0 ? (
              relatedModelsAcc.map((acc, index) => (
                <div key={index} className="yc-accessory-item">
                  <Link to={`/purchaseAcc/${acc.productDetailNum}`}>
                    <img 
                      src={`${process.env.REACT_APP_API_URL}/upload/${acc.imageSavedName}`} 
                      alt={acc.imageSavedName}
                      className="yc-accessory-image"
                    />
                  </Link>
                  <p>{acc.productName}</p>
                  <p>₩ {(acc.productPrice).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>추천 액세서리가 없습니다.</p>
            )}
          </div>
          <Link to="/mainlist" className="yc-more-products-button">더 많은 제품</Link>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default PurchaseACC;
