import { useEffect, useState } from "react";
import HomePage from "./Pages/Home/HomePage";
import "./App.css";
import CheckOut from "./Pages//Checkout/CheckOut";
import { Routes, Route } from "react-router";
import Tracking from "./Pages/Tracking";
import Orders from "./Pages/Order/Orders";
import axios from "axios";

function App() {
  // it call globla state beacause we share this data cart to another component
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((response) => {
      setCart(response.data);
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cart={cart} />}></Route>
        <Route path="checkout" element={<CheckOut cart={cart} />}></Route>
        <Route path="tracking" element={<Tracking />}></Route>
        <Route path="orders" element={<Orders cart={cart} />}></Route>
      </Routes>
    </>
  );
}

export default App;
