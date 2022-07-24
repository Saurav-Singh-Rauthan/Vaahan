import * as actionTypes from "../actions/actionTypes";

const initialState = {
  email: null,
  state: null,
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
        error: null,
      };
    case actionTypes.USER_FAILED:
      return {
        email: null,
        state: null,
        district: null,
        id: null,
        vehicles: null,
        error: true,
      };
    default:
      return state;
  }
};

export default userReducer;
