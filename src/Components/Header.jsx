import React from "react";
import "./header.css";
// 1. Import Link ពី react-router-dom ចូលមកប្រើ
import { Link } from "react-router-dom";

function Header({ cart = [] }) {
  let totalQyt = 0;
  cart.forEach((cartItem) => {
    totalQyt += cartItem.quantity;
  });
  return (
    <>
      <div className="header">
        <div className="left-section">
          {/* 2. ប្តូរពី <a> មកជា <Link> និងប្តូរពី 'href' មកជា 'to' */}
          <Link to="/" className="header-link">
            <img
              className="logo"
              src="images/icons/buy-again.png"
              alt="Company Logo"
            />
            <img
              className="mobile-logo"
              src="images/mobile-logo-white.png"
              alt="Mobile Logo"
            />
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />
          <button className="search-button">
            <img
              className="search-icon"
              src="images/icons/search-icon.png"
              alt="Search"
            />
          </button>
        </div>

        <div className="right-section">
          {/* 3. កែប្រែ Link របស់ Orders */}
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>

          {/* 4. កែប្រែ Link របស់ Cart ឱ្យប្រើ <Link> និង 'to' ឱ្យបានត្រឹមត្រូវ */}
          <Link className="cart-link header-link" to="/checkout">
            <img
              className="cart-icon"
              src="images/icons/cart-icon.png"
              alt="Cart"
            />
            <div className="cart-quantity">{totalQyt}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
