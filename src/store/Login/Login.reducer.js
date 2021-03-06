import {
  LOGIN_SUCCESS,
  IS_FETCHING,
  LOGIN_ERROR,
  ERROR_TO_FALSE,
  LOGOUT
} from './Login.action';

const INITIAL_STATE = {
  user: {},
  success: false,
  isFetching: false,
  message: '',
  error: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        success: action.success,
        isFetching: action.isFetching
      }
    case IS_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        isFetching: action.isFetching,
        message: action.message
      }
    case ERROR_TO_FALSE:
      return {
        ...state,
        error: action.error,
      }
    case LOGOUT:
      return {
        ...state,
        user: action.user,
        loading: action.loading,
        success: action.success,
        error: action.error
      }
    default:
      return state
  }
};

export default loginReducer;