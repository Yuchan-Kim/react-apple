import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainList from './main/MainList.jsx';
import MainListAcc from './main/MainListAcc.jsx';
import Search from './search/Search.jsx';
import PurchasePage from './main/purchasePage.jsx';
import PurchaseAcc from './main/purchasePageAcc.jsx'
import JoinForm from './user/JoinForm';
import LoginForm from './user/LoginForm';
import Mypage from './user/Mypage';
import PurchaseList from './user/PurchaseList.jsx';
import CommunityList from './community/CommunityList';
import CommunityWriteForm from './community/CommunityWriteForm';
import Comment from './community/Comment';
import Payok from './user/Payok'; 
import Payform from './user/Payform';
import Cart from './user/Cart';
import Wishlist from './user/Wishlist';

// 메인
import Main from './main/Main';

// 관리자
import AdminMain from './admin/AdminMain';
import StoreList from './admin/StoreList';
import ProductList from './admin/ProductList';
import UserList from './admin/UserList';
import StoreModifyForm from './admin/StoreModifyForm';
import ProductModifyForm6 from './admin/ProductModifyForm6';
import UserModifyForm from './admin/UserModifyForm';
import StoreAddForm from './admin/StoreAddForm';
import ProductAddForm from './admin/ProductAddForm';
import ProductAddForm2 from './admin/ProductAddForm2';
import ProductAddForm3 from './admin/ProductAddForm3';
import ProductAddForm4 from './admin/ProductAddForm4';
import ProductAddForm5 from './admin/ProductAddForm5';
import ProductAddForm6 from './admin/ProductAddForm6';
import DeliveryList from './admin/DeliveryList';
import HistoryList from './admin/HistoryList';

import StoreDetail from './main/StoreDetail';

import './css/reset.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/mainlist' element={<MainList />} />
          <Route path='/mainlistacc' element={<MainListAcc />} />
          <Route path='/search/:keyword' element={<Search />} /> 
          <Route path='/purchaseAcc/:productDetailNum' element={<PurchaseAcc />} />
          <Route path='/purchase/:productDetailNum' element={<PurchasePage />} />


          <Route path='/user/joinform' element={<JoinForm />} />
					<Route path='/user/loginform' element={<LoginForm />} />
					<Route path='/user/mypage' element={<Mypage />} />
					<Route path='/user/purchaselist' element={<PurchaseList />} />
          <Route path='/community' element={<CommunityList />} />
					<Route path='/community/comment/:boardNum' element={<Comment />} />
          <Route path='/community/write' element={<CommunityWriteForm />} />

          {/* 메인 */}
          <Route path='' element={<Main />} />

          {/* 유저 */}
          <Route path='user/payok' element={<Payok />} /> 
          <Route path='user/payform' element={<Payform />} />
          <Route path='user/cart' element={<Cart />} />
          <Route path='user/wishlist' element={<Wishlist />} />

          {/* 관리자 */}
          <Route path='/admin/main' element={<AdminMain />} />
          <Route path='/admin/store' element={<StoreList />} />
          <Route path='/admin/product' element={<ProductList />} />
          <Route path='/admin/user' element={<UserList />} />
          <Route path='/admin/store/modify' element={<StoreModifyForm />} />
          <Route path='/admin/product/modify6' element={<ProductModifyForm6 />} />
          <Route path='/admin/user/modify' element={<UserModifyForm />} />
          <Route path='/admin/store/add' element={<StoreAddForm />} />
          <Route path='/admin/product/add' element={<ProductAddForm />} />
          <Route path='/admin/product/add2' element={<ProductAddForm2 />} />
          <Route path='/admin/product/add3' element={<ProductAddForm3 />} />
          <Route path='/admin/product/add4' element={<ProductAddForm4 />} />
          <Route path='/admin/product/add5' element={<ProductAddForm5 />} />
          <Route path='/admin/product/add6' element={<ProductAddForm6 />} />
          <Route path='/admin/delivery' element={<DeliveryList />} />
          <Route path='/admin/history' element={<HistoryList />} />

          <Route path='/store/detail' element={<StoreDetail />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
