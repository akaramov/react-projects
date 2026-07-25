import React from "react";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";
import "../../Style/homePage.css";
import { ProductGrid } from "./ProductGrid";
import axios from "axios";
import { Hero } from "./Hero";
function HomePage({ cart, LoadCart }) {
  const [product, setProduct] = useState([]);
  const [searchValue, setsearchValue] = useState(""); // we use empty array because it string
  useEffect(() => {
    const GetHomeData = async () => {
      const response = await axios.get("/api/products");
      setProduct(response.data);
    };

    GetHomeData();
  }, []);
  return (
    <main>
      <section>
        <title>Home</title>

        <Header
          cart={cart}
          searchValue={searchValue}
          setsearchValue={setsearchValue}
        />
        {/* <Hero /> */}
        <div className="home-page">
          <ProductGrid
            products={product}
            searchValue={searchValue}
            LoadCart={LoadCart}
          />
        </div>
      </section>
    </main>
  );
}
export default HomePage;
