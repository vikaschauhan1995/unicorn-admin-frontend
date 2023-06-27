import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../redux/Auth/actions';
import { USER, AUTH_REDUCER, EMAIL } from '../redux/Auth/constants';
import style from '../style/Button.module.scss';
import '../style/Navbar.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state[AUTH_REDUCER]);
  const logout = () => {
    dispatch(logoutAction());
  }
  return (
    <header>
      <div className="container Navbar__container">
        <Link to="/">
          <h2>Notes</h2>
        </Link>
        <nav>
          {authState?.[USER] && (
            <div>
              <code className="font-weight-light">{authState?.[USER][EMAIL]}</code>
              <button className="btn btn-link" onClick={logout}>
                Logout
              </button>
            </div>
          )}
          {
            !authState?.[USER] && (
              <div>
                <button className={`${style.btn}`}>
                  <Link to="/login">
                    Login
                  </Link>
                </button>
                <button className={`${style.btn} ml-1`}>
                  <Link to="/signup">
                    Signup
                  </Link>
                </button>
              </div>
            )
          }
        </nav>
      </div>
    </header>
  )
}

export default Navbar;