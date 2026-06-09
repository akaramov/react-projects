import { useState } from "react";
import HomePage from "./Pages/HomePage";
import "./App.css";
import CheckOut from "./Pages/CheckOut";
import { Routes, Route } from "react-router";
import Tracking from "./Pages/Tracking";
import Orders from "./Pages/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="checkout" element={<CheckOut />}></Route>
        <Route path="tracking" element={<Tracking />}></Route>
        <Route path="orders" element={<Orders />}></Route>
      </Routes>
    </>
  );
}

export default App;
