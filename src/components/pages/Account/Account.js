import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

import Styles from "./Account.module.css";
import * as action from "../../Store/actions/index";
import Dialog from "../../Dialog/Dialog";
import TextField from "@mui/material/TextField";

const Account = (props) => {
  let navigate = useNavigate();
  const [dialogOptions, setdialogOptions] = useState({
    openDialog: null,
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <React.Fragment>
      <Dialog
        setMethods={setdialogOptions}
        title={"Logout"}
        desc={"Are you sure you want to logout?"}
        onTrue={props.logout}
      />
      <div>
        <div className={Styles.btnCont}>
          <button>EDIT DETAILS</button>
          <button onClick={dialogOptions?.openDialog}>LOGOUT</button>
        </div>
        <div className={Styles.container}>
          <div>
            <p className={Styles.heading}>User Details :</p>
            <div className={Styles.userDetails}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                sx={{ width: "80%", margin: "0.5rem 0" }}
                helperText="Your display name"
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                helperText="Registered mail ID"
                sx={{ width: "80%", margin: "0.5rem 0" }}
              />
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                sx={{ width: "80%", margin: "0.5rem 0" }}
                helperText="Your preffered city for fuel price info"
              />
              <TextField
                id="outlined-basic"
                label="State"
                variant="outlined"
                sx={{ width: "80%", margin: "0.5rem 0" }}
                helperText="Your preffered state for fuel price info"
              />
            </div>
          </div>
          <div>
            <p className={Styles.heading}>Vehicles : </p>
            <div className={Styles.userVeh}>
              <ul style={{ listStyleType: "square" }}>
                <li>Activa</li>
                <li>TVS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(action.logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
