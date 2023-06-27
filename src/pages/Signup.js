import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { EMAIL, PASSWORD, AUTH_REDUCER, IS_SIGNUP_LOADING, SIGNUP_ERROR } from '../redux/Auth/constants';
import { signupAction } from '../redux/Auth/actions';
import style from '../style/Button.module.scss';
import '../style/Signup.scss';

const Signup = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state[AUTH_REDUCER]);
  const [state, setState] = useState({
    [EMAIL]: '',
    [PASSWORD]: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      [EMAIL]: state[EMAIL],
      [PASSWORD]: state[PASSWORD]
    }
    dispatch(signupAction(user));
  }
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (value !== '' && value !== undefined && value !== null) {
      setState({ ...state, [name]: value });
    } else {
      setState({ ...state, [name]: value });
    }
  }
  return (
    <div className="conatiner Signup__container">
      <div className="Signup__innerContainer">
        <div className="Signup__form_header">
          <div><h3>Signup</h3></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="Login__form_body my-2">
            <label>Email:</label>
            <Form.Control
              type="email" name={EMAIL} onChange={handleChange} value={state[EMAIL]}
              placeholder="enter email"
            />
            <br />
            <label>Password:</label>
            <Form.Control
              type="password" name={PASSWORD} onChange={handleChange} value={state[PASSWORD]}
              placeholder="password"
            />
          </div>
          <div className="Signup__form_footer">
            <div>
              <button className={style.btn} disabled={authState[IS_SIGNUP_LOADING]}>{authState[IS_SIGNUP_LOADING] ? "Loading..." : "Signup"}</button>
            </div>
          </div>
        </form>
        <div className="my-2" />
        {authState[SIGNUP_ERROR] && <Alert key="danger" variant="danger">
          {authState[SIGNUP_ERROR]}
        </Alert>}
      </div>
    </div>
  )
}

export default Signup
