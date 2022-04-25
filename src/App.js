import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<h1>Auth Page</h1>} />
          <Route path="/user" element={<h1>User Page</h1>} />
          <Route path="/fuelPrices" element={<h1>Fuel Page</h1>} />
          <Route path="/my-vehicle" element={<h1>Veh Page</h1>} />
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="*" element={<h1>page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
