// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../store/Login/Login.action';
// react-icons
import { IoPersonAddSharp } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';
// services
import {
  passwordValidation,
  emailValidation,
  isLogin,
  generalValidation
} from '../services/loginServices';
import userApi from '../services/userApi';
// styles
import './LoginStyles.css';


export default function Register({ match }) {
  // local states
  const [userRegister, setUserRegister] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorName, setErrorName] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('insert');

  const modePage = match.params.mode;
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.loginReducer.user.id);

  // checks if a user is logged in
  useEffect(() => {
    !isLogin()
      ? history.push('/')
      : dispatch(loginSuccess(JSON.parse(localStorage.getItem('loggedUser'))));
  }, []);

  // param mode must be insert or update
  useEffect(() => {
    (modePage !== 'insert' && modePage !== 'update') ? history.push('/') : setMode(modePage);
  }, [history]);

  // when its updating mode, get user data and fill the form
  useEffect(() => {
    if (mode === 'update') {
      userApi.get(`/users/${userId}`)
        .then(response => setUserRegister(response.data));
    }
  }, [mode]);

  // checks if email and password are valid everytime object userRegister changes
  useEffect(() => {
    generalValidation(userRegister.name)
      ? setErrorName(false)
      : setErrorName(true);

    emailValidation(userRegister.email)
      ? setErrorEmail(false)
      : setErrorEmail(true);

    passwordValidation(userRegister.password)
      ? setErrorPassword(false) :
      setErrorPassword(true);
  }, [userRegister]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setUserRegister(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const register = () => {
    mode === 'insert'
      ? userApi.post('/users/save', userRegister)
          .then(() => history.push('/'))
          .catch((e) => setError(e.response.data.message))
      : userApi.put(`/users/${userId}`, userRegister)
          .then(() => history.push('/home'))
          .catch((e) => setError(e.response.data.message))
  };


  return (
    <div className="pageLoginContainer">
      <div className="loginContainer">

        <div className="icon">
          {mode === 'update' ? <MdModeEdit /> : <IoPersonAddSharp />}
        </div>

        {mode === 'insert'
          ? <p className="title">NEW USER</p>
          : <p className="title">UPDATE USER INFO</p>
        }

        <div className="form">
          <div className="fieldsContainer">
            <input
              name="name"
              type="text"
              autoFocus
              value={userRegister && userRegister.name}
              onChange={handleInputChange}
              className={`field ${errorName ? 'error' : 'noError'}`}
              placeholder="name *"
            />
            <input
              name="email"
              type="text"
              value={userRegister.email}
              onChange={handleInputChange}
              className={`field ${errorEmail ? 'error' : 'noError'}`}
              placeholder="email *"
            />
            <input
              name="password"
              type="password"
              value={userRegister.password}
              onChange={handleInputChange}
              className={`field ${errorPassword ? 'error' : 'noError'}`}
              placeholder="password (no spaces allowed)"
            />
          </div>

          {error && <span className="errorSpan">{error}</span>}

          <button
            className="formButton"
            onClick={register}
            disabled={
              !(generalValidation(userRegister.name)
                && emailValidation(userRegister.email)
                && passwordValidation(userRegister.password)
              )
            }
          >
            {mode === 'insert' ? <span>Register</span> : <span>Update</span>}
          </button>

        </div>
      </div>
    </div>
  );
};