import axios from "axios";
import axiosV from "../../../axiosVahan";
import * as actionType from "./actionTypes";

const errorMsgGen = (error) => {
  let errorMsg = "";

  switch (error) {
    case "EMAIL_NOT_FOUND":
      errorMsg =
        "There is no user record corresponding to this identifier or the user may have been deleted.";
      break;
    case "INVALID_PASSWORD":
      errorMsg =
        "The password is invalid or the user does not have a password.";
      break;
    case "USER_DISABLED":
      errorMsg = "The user account has been disabled by an administrator.";
      break;
    case "EMAIL_EXISTS":
      errorMsg = "The email address is already in use by another account.";
      break;
    case "OPERATION_NOT_ALLOWED":
      errorMsg = "Password sign-in is disabled for this project.";
      break;
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      errorMsg =
        "We have blocked all requests from this device due to unusual activity. Try again later.";
      break;
    default:
      errorMsg = "Something just happend idk wut";
  }

  return errorMsg;
};

export const auth_start = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const auth = (email, token, id) => {
  return {
    type: actionType.AUTH_SUCCESS,
    token: token,
    email: email,
    id: id,
  };
};

export const auth_failed = (error, errorMsg) => {
  return {
    type: actionType.AUTH_FAILED,
    error: error,
    errorMsg: errorMsg,
  };
};

export const auth_done = () => {
  return {
    type: actionType.AUTH_DONE,
  };
};

export const authenticate = (email, password, username, type) => {
  return (dispatch) => {
    dispatch(auth_start());
    let url =
      type === "signin"
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;
    axios
      .post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .then((res) => {
        dispatch(auth(res.data.email, res.data.idToken, res.data.localId));
        setTimeout(() => {
          dispatch(auth_done());
        }, 2000);

        localStorage.setItem("id", res.data.localId);
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem(
          "expiresIn",
          new Date(new Date().getTime() + res.data.expiresIn * 1000)
        );

        if (type !== "signin") {
          let newUser = {
            email: email,
            username: username,
            state: "Maharashtra",
            district: "Pune",
            vehicles: [],
          };

          axiosV
            .post(`/users.json?auth=${res.data.idToken}`, newUser)
            .then((res) => {
              console.log("user created");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        const errorMessage =
          err.code === "ERR_NETWORK"
            ? "Network Error!"
            : errorMsgGen(err.response.data.error.message.split(":")[0].trim());

        dispatch(auth_failed(true, errorMessage));
      });
  };
};

export const logout = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("token");
  localStorage.removeItem("id");

  return {
    type: actionType.AUTH_LOGOUT,
  };
};

export const auto_login = () => {
  return (dispatch) => {
    const currTime = new Date(new Date().getTime());
    const expiryTime = new Date(localStorage.getItem("expiresIn"));

    if (currTime <= expiryTime) {
      const email = localStorage.getItem("mail");
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      dispatch(auth(email, token, id));
    } else {
      dispatch(logout());
    }
  };
};
