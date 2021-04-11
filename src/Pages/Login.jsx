// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Redirect, Link } from 'react-router-dom';
// react-icons
import { BsFillShieldLockFill } from 'react-icons/bs';
// services
import {
  passwordValidation,
  emailValidation
} from '../services/loginServices';
// styles
import './LoginStyles.css';


export default function Register() {
  // local states
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  });
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);


  const history = useHistory();


  useEffect(() => {
    emailValidation(userLogin.email)
      ? setErrorEmail(false)
      : setErrorEmail(true);

    passwordValidation(userLogin.password)
      ? setErrorPassword(false) :
      setErrorPassword(true);
  }, [userLogin]);

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
              placeholder="password no spaces allowed"
            />
          </div>

          {/* {error && <span className="errorSpan">{errorMessage}</span>} */}

          <button
            className="formButton"
            // onClick={login}
            disabled={
              !(emailValidation(userLogin.email) && passwordValidation(userLogin.password))
            }
          >
            Login
          </button>

          <div className="no-account">
            <Link to="/register">
              <p onClick={() => <Redirect to="/register" />}>
                I don't have an account yet
              </p>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};