import react, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import "../../Style/CheckOut.css";
import "../../Style/CheckOut-header.css";
import { FomartMoney } from "../../utils/money";
import Header from "../../Components/Header";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
function CheckOut({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setSammaryPayment] = useState(null);

  useEffect(() => {
    let FectDeliveryData = async () => {
      const response = await axios.get(
        "/api/delivery-options?expandEstimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
    };
    let FectPaymentData = async () => {
      const response = await axios.get("/api/payment-summary");
      setSammaryPayment(response.data);
    };
    FectPaymentData();
    FectDeliveryData();
  }, []);
  return (
    <>
      <title>Check Out</title>
      <Header />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
export default CheckOut;
