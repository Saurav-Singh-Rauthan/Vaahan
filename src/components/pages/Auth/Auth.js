import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import Validate from "../../Validator/Validator";
import Styles from "./Auth.module.css";
import Alert from "../../Alert/Alert";

const Auth = (props) => {
  let navigate = useNavigate();

  const [value, setValue] = useState("1");
  const [userSignInCred, setuserSignInCred] = useState({
    email: null,
    password: null,
  });

  const [signInTouch, setsignInTouch] = useState({
    emailTouched: false,
    passwordTouched: false,
  });

  const [userSignUpCred, setuserSignUpCred] = useState({
    username: null,
    email: null,
    password: null,
    confPassword: null,
  });

  const [signUpTouch, setsignUpTouch] = useState({
    usernameTouched: false,
    emailTouched: false,
    passwordTouched: false,
    confPasswordTouched: false,
  });

  const [authErr, setauthErr] = useState({
    err: null,
    errMsg: null,
  });

  const [alert, setalert] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setauthErr({
      err: props.error,
      errMsg: props.errorMsg,
    });
  }, [props.error]);

  useEffect(() => {
    if (props.redirect !== null) {
      navigate(props.redirect);
    }
  }, [props.redirect]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setuserSignInCred({
      email: null,
      password: null,
    });
    setuserSignUpCred({
      username: null,
      email: null,
      password: null,
      confPassword: null,
    });
    setsignInTouch({
      emailTouched: false,
      passwordTouched: false,
    });
    setsignUpTouch({
      usernameTouched: false,
      emailTouched: false,
      passwordTouched: false,
      confPasswordTouched: false,
    });
    setauthErr({
      err: null,
      errMsg: null,
    });
  };

  const inputChangeHandler = (event, type) => {
    let changedInput =
      type.substr(0, 6) === "signIn"
        ? { ...userSignInCred }
        : { ...userSignUpCred };

    if (type.substr(0, 6) === "signIn") {
      if (type === "signInEmail") {
        changedInput.email =
          event.target.value.length === 0 ? null : event.target.value;
      } else if (type === "signInPass") {
        changedInput.password =
          event.target.value.length === 0 ? null : event.target.value;
      }
      setuserSignInCred(changedInput);
    } else {
      if (type === "signUpName") {
        changedInput.username =
          event.target.value.length === 0 ? null : event.target.value;
      } else if (type === "signUpEmail") {
        changedInput.email =
          event.target.value.length === 0 ? null : event.target.value;
      } else if (type === "signUpPass") {
        changedInput.password =
          event.target.value.length === 0 ? null : event.target.value;
      } else if (type === "signUpConfPass") {
        changedInput.confPassword =
          event.target.value.length === 0 ? null : event.target.value;
      }
      setuserSignUpCred(changedInput);
    }
  };

  const touchHandler = (type) => {
    const updatedTouch =
      type.split("|")[0] === "signIn" ? { ...signInTouch } : { ...signUpTouch };

    switch (type.split("|")[1]) {
      case "mail":
        updatedTouch.emailTouched = true;
        break;
      case "pass":
        updatedTouch.passwordTouched = true;
        break;
      case "username":
        updatedTouch.usernameTouched = true;
        break;
      case "confpass":
        updatedTouch.confPasswordTouched = true;
        break;
      default:
        console.log("kuch to gadbad hai daya");
    }

    if (type.split("|")[0] === "signIn") {
      setsignInTouch(updatedTouch);
    } else {
      setsignUpTouch(updatedTouch);
    }
  };

  const resetPassHandler = (email) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert.open("success", "Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert.open("error", "Password mail not sent!");
      });
  };

  const signInDiv = (
    <div className={Styles.authContainer}>
      <TextField
        label="Email"
        type={"email"}
        variant="outlined"
        onChange={(event) => inputChangeHandler(event, "signInEmail")}
        helperText={
          signInTouch.emailTouched &&
          Validate(userSignInCred.email, "isMail|isRequired").errorMsg
            ? Validate(userSignInCred.email, "isMail|isRequired").errorMsg
            : "Your registered email ID"
        }
        error={
          signInTouch.emailTouched &&
          Validate(userSignInCred.email, "isMail|isRequired").isValid === false
            ? true
            : false
        }
        onBlur={() => touchHandler("signIn|mail")}
      />
      <TextField
        error={
          signInTouch.passwordTouched &&
          Validate(userSignInCred.password, "isRequired").isValid === false
            ? true
            : false
        }
        onBlur={() => touchHandler("signIn|pass")}
        label="Password"
        type={"password"}
        variant="outlined"
        helperText={
          signInTouch.passwordTouched &&
          Validate(userSignInCred.password, "isRequired").errorMsg
            ? Validate(userSignInCred.password, "isRequired").errorMsg
            : "Login password for registered ID"
        }
        onChange={(event) => inputChangeHandler(event, "signInPass")}
      />
      <p
        onClick={() => resetPassHandler(userSignInCred.email)}
        className={
          Validate(userSignInCred.email, "isMail|isRequired").isValid
            ? Styles.forgotPass
            : Styles.forgotPassDisabled
        }
      >
        Forgot Password
      </p>
      <p
        style={{ display: authErr.err === null ? "none" : "block" }}
        className={Styles.authErr}
      >
        {authErr.errMsg}
      </p>
      <button
        onClick={() =>
          props.authenticate(
            userSignInCred.email,
            userSignInCred.password,
            null,
            "signin"
          )
        }
        disabled={
          userSignInCred.email !== null &&
          userSignInCred.password !== null &&
          Validate(userSignInCred.password, "isRequired").isValid === true &&
          Validate(userSignInCred.email, "isMail|isRequired").isValid === true
            ? false
            : true
        }
      >
        {props.loading === true ? null : "SIGN IN"}
        <Box
          sx={{
            display: props.loading === true ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            size={window.innerWidth > 756 ? 36 : 14}
            sx={{ color: "#ffe26a" }}
          />
        </Box>
      </button>
    </div>
  );

  const signUpDiv = (
    <div className={Styles.authContainer}>
      <TextField
        label="User Name"
        type={"text"}
        variant="outlined"
        onChange={(event) => inputChangeHandler(event, "signUpName")}
        helperText={
          signUpTouch.usernameTouched &&
          Validate(userSignUpCred.username, "isRequired").errorMsg
            ? Validate(userSignUpCred.username, "isRequired").errorMsg
            : "Username for ID"
        }
        error={
          signUpTouch.usernameTouched &&
          Validate(userSignUpCred.username, "isRequired").isValid === false
            ? true
            : false
        }
        onBlur={() => touchHandler("signUp|username")}
      />
      <TextField
        label="Email"
        type={"email"}
        variant="outlined"
        onChange={(event) => inputChangeHandler(event, "signUpEmail")}
        helperText={
          signUpTouch.emailTouched &&
          Validate(userSignUpCred.email, "isMail|isRequired").errorMsg
            ? Validate(userSignUpCred.email, "isMail|isRequired").errorMsg
            : "Email for ID"
        }
        error={
          signUpTouch.emailTouched &&
          Validate(userSignUpCred.email, "isMail|isRequired").isValid === false
            ? true
            : false
        }
        onBlur={() => touchHandler("signUp|mail")}
      />
      <TextField
        label="Password"
        type={"password"}
        variant="outlined"
        onChange={(event) => inputChangeHandler(event, "signUpPass")}
        helperText={
          signUpTouch.passwordTouched &&
          Validate(userSignUpCred.password, "minLength 6|isRequired").errorMsg
            ? Validate(userSignUpCred.password, "minLength 6|isRequired")
                .errorMsg
            : "Password for ID"
        }
        error={
          signUpTouch.passwordTouched &&
          Validate(userSignUpCred.password, "minLength 6|isRequired")
            .isValid === false
            ? true
            : false
        }
        onBlur={() => touchHandler("signUp|pass")}
      />
      <TextField
        label="Confirm Password"
        type={"password"}
        variant="outlined"
        onChange={(event) => inputChangeHandler(event, "signUpConfPass")}
        helperText={
          signUpTouch.confPasswordTouched &&
          Validate(
            `${userSignUpCred.confPassword}|${userSignUpCred.password}`,
            "isEqual|minLength 6|isRequired"
          ).errorMsg
            ? Validate(
                `${userSignUpCred.confPassword}|${userSignUpCred.password}`,
                "isEqual|minLength 6|isRequired"
              ).errorMsg
            : "Confirm Password for ID"
        }
        error={
          signUpTouch.confPasswordTouched &&
          Validate(
            `${userSignUpCred.confPassword}|${userSignUpCred.password}`,
            "isEqual|minLength 6|isRequired"
          ).isValid === false
            ? true
            : false
        }
        onBlur={() => touchHandler("signUp|confpass")}
      />
      <p
        style={{ display: authErr.err === null ? "none" : "block" }}
        className={Styles.authErr}
      >
        {authErr.errMsg}
      </p>
      <button
        onClick={() =>
          props.authenticate(
            userSignUpCred.email,
            userSignUpCred.password,
            userSignUpCred.username,
            "signup"
          )
        }
        disabled={
          userSignUpCred.email !== null &&
          userSignUpCred.name !== null &&
          userSignUpCred.confPassword !== null &&
          userSignUpCred.password !== null &&
          Validate(
            `${userSignUpCred.confPassword}|${userSignUpCred.password}`,
            "isEqual|minLength 6|isRequired"
          ).isValid === true &&
          Validate(userSignUpCred.password, "minLength 6|isRequired")
            .isValid === true &&
          Validate(userSignUpCred.email, "isMail|isRequired").isValid ===
            true &&
          Validate(userSignUpCred.username, "isRequired").isValid === true
            ? false
            : true
        }
      >
        {props.loading === true ? null : "SIGN UP"}
        <Box
          sx={{
            display: props.loading === true ? "flex" : "none",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            size={window.innerWidth > 756 ? 36 : 14}
            sx={{ color: "#ffe26a" }}
          />
        </Box>
      </button>
    </div>
  );

  return (
    <React.Fragment>
      <Alert methods={setalert} />
      <div className={Styles.container}>
        <TabContext value={value}>
          <Box
            className={Styles.tabCont}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TabList onChange={handleChange} centered>
              <Tab label="Sign In" value="1" />
              <Tab label="Sign Up" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">{signInDiv}</TabPanel>
          <TabPanel value="2">{signUpDiv}</TabPanel>
        </TabContext>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.auth.token,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg,
    loading: state.auth.loading,
    redirect: state.auth.redirect,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticate: (email, password, username, type) => {
      dispatch(actions.authenticate(email, password, username, type));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
