import * as actionType from "../actions/actionTypes";
import axios from "axios";

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
    axios
      .get(
        `https://vaahan-1df59-default-rtdb.firebaseio.com/vehicles.json?auth=${localStorage.getItem(
          "token"
        )}`
      )
      .then((res) => {
        console.log(res,"global veh");
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetch_failed());
      });
  };
};
