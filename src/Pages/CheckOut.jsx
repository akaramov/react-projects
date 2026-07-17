import react, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import "../Style/CheckOut.css";
import "../Style/CheckOut-header.css";
import { FomartMoney } from "../utils/money";
import Header from "../Components/Header";
function CheckOut({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  useEffect(() => {
    axios
      .get("/api/delivery-options?expandEstimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
    // Show when it reload one time
  }, []);
  return (
    <>
      <title> Check Out</title>

      <Header />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length > 0 &&
              cart.map((cartItem) => {
                const selectDeliveryOption = deliveryOptions.find(
                  (deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                  },
                );
                return (
                  <div key={cartItem.productID} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date:
                      {dayjs(
                        selectDeliveryOption.estimateDeliveryTimeMS,
                      ).format("DD/MM/YYYY")}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={cartItem.product.image}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>
                        <div className="product-price">
                          {FomartMoney(cartItem.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity: <span className="quantity-label">2</span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOptions.map((deliveryOption) => {
                          let priceString = "FreeShipping ";
                          if (deliveryOption.priceCents > 0) {
                            priceString = `${FomartMoney(deliveryOption.priceCents)} - Shipping `;
                          }
                          return (
                            <div
                              key={deliveryOption.id}
                              className="delivery-options"
                            >
                              <div className="delivery-option">
                                <input
                                  type="radio"
                                  checked={
                                    deliveryOption.id ===
                                    cartItem.deliveryOptionId
                                  }
                                  className="delivery-option-input"
                                  name={`delivery-option-1 ${cartItem.productID}`}
                                />
                                <div>
                                  <div className="delivery-option-date">
                                    {dayjs(
                                      deliveryOption.estimateDeliveryTimeMS,
                                    ).format("dddd, MMMM D")}
                                  </div>
                                  <div className="delivery-option-price">
                                    {priceString}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items (3):</div>
              <div className="payment-summary-money">$42.75</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">$4.99</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">$47.74</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">$4.77</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">$52.51</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
