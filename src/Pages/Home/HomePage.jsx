import React from "react";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";
import "../../Style/homePage.css";
import { ProductGrid } from "./ProductGrid";
import axios from "axios";
function HomePage({ cart }) {
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
        <title> Home Page</title>
        <Header
          cart={cart}
          searchValue={searchValue}
          setsearchValue={setsearchValue}
        />
        <div className="home-page">
          <ProductGrid products={product} searchValue={searchValue} />
        </div>
      </section>
    </main>
  );
}
export default HomePage;
