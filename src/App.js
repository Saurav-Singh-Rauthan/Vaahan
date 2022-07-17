import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Speedial from "./components/Speedial/Speedial";
import Home from "./components/pages/Home/Home";
import Fuelprices from './components/pages/Fuelprices/Fuelprices';
import Dashboard from "./components/pages/Dashboard/Dashboard";
import RefuelEntry from './components/pages/RefuelEntry/RefuelEntry';
import Notfound from "./components/pages/Notfound/Notfound";

function App() {
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
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
