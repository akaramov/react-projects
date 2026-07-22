import react, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import "../Style/CheckOut.css";
import "../Style/CheckOut-header.css";
import { FomartMoney } from "../utils/money";
import Header from "../Components/Header";
// import { FomartMoney } from "../Data/products";
function CheckOut({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setSammaryPayment] = useState([null]);
  useEffect(() => {
    axios
      .get("/api/delivery-options?expandEstimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
    // Show when it reload one time

    axios.get("/api/payment-summary").then((response) => {
      setSammaryPayment(response.data);
    });
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
            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {FomartMoney(paymentSummary.productCostCents)}
                  </div>
                </div>
                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {FomartMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>
                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {FomartMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>
                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {FomartMoney(paymentSummary.taxCents)}
                  </div>
                </div>
                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {FomartMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>
                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
