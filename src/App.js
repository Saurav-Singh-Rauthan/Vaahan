import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Notfound from "./components/pages/Notfound/Notfound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
