import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./components/Store/actions/index";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import CircularProgress from "@mui/material/CircularProgress";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Speedial from "./components/Speedial/Speedial";
import Notfound from "./components/pages/Notfound/Notfound";

import "./customMuiStyles.css";

const Fuelprices = React.lazy(() => {
  return import("./components/pages/Fuelprices/Fuelprices");
});
const Dashboard = React.lazy(() => {
  return import("./components/pages/Dashboard/Dashboard");
});
const RefuelEntry = React.lazy(() => {
  return import("./components/pages/RefuelEntry/RefuelEntry");
});
const Auth = React.lazy(() => {
  return import("./components/pages/Auth/Auth");
});
const Account = React.lazy(() => {
  return import("./components/pages/Account/Account");
});
const Home = React.lazy(() => {
  return import("./components/pages/Home/Home");
});
const Help = React.lazy(() => {
  return import("./components/pages/Help/Help");
});

function App(props) {
  useEffect(() => {
    props.auto_login();
  });

  useEffect(() => {
    if (props.isAuthenticated) {
      props.fetchUserDetails();
      props.fetch_veh();
    }
  }, [props.isAuthenticated]);

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AuthDomain,
    databaseURL: process.env.REACT_APP_BaseURL,
    projectId: process.env.REACT_APP_ProjectID,
    storageBucket: process.env.REACT_APP_StorageBucket,
    messagingSenderId: process.env.REACT_APP_MessagingSenderId,
    appId: process.env.REACT_APP_AppId,
    measurementId: process.env.REACT_APP_MeasurementId,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <BrowserRouter>
      <Speedial />
      <div className="App" id="top">
        <Navbar />

        <div className="content">
          <React.Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "1rem",
                  height: "100%",
                }}
              >
                <CircularProgress sx={{ color: "#ffe26a" }} size={48} />
              </div>
            }
          >
            <Routes>
              <Route path="/fuel-prices" element={<Fuelprices />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-record" element={<RefuelEntry />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              <Route path="/help" element={<Help />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </React.Suspense>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    auto_login: () => {
      dispatch(actions.auto_login());
    },
    fetchUserDetails: () => {
      dispatch(actions.fetchUserDetails());
    },
    fetch_veh: () => {
      dispatch(actions.fetch_veh());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
