import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Cities from "./components/Cities";
import Forecast from "./components/Forcast";
import ForecastByCity from "./components/ForecastByCity";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar";


function App() {

  return (
    <div className="App">
     <Router>
        <Navbar />
       
        <Routes>
           <Route path="/" element={<Home />}/>
           <Route path="/weather-by-city" element={<Cities />}/>
           <Route path="/forecast" element={<Forecast />}/>
           <Route path="/forecast-by-city" element={<ForecastByCity />}/>
        </Routes>
     </Router>
    </div>
  );
}

export default App;
