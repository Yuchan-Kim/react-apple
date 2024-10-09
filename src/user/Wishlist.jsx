import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// css import
import '../css/Wishlist.css'; // CSS 파일 import
import Header from '../include/Header'; 
import Footer from '../include/Footer';


const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate =useNavigate();

  // 관심 목록 데이터를 가져오는 함수
  const fetchWishlistItems = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      return;
    }

    axios({
      method: 'get',
      url: 'http://localhost:9000/api/user/wishlist',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      setWishlistItems(response.data.apiData || []);
    })
    .catch(error => {
      console.log("관심 목록 데이터를 가져오는 중 오류 발생:", error);
    });
  };

  // 관심 목록 삭제 함수
  const handleRemoveAllLikedProducts = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate('/');
      return;
    }

    axios({
      method: 'delete',
      url: 'http://localhost:9000/api/product/unlike',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if (response.data.result === "success") {
        console.log("관심 상품 전체 삭제 성공");
        fetchWishlistItems(); // 삭제 후 목록을 다시 가져옴
      } else {
        console.log(response.data.message);
      }
    })
    .catch(error => {
      console.log("관심 상품 전체 삭제 실패", error);
    });
  };


  // 장바구니에 모든 관심 상품 담기 핸들러
const handleAddAllToCart = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log("토큰이 없습니다. 로그인하세요.");
    return;  // 오류가 있으면 함수 중단
  }

  // 모든 관심 상품을 장바구니에 추가하는 요청
  const addToCartPromises = wishlistItems.map(item => {
    return axios({
      method: 'post',
      url: 'http://localhost:9000/api/user/wishtocart',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        productDetailNum: item.productDetailNum,  // 각 상품의 productDetailNum 사용
      }
    });
  });

  // 모든 요청이 완료되면 새로고침
  Promise.all(addToCartPromises)
    .then(responses => {
      // 모든 응답이 성공적으로 처리되었을 때
      console.log("모든 관심 상품을 장바구니에 추가했습니다.");
      window.location.reload();  // 새로고침
    })
    .catch(error => {
      // 오류 처리
      console.log("장바구니 추가 실패", error);
    });
};


  // 페이지 로드시 관심 목록 데이터를 가져옴
  useEffect(() => {
    fetchWishlistItems();
  }, []);

  return (
    <>
      <Header/>
      <div className='wrap'>
        <div className="jm-wishlist-container">
          {/* 제목 섹션 */}
          <header>
            <h1 className="jm-title">나의 관심 목록</h1>
            <p className="jm-description">
              이전에 저장해둔 제품을 계속 쇼핑하세요. 관심 제품을 친구나 가족, 그리고 
              <strong> Apple </strong> 스페셜리스트와 공유하고 꼭 맞는 제품을 찾아보세요.
            </p>
          </header>

          {/* 관심 제품 섹션 */}
          <section className="jm-wishlist-sec`  tion">
            <div className="jm-section-header">
              <h2>관심 제품</h2>
              <Link 
                className="jm-edit-link" 
                onClick={handleRemoveAllLikedProducts}
              >
                전체 삭제
              </Link>
            </div>

            <div className="jm-wish-item">
              {/* 반복되는 제품 아이템 */}
              {wishlistItems.length > 0 ? wishlistItems.map((item, index) => (
                <div className="jm-product-item" key={index}>
                  <div className="jm-product-item-img">
                    <img src={item.imageSavedName || "https://via.placeholder.com/150"} alt={item.productName}/>
                  </div>
                  <span>{item.productName}</span>
                  <span>{item.storageSize}</span>
                  <span>{item.colorName}</span>

                </div>
              )) : (
                <p>관심 목록에 담긴 제품이 없습니다.</p>
              )}
              
            </div>

            <div className="jm-wishlist-info">
              <p>{wishlistItems.length}개 항목</p>
              <Link to="/user/cart" className="jm-detail-link" onClick={handleAddAllToCart}>전체 상품 장바구니로 이동</Link>
            </div>
          </section>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Wishlist;
