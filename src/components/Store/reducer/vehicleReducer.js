import * as actionType from "../actions/actionTypes";

const InitialState = {
  vehicles: null,
  error: null,
};

const vehicleReducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionType.VEH_FETCH:
      return {
        ...state,
        error: false,
        vehicles: action.vehicles,
      };
    case actionType.VEH_FAILED:
      return {
        ...state,
        vehicles: null,
        error: true,
      };
    default:
      return state;
  }
};

export default vehicleReducer;
