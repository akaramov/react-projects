import { useEffect, useState } from "react";
import HomePage from "./Pages/Home/HomePage";
import "./App.css";
import CheckOut from "./Pages//Checkout/CheckOut";
import { Routes, Route } from "react-router";
import Tracking from "./Pages/Tracking";
import Orders from "./Pages/Order/Orders";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  // we use this cus we can share this function to another component
  const LoadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };
  useEffect(() => {
    LoadCart();
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cart={cart}
              search={search}
              setSearch={setSearch}
              LoadCart={LoadCart}
            />
          }
        ></Route>
        <Route path="checkout" element={<CheckOut cart={cart} />}></Route>
        <Route path="tracking" element={<Tracking />}></Route>
        <Route path="orders" element={<Orders cart={cart} />}></Route>
      </Routes>
    </>
  );
}

export default App;
