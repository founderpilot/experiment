import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BananaPro from "./components/TradingDashboard";

function App() {
  return (
    <div className="App dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BananaPro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
