// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { BsFillShieldLockFill } from 'react-icons/bs';
import './LoginStyles.css';


export default function Login() {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  });

  const history = useHistory();


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
              className="field"
              placeholder="email *"
            />
            <input
              name="password"
              type="password"
              value={userLogin.password}
              onChange={handleInputChange}
              className="field"
              placeholder="password no spaces allowed"
            />
          </div>


          <button
            className="formButton"
          >
            Login
        </button>
        </div>
      </div>
    </div>
  );
};