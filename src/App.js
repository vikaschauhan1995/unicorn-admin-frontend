
import './App.css';
import {
  BrowserRouter, Routes, Route, Redirect, Navigate
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useEffect } from 'react';
import { AUTH_REDUCER, USER } from './redux/Auth/constants';
import { setUser } from './redux/Auth/actions';

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
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={state[USER] ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!state[USER] ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!state[USER] ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
