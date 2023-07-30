import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { loadStripe } from "@stripe/stripe-js";
import { Routes, Route, Link } from "react-router-dom";
import Success from "./Success"
import Home from './Home'


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/success/*" element={<Success />}/>

      <Route path='/home' element= {<Home />} />


      </Routes>
    

    </div>
  );
}

export default App;
