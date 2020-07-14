import Cookies from 'js-cookie'
import axios from 'axios';

export const initialState = {
  isLoading: false,
  isAuthenticated: !!Cookies.get("accessToken"),
  error: null
};

export const START_LOGIN = "Login/START_LOGIN";
export const LOGIN_SUCCESS = "Login/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "Login/LOGIN_FAILURE";
export const RESET_ERROR = "Login/RESET_ERROR";
export const LOGIN_USER = "Login/LOGIN_USER";
export const SIGN_OUT_SUCCESS = "Login/SIGN_OUT_SUCCESS";

export const startLogin = () => ({
  type: START_LOGIN
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const loginUser = (userInfo) => dispatch => {

  dispatch(startLogin());

  axios.post("http://localhost:5000/graphql", {
    query: `
    mutation {
      tokenAuth(idToken: ${JSON.stringify(userInfo.tokenId)}) {
        token {
          accessToken
          refreshToken
        }
      }
    }
    `
  })
  .then((response) => {
    const tokenData = response.data.data.tokenAuth.token
    Cookies.set('accessToken', tokenData.accessToken);
    dispatch(loginSuccess())
  })
};

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
});

export const signOut = () => dispatch => {
  Cookies.remove("accessToken");
  dispatch(signOutSuccess());
};

export default function LoginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case START_LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case RESET_ERROR:
      return {
        error: false
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
