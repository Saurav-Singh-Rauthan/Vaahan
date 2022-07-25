import * as actions from "./actionTypes";
import axios from "axios";

const setdetails = (email, id, state, district, vehicles, username) => {
  return {
    type: actions.USER_FETCH,
    email,
    id,
    state,
    district,
    vehicles,
    username,
  };
};

const fetchFailed = () => {
  return {
    type: actions.USER_FAILED,
  };
};

export const fetchUserDetails = () => {
  return (dispatch) => {
    axios
      .get(
        `https://vaahan-1df59-default-rtdb.firebaseio.com/users.json?auth=${localStorage.getItem(
          "token"
        )}&orderBy="email"&equalTo="${localStorage.getItem("email")}"`
      )
      .then((res) => {
        const key = Object.keys(res.data)[0];
        dispatch(
          setdetails(
            res.data[key].email,
            key,
            res.data[key].state,
            res.data[key].district,
            res.data[key].vehicles,
            res.data[key].username
          )
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchFailed());
      });
  };
};
