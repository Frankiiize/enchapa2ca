import React, { useEffect, useState,useContext } from "react";
import { authContext } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { CheckOutCardItems } from "../components/CheckOutCardItems.jsx";


const OrderHistory = () => {
  const [ ordersHistory, setOrdersHistory ] = useState([]);
  const { userState } = useContext(authContext);
  console.log(userState.currentUser.uid);
  console.log(ordersHistory);
  useEffect( () => {
    try{
      const getOrders = async() => {
        const search = query(collection(db, 'ventas'), where('userUID' , '==', userState.currentUser.uid ))
        const querySnapShot = await getDocs(search);
        let orders = [];
        querySnapShot.forEach((doc) => {
          const data = doc.data();
          data.timestamp = data.timestamp.toDate().toString();
          data.orderId = doc.id
          orders.push(data)
        })
        setOrdersHistory(orders)
      }
      getOrders();
    }
    catch(error){
      console.log(error);
    }

  },[]);


  
  
 

  return(
    <main className="orderHistory">
      <h1>historial de Ordenes</h1>

  {/*     <section className="orderHistory__OrdersContainer">
          {
            itemsPurchase.map((item) => (
              <div
              className="orderHistory__OrdersContainer-order"
              key={item.order.orderId}
              >
              <div className="orderHistory__OrdersContainer-orderTitle">
                <h3>{item.dateOfShop}</h3>
                <span>{item.order.orderId}</span>
              </div>
              <p>{item.order.orderItem.status}</p>
                {
                  item.shopItems.map((shop) => (
                    <div
                      className="orderHistory__OrdersContainer-orderCard"
                      key={shop.id}
                    >
                      <h4>{shop.name}</h4>
                      <img style={{maxWidth:"150px"}} src={shop.img} alt={shop.name} />
                      <p>
                        <span>precio</span>
                        <span>{shop.price}</span>
                      </p>
                      <p>
                        <span>cantidad</span>
                        <span>{shop.quantity}</span>
                      </p>
                      

                    </div>
                  ))
                }
              </div>
            ))
          }
         
      </section> */}

    </main>
  )
}

export { OrderHistory };