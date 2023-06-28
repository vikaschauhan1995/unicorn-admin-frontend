
import './App.css';
import {
  BrowserRouter, Routes, Route, Redirect, Navigate
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Order from './pages/Order';
import Subuser from './pages/Subuser';
import { useEffect } from 'react';
import { AUTH_REDUCER, USER } from './redux/Auth/constants';
import { setUser } from './redux/Auth/actions';
import Sidebar from './components/Sidebar';

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
          <div className="Home__container">
            <BrowserRouter>
              <Navbar />
              <div className="Home__root_container" style={{ backgroundColor: "red" }}>
                <div className="Home__sidebar">
                  <Sidebar />
                </div>
                <div className="Home__body">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route exact path="/order" element={<Order />} />
                    <Route exact path="/subuser" element={<Subuser />} />
                    <Route exact path="/login" element={<Navigate to="/" />} />
                    <Route exact path="/signup" element={<Navigate to="/" />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
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
