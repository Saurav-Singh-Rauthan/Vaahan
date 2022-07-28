import * as actionType from "../actions/actionTypes";
import axiosV from "../../../axiosVahan";

const vehicles = (vehicles) => {
  return {
    type: actionType.VEH_FETCH,
    vehicles,
  };
};

const fetch_failed = () => {
  return {
    type: actionType.VEH_FAILED,
  };
};

export const fetch_veh = () => {
  return (dispatch) => {
    axiosV
      .get(`/vehicles.json?auth=${localStorage.getItem("token")}`)
      .then((res) => {
        dispatch(vehicles(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetch_failed());
      });
  };
};
