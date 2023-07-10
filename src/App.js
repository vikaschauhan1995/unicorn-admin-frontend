
import './App.scss';
import {
  BrowserRouter, Routes, Route, Redirect, Navigate
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Orders from './pages/Orders';
import Order from './pages/Order';
import Subuser from './pages/Subuser';
import { useEffect } from 'react';
import { AUTH_REDUCER, USER } from './redux/Auth/constants';
import { setUser } from './redux/Auth/actions';
import Sidebar from './components/Sidebar';
import PermissionWrapper from './wrappers/PermissionWrapper';
import Product from './pages/Product';
import Inventory from './pages/Inventory';
import { USER_TYPE } from './redux/Subuser/constants';
import DeliveredOrders from './pages/DeliveredOrders';

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state[AUTH_REDUCER]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(USER));
    if (user) {
      dispatch(setUser(user));
    }
  }, []);
  return (
    <div className="App">
      {
        state[USER] ?
          <div className="App__container">
            <BrowserRouter>
              <Navbar />
              <div className="App__root_container">
                <div className="App__sidebar">
                  <Sidebar />
                </div>
                <div className="App__body">
                  <PermissionWrapper user_type={state?.[USER]?.[USER_TYPE]}>
                    <Routes>
                      <Route exact path="/" element={<Home />} />
                      <Route exact path="/orders" element={<Orders />} />
                      <Route exact path="/order/:_id" element={<Order />} />
                      <Route exact path="/delivered_orders" element={<DeliveredOrders />} />
                      <Route exact path="/subuser" element={<Subuser />} />
                      <Route exact path="/product" element={<Product />} />
                      <Route exact path="/inventory" element={<Inventory />} />
                      <Route exact path="/login" element={<Navigate to="/" />} />
                      <Route exact path="/signup" element={<Navigate to="/" />} />
                      <Route path="*" element={<Home />} />
                    </Routes>
                  </PermissionWrapper>
                </div>
              </div>
            </BrowserRouter>
          </div>
          :
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </BrowserRouter>
      }
    </div>
  );
}

export default App;
