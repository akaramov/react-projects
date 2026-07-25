import { FomartMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";
import { Product } from "./Product";
export function ProductGrid({ products, searchValue, LoadCart }) {
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchValue.toLowerCase());
  });
  return (
    <main>
      <section>
        <div className="products-grid">
          {filteredProducts.map((item) => {
            return <Product key={item.id} item={item} LoadCart={LoadCart} />;
          })}
        </div>
      </section>
    </main>
  );
}
