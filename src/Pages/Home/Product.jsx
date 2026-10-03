import { FomartMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";
export function Product({ item, LoadCart }) {
  const [quantity, setQuantity] = useState(1);
  const AddtoCart = async () => {
    await axios.post("/api/cart-items", {
      productId: item.id,
      quantity: quantity,
    });
    await LoadCart();
  };
  const selectQuantity = (even) => {
    const selectQuantity = Number(even.target.value);
    setQuantity(selectQuantity);
  };
  return (
    <main>
      <div className="product-container border border-gray">
        <div className="product-image-container">
          <img className="product-image" src={item.image} />
        </div>

        <div className="product-name limit-text-to-2-lines">{item.name}</div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={`images/ratings/rating-${item.rating.stars * 10}.png`}
          />
          <div className="product-rating-count link-primary">87</div>
        </div>

        <div className="product-price">{FomartMoney(item.priceCents)}</div>
        <div className="product-quantity-container">
          <select value={quantity} onChange={selectQuantity}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="product-spacer"></div>

        <div className="added-to-cart">
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button
          className="add-to-cart-button button-primary text-center! border rounded-xl bg-pink-400! text-white! pb-5!"
          onClick={AddtoCart}
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
