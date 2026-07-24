import React from "react";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import "../../Style/orders.css";
import Header from "../../Components/Header";
import { FomartMoney } from "../../utils/money";
import dayjs from "dayjs";
import { OrderDetail } from "./OrderDetail";
function Orders({ cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const FectOrderData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    FectOrderData();
  }, []);
  return (
    <>
      <Header />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        {orders.map((order) => {
          return (
            <>
              <OrderDetail order={order} cart={cart} />
            </>
          );
        })}
      </div>
    </>
  );
}
export default Orders;
