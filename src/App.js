import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./components/Store/actions/index";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Speedial from "./components/Speedial/Speedial";
import Home from "./components/pages/Home/Home";
import Fuelprices from "./components/pages/Fuelprices/Fuelprices";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import RefuelEntry from "./components/pages/RefuelEntry/RefuelEntry";
import Auth from "./components/pages/Auth/Auth";
import Account from "./components/pages/Account/Account";
import Notfound from "./components/pages/Notfound/Notfound";

import "./customMuiStyles.css";

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
      <div className="App">
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/fuel-prices" element={<Fuelprices />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-record" element={<RefuelEntry />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
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
