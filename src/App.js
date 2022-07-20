import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./components/Store/actions/index";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Speedial from "./components/Speedial/Speedial";
import Home from "./components/pages/Home/Home";
import Fuelprices from "./components/pages/Fuelprices/Fuelprices";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import RefuelEntry from "./components/pages/RefuelEntry/RefuelEntry";
import Auth from "./components/pages/Auth/Auth";
import Notfound from "./components/pages/Notfound/Notfound";

import "./customMuiStyles.css";

function App(props) {
  useEffect(() => {
    props.auto_login();
  });

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
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     prop: state.prop,
//   };
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    auto_login: () => {
      dispatch(actions.auto_login());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
