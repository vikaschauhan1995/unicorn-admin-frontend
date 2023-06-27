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
    <div className="container Navbar__container">
      <div className="Navbar__heading"><Link to="/">
        <h2>Unicorn</h2>
      </Link></div>
      <div className="Navbar__info">
        <nav>
          {authState?.[USER] && (
            <div>
              <code className="font-weight-light">{authState?.[USER][EMAIL]}</code>
              <button className="btn btn-link" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Navbar;