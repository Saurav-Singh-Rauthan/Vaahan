import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";

import Styles from "./Auth.module.css";

const Auth = (props) => {
  const [value, setValue] = React.useState("1");
  const [userSignInCred, setuserSignInCred] = useState({
    email: null,
    password: null,
  });

  const [userSignUpCred, setuserSignUpCred] = useState({
    username: null,
    email: null,
    password: null,
    confPassword: null,
  });

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

  const signInDiv = (
    <div className={Styles.authContainer}>
      <TextField
        label="Email"
        type={"email"}
        variant="outlined"
        helperText="Your registered email ID"
        onChange={(event) => inputChangeHandler(event, "signInEmail")}
      />
      <TextField
        label="Password"
        type={"password"}
        variant="outlined"
        helperText="login password for registered ID"
        onChange={(event) => inputChangeHandler(event, "signInPass")}
      />
      <button
        disabled={
          userSignInCred.email !== null && userSignInCred.password !== null
            ? false
            : true
        }
      >
        SIGN IN
      </button>
    </div>
  );
  const signUpDiv = (
    <div className={Styles.authContainer}>
      <TextField
        label="User Name"
        type={"text"}
        variant="outlined"
        helperText="Username for your ID"
        onChange={(event) => inputChangeHandler(event, "sigUpName")}
      />
      <TextField
        label="Email"
        type={"email"}
        variant="outlined"
        helperText="User email for your ID"
        onChange={(event) => inputChangeHandler(event, "signUpEmail")}
      />
      <TextField
        label="Password"
        type={"password"}
        variant="outlined"
        helperText="login password for your ID"
        onChange={(event) => inputChangeHandler(event, "signUpPass")}
      />
      <TextField
        label="Confirm Password"
        type={"password"}
        variant="outlined"
        helperText="Confirm login password for your ID"
        onChange={(event) => inputChangeHandler(event, "signUpConfPass")}
      />
      <button
        disabled={
          userSignUpCred.email !== null &&
          userSignUpCred.name !== null &&
          userSignUpCred.confPassword !== null &&
          userSignUpCred.password !== null
            ? false
            : true
        }
      >
        SIGN UP
      </button>
    </div>
  );

  return (
    <div className={Styles.container}>
      <TabContext value={value}>
        <Box className={Styles.tabCont} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} centered>
            <Tab label="Sign In" value="1" />
            <Tab label="Sign Up" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">{signInDiv}</TabPanel>
        <TabPanel value="2">{signUpDiv}</TabPanel>
      </TabContext>
    </div>
  );
};

export default Auth;
