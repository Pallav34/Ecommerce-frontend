import './App.css';
import Home from './pages/Home';


import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import LoginPage from './pages/Loginpage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { useEffect } from 'react';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage'
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPassword from './features/auth/components/ForgotPassword';
const router = createBrowserRouter([
  {
    path: '/',
    element: (<Protected>
      <Home></Home>
    </Protected>),
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  {
    path: '/cart',
    element: (<Protected>
      <CartPage></CartPage>
    </Protected>),
  },
  { 
    path: '/checkout',
    element: (<Protected>
      <Checkout></Checkout>
    </Protected>),
  },
  { 
    path: '/product-detail/:id',
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path:'/order-success/:id',
    element:(
      <OrderSuccessPage></OrderSuccessPage>
    )
  },
  {
    path:'/orders',
    element:(
      <UserOrdersPage></UserOrdersPage>
    )
  },
  {
    path:'/profile',
    element:(
      <UserProfilePage></UserProfilePage>
    )
  },
  {
    path:'/logout',
    element:<Logout></Logout>
  },
  {
    path:'/forgot-password',
    element:<ForgotPassword></ForgotPassword>
  },
  { 
    path: '*',
    element: (
      <PageNotFound></PageNotFound>
    ),
  },
])
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
