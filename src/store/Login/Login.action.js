import apiLogin from '../../services/userApi';

// CONSTS
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const IS_FETCHING = 'IS_FETCHING';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const ERROR_TO_FALSE = 'ERROR_FALSE';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
    success: true,
    isFetching: false
  }
};

export const isFetching = () => {
  return {
    type: IS_FETCHING,
    isFetching: true
  }
};

export const loginError = (message) => {
  return {
    type: LOGIN_ERROR,
    message,
    error: true,
    isFetching: false
  }
};

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch(isFetching());

    return apiLogin.post('/user/login', { email, password })
      .then((response) => dispatch(loginSuccess(response.data)))
      .catch(e => dispatch(loginError(e.response.data.message)));
  }
};

export const errorToFalse = () => {
  return {
    type: ERROR_TO_FALSE,
    error: false
  }
};

export const userLogout = () => {
  return {
    type: LOGOUT,
    user: {},
    loading: false,
    success: false,
    error: false
  }
};