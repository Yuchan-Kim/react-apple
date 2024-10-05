import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainList from './main/MainList.jsx';
import Search from './search/Search.jsx';
import Purchase from './main/purchasePage.jsx';
import PurchaseAcc from './main/purchasePageAcc.jsx'
import JoinForm from './user/JoinForm';
import LoginForm from './user/LoginForm';
import Mypage from './user/Mypage';
import PurchaseList from './user/PurchaseList.jsx';
import Comment from './community/Comment';
import Payok from './user/Payok'; 
import Payform from './user/Payform';
import Cart from './user/Cart';
import Wishlist from './user/Wishlist';

// 메인
import Main from './main/Main';

import './css/Reset.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/mainList' element={<MainList />} />
          <Route path='/search' element={<Search />} />
          <Route path='/purchaseAcc' element={<PurchaseAcc />} />
          <Route path='/purchase' element={<Purchase />} />
          <Route path='/user/joinform' element={<JoinForm />} />
					<Route path='/user/loginform' element={<LoginForm />} />
					<Route path='/user/mypage' element={<Mypage />} />
					<Route path='/user/purchaselist' element={<PurchaseList />} />
					<Route path='/community/comment' element={<Comment />} />

          {/* 메인 */}
          <Route path='' element={<Main />} />

          {/* 유저 */}
          <Route path='user/payok' element={<Payok />} /> 
          <Route path='user/payform' element={<Payform />} />
          <Route path='user/cart' element={<Cart />} />
          <Route path='user/wishlist' element={<Wishlist />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
