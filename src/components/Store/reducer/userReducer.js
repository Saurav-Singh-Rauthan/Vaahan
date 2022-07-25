import * as actionTypes from "../actions/actionTypes";

const initialState = {
  email: null,
  state: null,
  username: null,
  district: null,
  id: null,
  vehicles: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_FETCH:
      return {
        ...state,
        email: action.email,
        state: action.state,
        district: action.district,
        id: action.id,
        vehicles: action.vehicles,
        username: action.username,
        error: null,
      };
    case actionTypes.USER_FAILED:
      return {
        email: null,
        state: null,
        district: null,
        id: null,
        vehicles: null,
        username: null,
        error: true,
      };
    default:
      return state;
  }
};

export default userReducer;
