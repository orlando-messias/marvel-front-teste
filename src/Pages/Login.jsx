// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, errorToFalse } from '../store/Login/Login.action';
// react-icons
import { BsFillShieldLockFill } from 'react-icons/bs';
// services
import {
  passwordValidation,
  emailValidation,
  isLogin
} from '../services/loginServices';
// styles
import './LoginStyles.css';


export default function Login() {
  // local states
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  });
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);

  // get data from store
  const user = useSelector(state => state.loginReducer.user);
  const success = useSelector(state => state.loginReducer.success);
  const error = useSelector(state => state.loginReducer.error);
  const errorMessage = useSelector(state => state.loginReducer.message);

  const dispatch = useDispatch();

  const history = useHistory();

  // checks if a user is logged in
  useEffect(() => {
    if (isLogin()) history.push('/home');
  }, [history]);

  // checks if email and password are valid everytime object userLogin changes
  useEffect(() => {
    emailValidation(userLogin.email)
      ? setErrorEmail(false)
      : setErrorEmail(true);

    passwordValidation(userLogin.password)
      ? setErrorPassword(false) :
      setErrorPassword(true);
  }, [userLogin]);

  useEffect(() => {
    if (success) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      history.push('/home');
    }
    if (error) {
      setUserLogin({ email: '', password: '' });
      console.log('ERR ', errorMessage);
    }
  }, [success, error, dispatch, errorMessage, history, user]);

  const login = () => {
    const { email, password } = userLogin;
    dispatch(errorToFalse());
    dispatch(loginUser(email, password))
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setUserLogin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  return (
    <div className="pageLoginContainer">
      <div className="loginContainer">

        <div className="icon">
          <BsFillShieldLockFill />
        </div>

        <p className="title">LOGIN</p>

        <div className="form">
          <div className="fieldsContainer">
            <input
              name="email"
              type="text"
              autoFocus
              value={userLogin.email}
              onChange={handleInputChange}
              className={`field ${errorEmail ? 'error' : 'noError'}`}
              placeholder="email *"
            />
            <input
              name="password"
              type="password"
              value={userLogin.password}
              onChange={handleInputChange}
              className={`field ${errorPassword ? 'error' : 'noError'}`}
              placeholder="password (letters and numbers)"
            />
          </div>

          {error && <span className="errorSpan">{errorMessage}</span>}

          <button
            className="formButton"
            onClick={login}
            disabled={
              !(emailValidation(userLogin.email) && passwordValidation(userLogin.password))
            }
          >
            Login
          </button>

          <div className="no-account">
            <Link to="/register">
              <p onClick={() => history.push('/register/insert')}>
                I don't have an account yet
              </p>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};