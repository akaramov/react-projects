import { FomartMoney } from "../../utils/money";
import { Dayjs } from "dayjs";
import { DeliveryOption } from "./DeliveryOption";
export function PaymentSummary({ paymentSummary }) {
  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>
      {paymentSummary && (
        <main>
          <article>
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
          </article>
        </main>
      )}
    </div>
  );
}
