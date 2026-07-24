import dayjs from "dayjs";
import { FomartMoney } from "../../utils/money";
export function DeliveryOption({ deliveryOptions, cartItem }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FreeShipping ";
        if (deliveryOption.priceCents > 0) {
          priceString = `${FomartMoney(deliveryOption.priceCents)} - Shipping `;
        }
        return (
          <div key={deliveryOption.id} className="delivery-options">
            <div className="delivery-option">
              <input
                type="radio"
                checked={deliveryOption.id === cartItem.deliveryOptionId}
                className="delivery-option-input"
                name={`delivery-option-1 ${cartItem.productID}`}
              />
              <div>
                <div className="delivery-option-date">
                  {dayjs(deliveryOption.estimateDeliveryTimeMS).format(
                    "dddd, MMMM D",
                  )}
                </div>
                <div className="delivery-option-price">{priceString}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
