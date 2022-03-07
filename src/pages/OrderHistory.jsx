import React, { useContext, useEffect } from "react";


import '../styles/pages/orderHistory.css'
import { useGetOrders } from "../hooks/useGetOrders.js";
import { OrdersList } from "../components/OrdersList.jsx";

import { cartContex } from "../context/cartContext";
import { authContext } from "../context/AuthContext";
const OrderHistory = () => {
  const { userState } = useContext(authContext);
  const { ordersHistory, dispathOrdersHistory, getOrderUserID } = useGetOrders();
  const { handleCart, cart } = useContext(cartContex);
  console.log(ordersHistory)
  useEffect(() => {
    getOrderUserID();
  },[])
  return(
    <main className="orderHistory footer__user-on">
      <h2>historial de Ordenes</h2>

      <ul className="orderHistoryContainer">
      {
        ordersHistory.map((order) => (
         <OrdersList 
           order={order}
           key={order.orderId}
           buttoms={'buyer'}
           handleCart={handleCart}
           dispathOrdersHistory={dispathOrdersHistory}
           cart={cart}
           userState={userState}
         />
        ))
      }
      </ul>

    </main>
  )
}

export { OrderHistory };