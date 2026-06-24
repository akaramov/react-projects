import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import "./App.css";
import CheckOut from "./Pages/CheckOut";
import { Routes, Route } from "react-router";
import Tracking from "./Pages/Tracking";
import Orders from "./Pages/Orders";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get("/api/cart-items").then((response) => {
      setCart(response.data);
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cart={cart} />}></Route>
        <Route path="checkout" element={<CheckOut cart={cart} />}></Route>
        <Route path="tracking" element={<Tracking />}></Route>
        <Route path="orders" element={<Orders />}></Route>
      </Routes>
    </>
  );
}

export default App;
