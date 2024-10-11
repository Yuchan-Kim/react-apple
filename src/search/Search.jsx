import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import '../css/search.css';

import Header from '../include/Header';
import Footer from '../include/Footer';
import axios from 'axios';

// 검색 페이지 컴포넌트
const SearchPage = () => {
    // URL 파라미터에서 검색어 가져오기
    const { keyword } = useParams(); 
    // 상태 관리: 제품 검색 결과
    const [products, setProducts] = useState([]); 
    // 상태 관리: 매장 검색 결과
    const [stores, setStores] = useState([]); 
    // 상태 관리: 커뮤니티 검색 결과
    const [communities, setCommunities] = useState([]); 
    // 현재 활성화된 탭 상태 ('products', 'community', 'findStore' 중 하나)
    const [activeTab, setActiveTab] = useState('products'); 

    const navigate =useNavigate();


    // 컴포넌트가 마운트되거나 keyword가 변경될 때마다 실행되는 Effect
    useEffect(() => {
        // 제품 검색 API 호출
        axios.get(`http://${process.env.REACT_APP_API_URL}/api/search/products/${keyword}`)
            .then(response => {
                console.log('제품 응답:', response);
                const data = response.data;
                if (data.result === 'success') {
                    setProducts(data.apiData); // 제품 데이터 상태 업데이트
                } else {
                    console.error('제품 검색 결과가 없습니다:', data.message);
                }
            }).catch(error => {
                console.error('제품 검색 오류:', error);
            });

        // 매장 검색 API 호출
        axios.get(`http://${process.env.REACT_APP_API_URL}/api/search/stores/${keyword}`)
            .then(response => {
                console.log('매장 응답:', response);
                const data = response.data;
                if (data.result === 'success') {
                    setStores(data.apiData); // 매장 데이터 상태 업데이트
                } else {
                    console.error('매장 검색 결과가 없습니다:', data.message);
                }
            }).catch(error => {
                console.error('매장 검색 오류:', error);
            });

        // 커뮤니티 검색 API 호출
        axios.get(`http://${process.env.REACT_APP_API_URL}/api/search/communities/${keyword}`)
            .then(response => {
                console.log('커뮤니티 응답:', response);
                const data = response.data;
                if (data.result === 'success') {
                    setCommunities(data.apiData); // 커뮤니티 데이터 상태 업데이트
                } else {
                    console.error('커뮤니티 검색 결과가 없습니다:', data.message);
                }
            }).catch(error => {
                console.error('커뮤니티 검색 오류:', error);
            });
    }, [keyword]); // keyword가 변경될 때마다 Effect 재실행

    // 탭 클릭 시 활성화된 탭 상태 변경 함수
    const handleTabClick = (tab) => {
        setActiveTab(tab); 
    };

    return (
        <>
            <Header />
            <div className="wrap">
                {/* 탭 내비게이션 메뉴 */}
                <div className="yc-tabs-menu">
                    <ul>
                        <li
                            className={activeTab === 'products' ? 'yc-active' : ''}
                            onClick={() => handleTabClick('products')}
                        >
                            제품
                        </li>
                        <li
                            className={activeTab === 'community' ? 'yc-active' : ''}
                            onClick={() => handleTabClick('community')}
                        >
                            커뮤니티
                        </li>
                        <li
                            className={activeTab === 'findStore' ? 'yc-active' : ''}
                            onClick={() => handleTabClick('findStore')}
                        >
                            매장 찾기
                        </li>
                    </ul>
                    <h2>검색 결과: "{keyword}"</h2>
                </div>

                {/* 탭별 콘텐츠 */}
                <div className="yc-tab-content">
                    {/* 제품 탭 콘텐츠 */}
                    {activeTab === 'products' && (
                        <div className="yc-product-grid">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div key={product.productNum} className="yc-product-item">
                                        {/* 제품 이미지 */}
                                        <img src={product.imageSavedName || "https://via.placeholder.com/200"} alt={product.productName} />
                                        {/* 제품 이름 */}
                                        <h3>{product.productName}</h3>
                                        {/* 제품 가격 */}
                                        <p>가격: {(product.productPrice).toLocaleString()} 원 부터</p>
                                        {/* 제품 상세 페이지 링크 */}
                                        <Link to={`/purchase/${product.productNum}`}>자세히 보기</Link>
                                    </div>
                                ))
                            ) : (
                                <p>제품 검색 결과가 없습니다.</p>
                            )}
                        </div>
                    )}

                    {/* 커뮤니티 탭 콘텐츠 */}
                    {activeTab === 'community' && (
                        <div>
                            {communities.length > 0 ? (
                                communities.map((community) => (
                                    <div key={community.boardNum} className="community-item">
                                        {/* 게시글 제목 */}
                                        <h3>{community.boardTitle}</h3>
                                        {/* 조회수 및 날짜 */}
                                        <p>조회수: {community.boardViews} | 날짜: {community.boardDate}</p>
                                        {/* 게시글 상세 페이지 링크 */}
                                        <Link to={`/community/comment/${community.boardNum}`}>자세히 보기</Link>
                                    </div>
                                ))
                            ) : (
                                <p>커뮤니티 검색 결과가 없습니다.</p>
                            )}
                        </div>
                    )}

                    {/* 매장 찾기 탭 콘텐츠 */}
                    {activeTab === 'findStore' && (
                        <div className="yc-store-locator">
                            {stores.length > 0 ? (
                                stores.map((store) => (
                                    <div key={store.storeNum} className="yc-store-item">
                                        {/* 매장 이미지 */}
                                        <img src={store.storeImage || "https://via.placeholder.com/200"} alt={store.storeName} />
                                        {/* 매장 이름 */}
                                        <h3>{store.storeName}</h3>
                                        {/* 매장 주소 */}
                                        <p>{store.storeaddress}</p> {/* 여기서 storeaddress는 storeAddress로 수정 필요할 수 있음 */}
                                        {/* 매장 상세 페이지 링크 */}
                                        <Link to={`/store/${store.storeNum}`}>자세히 보기</Link>
                                    </div>
                                ))
                            ) : (
                                <p>매장 검색 결과가 없습니다.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SearchPage;
