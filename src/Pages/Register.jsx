// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../store/Login/Login.action';
// react-icons
import { IoPersonAddSharp } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
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
import Topbar from '../Components/Topbar/Topbar';


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
  const [modified, setModified] = useState(false);

  const modePage = match.params.mode;
  const history = useHistory();
  const dispatch = useDispatch();
  // global state
  const user = useSelector(state => state.loginReducer.user);
  const userId = user.id;

  // checks if url param mode is 'update' and any user is logged in
  useEffect(() => {
    if (modePage === 'update')
      !isLogin()
        ? history.push('/')
        : dispatch(loginSuccess(JSON.parse(localStorage.getItem('loggedUser'))));
  }, [dispatch, history, modePage]);

  // url param mode must be 'insert' or 'update' only
  useEffect(() => {
    (modePage !== 'insert' && modePage !== 'update') ? history.push('/') : setMode(modePage);
  }, [history, modePage]);

  // when its updating mode, get user data and fill the form
  useEffect(() => {
    if (mode === 'update') {
      const headers = { Authorization: `Bearer ${user.token}` };
      userApi.get(`/users/${userId}`, { headers })
        .then(response => setUserRegister(response.data));
    }
  }, [mode, user.token, userId]);

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

    setModified(true);
  };

  const handleBackIcon = () => {
    window.history.back();
  }

  // when url param mode is set to insert access endpoint post, when is update access endpoint put
  const register = () => {
    const headers = { Authorization: `Bearer ${user.token}` };
    if (mode === 'insert') {
      userApi.post('/users/save', userRegister, { headers })
        .then(() => history.push('/'))
        .catch((e) => setError(e.response.data.message))
    }

    if (mode === 'update') {
      const { name, email } = userRegister;

      userApi.put(`/users/${userId}`, userRegister, { headers })
        .then(() => {
          dispatch(loginSuccess({ ...user, name, email }));
        })
        .catch((e) => setError(e.response.data.message))

      localStorage.setItem('loggedUser', JSON.stringify({ ...user, name, email }));
      history.push('/home');
    }
  };


  return (
    <div className="container">

      {mode === 'update' && <Topbar />}

      <div className="pageLoginContainer">
        {mode === 'update' &&
          <IoChevronBackCircleSharp className="backIcon" onClick={handleBackIcon} />
        }

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
                  && modified
                )
              }
            >
              {mode === 'insert' ? <span>Register</span> : <span>Update</span>}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};