import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link} from 'react-router-dom';

import '../css/purchase.css';
import Header from '../include/Header';
import Footer from '../include/Footer';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="yc-faq-item">
      <div className="yc-faq-question" onClick={toggleAnswer}>
        <h3>{question}</h3>
        <span className="yc-arrow-icon">{isOpen ? '-' : '+'}</span>
      </div>
      <div className={`yc-faq-answer ${isOpen ? 'yc-open' : 'yc-closed'}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

function PurchasePage() {
  const { productDetailNum } = useParams(); // URL에서 productDetailNum 가져오기
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProductDetailNum, setSelectedProductDetailNum] = useState(productDetailNum); // 선택된 productDetailNum 관리
  const [productBasicInfo, setProductBasicInfo] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [productStorages, setProductStorages] = useState([]);
  const [infoImages, setInfoImages] = useState([]);
  const [relatedModels, setRelatedModels] = useState([]);
  
  const navigate =useNavigate()
  
  // 이미지 슬라이더의 이전 버튼 핸들러
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? productImages.length - 1 : prevIndex - 1));
  };

  // 이미지 슬라이더의 다음 버튼 핸들러
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === productImages.length - 1 ? 0 : prevIndex + 1));
  };;

  // AppleCare 선택 상태 관리
  const [selectedAppleCare, setSelectedAppleCare] = useState(null); // null일 경우 아무것도 선택되지 않은 상태

  // AppleCare 옵션 클릭 처리
  const handleAppleCareOptionClick = (option) => {
    // 같은 항목을 클릭하면 선택 취소, 다른 항목 클릭 시 그 항목을 선택
    setSelectedAppleCare(selectedAppleCare === option ? null : option);
  }


  
  // productDetailNum을 기반으로 데이터를 가져오는 함수
  const fetchProductData = (detailNum) => {
    // 제품 기본 정보 가져오기
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/${detailNum}/info`)
      .then(response => {
        console.log("제품 기본 정보:", response.data.apiData);
        setProductBasicInfo(response.data.apiData);
        
        const productName = response.data.apiData.productName.toLowerCase();
        
        if (productName.includes('pro')) {
          // pro가 포함된 제품 호출
          axios.get(`${process.env.REACT_APP_API_URL}/api/product/${detailNum}/anotherPro`)
          .then(response => {
            console.log("pro가 포함된 제품:", response.apiData);
            setRelatedModels(response.data.apiData);
          })
          .catch(error => {
            console.error("pro 제품을 가져오는 중 오류 발생:", error);
          });
        } else if (productName.includes('se')) {
          // se가 포함된 제품 호출
          axios.get(`${process.env.REACT_APP_API_URL}/api/product/${detailNum}/anotherSe`)
          .then(response => {
            console.log("se가 포함된 제품:", response.apiData);
            setRelatedModels(response.data.apiData);
          })
          .catch(error => {
            console.error("se 제품을 가져오는 중 오류 발생:", error);
          });
        } else {
          // pro, se를 포함하지 않는 제품 호출
          axios.get(`${process.env.REACT_APP_API_URL}/api/product/${detailNum}/anotherRegular`)
          .then(response => {
            console.log("pro, se가 포함되지 않은 제품:", response.apiData);
            setRelatedModels(response.data.apiData);
          })
          .catch(error => {
            console.error("regular 제품을 가져오는 중 오류 발생:", error);
          });
        }
      })
      .catch(error => {
        console.error("제품 기본 정보를 가져오는 중 오류 발생:", error);
      });

    // 제품 이미지 가져오기
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/${detailNum}/productimages`)
      .then(response => {
        console.log("제품 이미지:", response.data.apiData);
        setProductImages(response.data.apiData || []);
      })
      .catch(error => {
        setProductImages([]);
        console.error("제품 이미지를 가져오는 중 오류 발생:", error);
      });

    // 추가 이미지 가져오기
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/${detailNum}/infoImages`)
      .then(response => {
        console.log("추가 이미지:", response.data.apiData);
        setInfoImages(response.data.apiData);
      })
      .catch(error => {
        console.error("추가 이미지를 가져오는 중 오류 발생:", error);
      });

    // 색상 가져오기
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/${detailNum}/colors`)
      .then(response => {
        setProductColors(response.data.apiData);
      })
      .catch(error => {
        console.error("색상 정보를 가져오는 중 오류 발생:", error);
      });

    // 용량 가져오기
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/${detailNum}/storages`)
      .then(response => {
        setProductStorages(response.data.apiData);
      })
      .catch(error => {
        console.error("용량 사이즈 정보를 가져오는 중 오류 발생:", error);
      });
  };


  // 장바구니에 담기 핸들러
  const handleAddToCart = (acceVo) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate('/user/loginform');
      return;  // 오류가 있으면 함수 중단
    }

    // axios 요청 반환
    return axios({  // 반드시 return으로 axios Promise 반환
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/product/addtocart`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        productDetailNum: acceVo.productDetailNum,  // undefined 확인 필요
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

  // 관심 상품 추가 핸들러
const handleAddToLiked = (acceVo) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log("토큰이 없습니다. 로그인하세요.");
    navigate('/user/loginform');

    return;  // 오류가 있으면 함수 중단
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
      productDetailNum: acceVo.productDetailNum,  // 관심 상품 추가를 위한 productDetailNum
    },
    responseType: 'json' 
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

  // 페이지 첫 로드 시와 productDetailNum 변경 시마다 데이터 다시 불러오기
  useEffect(() => {
    fetchProductData(selectedProductDetailNum);
  }, [selectedProductDetailNum]);

  // 모델 클릭 시 productDetailNum을 변경하여 화면 업데이트
  const handleModelClick = (newProductDetailNum) => {
    setSelectedProductDetailNum(newProductDetailNum);
  };

  // 색상 클릭 시 처리
  const handleColorClick = (colorProductDetailNum) => {
    setSelectedProductDetailNum(colorProductDetailNum);
  };

  // 용량 클릭 시 productDetailNum을 변경하여 화면 업데이트
  const handleStorageClick = (storageDetailNum) => {
    setSelectedProductDetailNum(storageDetailNum);
  };

  

  const faqData = [
    {
      question: 'SIM이 없는 iPhone은 왜 apple.com에서 구입하는 게 좋은가요?',
      answer: 'apple.com에서 구입하신 미개통 iPhone은 연락 기기입니다. 이동통신사 약정 없이 사용 가능합니다.',
    },
    {
      question: '국내에서 개통한 iPhone을 해외 네트워크에서도 사용할 수 있나요?',
      answer: '네, 전세계 어디서든 네트워크 사용이 가능합니다.',
    },
    {
      question: 'iPhone 반품이 가능한가요?',
      answer: '14일 이내에 반품이 가능합니다.',
    },
    {
      question: '새 기기로 자료를 전송하거나 새로 설정하는 일은 쉬운가요?',
      answer: '매우 쉽습니다! 간단한 단계로 기기 전송 및 설정이 가능합니다.',
    },
  ];


  if (!productBasicInfo) {
    // 아직 productBasicInfo가 로드되지 않았다면 로딩 상태를 표시
    return <p>제품 정보를 불러오는 중...</p>;
  }

  // 'New' 배지 표시 여부 결정
  const isNewProduct = productBasicInfo.productName.includes('16');

  return (
    <>
      <Header />

      <div className="yc-wrap">
        {/* iPhone Purchase Header Section */}
        <section className="yc-purchase-section">
          <div className="yc-purchase-header">
            {isNewProduct && <span className="yc-new-badge">New</span>}
            <h1>{productBasicInfo.productName} 구입하기</h1>
            <p className="yc-price">₩{(productBasicInfo.productPrice).toLocaleString()} 부터</p>
          </div>
        </section>

        {/* Model Images Section */}
        <section className="yc-model-images-section">
            <div className="yc-model-images">
            {productImages.length > 1 ? (
              <>
                <button className="yc-prev-button" onClick={handlePrevImage}>&#10094;</button>
                <img
                  src={`${process.env.REACT_APP_API_URL}/upload/${productImages[currentImageIndex].imageSavedName}`}
                  alt={productImages[currentImageIndex].imageSavedName}
                  className="yc-phone-image"
                />
                <button className="yc-next-button" onClick={handleNextImage}>&#10095;</button>
              </>
            ) : (
              productImages.slice(0, 1).map((image, index) => (
                <img
                  key={index}
                  src={`${process.env.REACT_APP_API_URL}/upload/${image.imageSavedName}`}
                  alt={image.imageSavedName}
                  className="yc-phone-image"
                />
              ))
            )}
            </div>

          {/* Model, Color, and Capacity Selection Section */}
          <div className="yc-selection-section">
            {/* Model Selection */}
            <div className="yc-model-selection">
              <h2>모델. 당신에게 딱 맞는 모델은?</h2>
              <div className="yc-model-options">
                {relatedModels.map((model) => (
                  <div 
                    className={`yc-model-option ${productBasicInfo.productName === model.productName ? 'yc-selected' : ''}`} 
                    key={model.productDetailNum} 
                    onClick={() => handleModelClick(model.productDetailNum)}
                  >
                    <p>
                      {model.productName}<br />
                      <span>{model.displaySize} 디스플레이</span>
                    </p>
                    <p className="yc-modelPrice">₩{(model.productPrice).toLocaleString()}부터</p>
                  </div>
                ))}
              </div>
              <div className="yc-compare-info">
                <p>모델 선택에 도움이 필요하신가요?</p>
                <button className="yc-info-button">+</button>
              </div>
            </div>

            {/* Color Selection */}
            <div className="yc-color-selection">
              <h2>색상. 맘에 드는 색상을 선택하세요.</h2>
              
              <div className="yc-color-options">
                {productColors.map((color) => (
                  <div
                    key={color.productDetailNum} // 각 색상별 고유한 colorNum 사용
                    className={`yc-color-circle ${productBasicInfo.colorCode === color.colorCode ? 'yc-selected' : ''}`} // selectedColor 상태와 비교하여 해당 색상이 선택되었는지 확인
                    style={{ backgroundColor: color.colorCode }} // 색상 코드로 배경색 설정
                    data-color={color.colorName} // 툴팁에 표시될 색상 이름
                    onClick={() => handleColorClick(color.productDetailNum)} // 클릭 시 해당 색상의 colorNum을 상태로 저장
                  ></div>
                ))}
              </div>
            </div>

            {/* Capacity Selection */}
            <div className="yc-capacity-selection">
              <h2>저장 용량. 당신에게 알맞은 저장 용량은?</h2>
              <div className="yc-capacity-options">
                {productStorages.map((storage) => (
                  <div 
                    className={`yc-capacity-option ${productBasicInfo.storageSize === storage.storageSize ? 'yc-selected' : ''}`} 
                    key={storage.productDetailNum} 
                    onClick={() => handleStorageClick(storage.productDetailNum)}
                  >
                    <p>{storage.storageSize}</p>
                    <p>₩{(storage.productPrice).toLocaleString()}부터</p>
                  </div>
                ))}
              </div>
              <div className="yc-storage-info-box">
                <p>용량이 얼마나 필요할지 확실치 않으신가요?</p>
                <p>자신에게 어느 정도의 저장 용량이 필요할지 감 잡아보기.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AppleCare+ Section */}
        <section className="yc-applecare-section">
          <h2>AppleCare+ 보증. 새로 구입한 iPhone을 보호하세요.</h2>
          <div className="yc-applecare-options">
            {/* AppleCare+ 선택 */}
              <div
                className={`yc-applecare-option ${selectedAppleCare === 'applecare' ? 'yc-selected' : ''}`}
                onClick={() => handleAppleCareOptionClick('applecare')}
              >
                <span className="yc-applecare-logo">
                  <span className="yc-apple-logo"></span>
                  <span className="yc-applecare-text"> AppleCare+</span>
                </span>
                <p>우발적인 손상에 대한 횟수 제한 없는 수리*</p>
                <p>Apple 정품 부품으로 진행되는 Apple 인증 수리 서비스</p>
                <p>Apple 전문가의 우선 지원</p>
              </div>

              {/* AppleCare+ 보증 추가 안 함 */}
              <div
                className={`yc-applecare-option-nocare ${selectedAppleCare === 'nocare' ? 'yc-selected' : ''}`}
                onClick={() => handleAppleCareOptionClick('nocare')}
              >
                <p>AppleCare+ 보증 추가 안 함</p>
              </div>
            <div className="yc-applecare-info">
              <div className="yc-info-box">
                <p className="yc-applecare-addons">
                  AppleCare+의 혜택은 무엇인가요? <br /> <br />
                  떨어뜨리거나 액체를 엎지르는 등의 우발적인 사고로부터 iPhone을 보호할 수 있습니다. 보장 내용을 살펴보세요.
                </p>
                
              </div>
            </div>
          </div>
        </section>

        {/* Final Purchase Section */}
        <section className="yc-final-purchase-section">
          <div className="yc-final-section">
            <div className="yc-final-image">
              <span>당신의 새<br />{productBasicInfo.productName}입니다.</span>
              <p className="yc-imageDesc">당신이 원하는 대로</p>
              {productImages.length > 0 ? (
                productImages.slice(-2, -1).map((image, index) => (
                  <img
                    key={index}
                    src={`${process.env.REACT_APP_API_URL}/upload/${image.imageSavedName}`}
                    alt={image.imageSavedName}
                    className="yc-final-iphone-image"
                  />
                ))
              ) : (
                <p>이미지를 불러올 수 없습니다.</p>
              )}
            </div>

            <div className="yc-final-details">
              <div className="yc-final-info">
                <p className="yc-final-price">₩{(productBasicInfo.productPrice).toLocaleString()}부터</p>
              </div>
              <div className="yc-final-info-details">
                <p>
                  시간이 좀 더 필요하신가요?<br />
                  선택한 기기를 관심 목록에 모두 저장해두고 언제든 살펴보던 곳부터 다시 이어보세요.
                </p>
                <p>
                <Link 
                  className="yc-save-for-later"
                  onClick={() => handleAddToLiked({ productDetailNum: selectedProductDetailNum })}
                >
                  관심 상품에 추가
                </Link>
                </p>
              </div>
              <div className="yc-final-info-details3">
                <p>거주 지역의 배송 관련 자세한 정보는 '결제' 단계에서 볼 수 있습니다.</p>
              </div>
            </div>

            <div className="yc-shipping-options">
              <ul className="yc-option">
              <li><svg class="as-svgicon-rtl-mirrored as-svgicon as-svgicon-boxtruck as-svgicon-reduced as-svgicon-boxtruckreduced" viewBox="0 0 25 25" role="img" aria-hidden="true" width="20px" height="20px"><path fill="none" d="M0 0h25v25H0z"></path><path fill="#1d1d1f" d="m23.482 12.847-2.92-3.209A1.947 1.947 0 0 0 18.985 9H17V6.495a2.5 2.5 0 0 0-2.5-2.5h-11a2.5 2.5 0 0 0-2.5 2.5v9.75a2.5 2.5 0 0 0 2.5 2.5h.548A2.746 2.746 0 0 0 6.75 21.02 2.618 2.618 0 0 0 9.422 19h6.681a2.744 2.744 0 0 0 5.347-.23h.735A1.656 1.656 0 0 0 24 16.98v-2.808a1.937 1.937 0 0 0-.518-1.325ZM8.426 18.745a1.74 1.74 0 0 1-3.352 0 1.577 1.577 0 0 1 .015-1 1.738 1.738 0 0 1 3.322 0 1.578 1.578 0 0 1 .015 1ZM9.447 18a2.726 2.726 0 0 0-5.394-.255H3.5a1.502 1.502 0 0 1-1.5-1.5v-9.75a1.502 1.502 0 0 1 1.5-1.5h11a1.502 1.502 0 0 1 1.5 1.5V18Zm10.972.77a1.738 1.738 0 0 1-3.337 0 1.573 1.573 0 0 1 0-1 1.742 1.742 0 1 1 3.337 1ZM23 16.98c0 .569-.229.79-.815.79h-.735A2.73 2.73 0 0 0 17 16.165V10h1.986a.976.976 0 0 1 .838.314l2.927 3.214a.95.95 0 0 1 .249.644Zm-1.324-3.36a.512.512 0 0 1 .174.38h-3.306a.499.499 0 0 1-.544-.528V11h1.073a.76.76 0 0 1 .594.268Z"></path></svg>무료 배송</li>
              <li><svg viewBox="0 0 35 35" class="as-svgicon as-svgicon-applestorepickup as-svgicon-base as-svgicon-applestorepickupbase" role="img" aria-hidden="true" width="20px" height="20px"><path fill="none" d="M0 0h35v35H0z"></path><path d="M25.5 7h-2.529a5.493 5.493 0 0 0-10.942 0H9.5A3.5 3.5 0 0 0 6 10.5v15A3.5 3.5 0 0 0 9.5 29h16a3.5 3.5 0 0 0 3.5-3.5v-15A3.5 3.5 0 0 0 25.5 7Zm-8-4a4.488 4.488 0 0 1 4.446 4h-8.892A4.488 4.488 0 0 1 17.5 3ZM28 25.5a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 7 25.5v-15A2.5 2.5 0 0 1 9.5 8h16a2.5 2.5 0 0 1 2.5 2.5Z"></path><path d="M20.272 17.075a2.326 2.326 0 0 1 1.078-1.94 2.348 2.348 0 0 0-2-1c-.759 0-1.375.463-1.782.463s-.968-.441-1.65-.441a2.719 2.719 0 0 0-2.541 3.021 6.311 6.311 0 0 0 1.056 3.363c.506.717.946 1.29 1.584 1.29s.9-.419 1.672-.419c.8 0 .968.408 1.661.408s1.155-.628 1.584-1.246a4.733 4.733 0 0 0 .693-1.444 2.215 2.215 0 0 1-1.355-2.055ZM17.621 14.021A1.966 1.966 0 0 0 19 13.294a2.328 2.328 0 0 0 .528-1.422 1.076 1.076 0 0 0-.011-.2 2.19 2.19 0 0 0-1.485.772 2.26 2.26 0 0 0-.561 1.378c0 .077.011.154.011.187.04.001.084.012.139.012Z"></path></svg>매장에서 픽업</li>
              </ul>
              <button 
                className="yc-continue" 
                onClick={() => handleAddToCart({ productDetailNum: selectedProductDetailNum })}
              >
                장바구니에 추가
              </button>


            </div>
          </div>
        </section>

        {productImages.length > 0 && (
          <div className="yc-model-images2">
            <img
              src={`${process.env.REACT_APP_API_URL}/upload/${productImages[productImages.length - 1].imageSavedName}`}
              alt={productImages[productImages.length - 1].imageSavedName}
              className="yc-phone-image"
            />
          </div>
        )}

        <div className="yc-environment-message">
          <p><strong>환경 보호를 위한 Apple의 목표.</strong></p>
          <p>
            2030년까지 탄소 중립을 달성하기 위한 Apple의 지속적인 노력의 일환으로 iPhone 제품 구성에는 전원 어댑터 및 EarPods이 포함되지 않습니다. 대신 급속 충전을 지원하고 USB-C 전원 어댑터 및 컴퓨터 포트와 호환되는 USB-C 충전 케이블은 포함되어 있습니다.
          </p>
          <p>
            호환되는 USB-C 전원 어댑터를 가지고 계신 경우 계속 사용하시길 권장합니다. 하지만 새로운 Apple 전원 어댑터 또는 헤드폰이 필요하다면 원하시는 제품을 구입할 수 있습니다.
          </p>
        </div>

        {infoImages.map((image, index) => (
          <div key={index} className={`yc-model-images${index + 3}`}>
            <img  key={index} src={`${process.env.REACT_APP_API_URL}/upload/${image.infoImageSavedName}`}alt = {image.infoImageSavedName}className="yc-phone-image" />
          </div>
        ))}

        {/* FAQ Section */}
        <section className="yc-faq-section">
          <h2>자주 묻는 질문</h2>
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default PurchasePage;
