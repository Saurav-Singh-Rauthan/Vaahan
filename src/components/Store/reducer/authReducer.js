import * as actionType from "../actions/actionTypes";

const InitialState = {
  token: null,
  email: null,
  loading: null,
  id: null,
  error: null,
  errorMsg: null,
  redirect: null,
};

const authReducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        email: action.email,
        id: action.id,
      };
    case actionType.AUTH_FAILED:
      return {
        loading: null,
        email: null,
        token: null,
        id: null,
        redirect: null,
        error: action.err,
        errorMsg: action.errorMsg,
      };
    case actionType.AUTH_DONE:
      return {
        ...state,
        error: null,
        errorMsg: null,
        loading: null,
        redirect: "/",
      };
    default:
      return state;
  }
};

export default authReducer;
