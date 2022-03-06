import React, { useEffect, useState,useContext } from "react";
import { authContext } from "../context/AuthContext";
import { changeTimeFormat } from "../utils/changeTimeFormat";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { CheckOutCardItems } from "../components/CheckOutCardItems.jsx";
import { BsFillCircleFill, BsCheckCircleFill } from 'react-icons/bs'
import { RiSendPlaneFill } from 'react-icons/ri'
import { AiFillDelete } from "react-icons/ai";
import '../styles/pages/orderHistory.css'

const OrderHistory = () => {
  const [ ordersHistory, setOrdersHistory ] = useState([]);
  const { userState } = useContext(authContext);
  
  console.log(ordersHistory);
 
  useEffect( () => {
    try{
      const getOrders = async() => {
        const search = query(collection(db, 'ventas'), where('userUID' , '==', userState.currentUser.uid ), orderBy('timestamp', 'desc'))
        const querySnapShot = await getDocs(search);
        let orders = [];
        querySnapShot.forEach((doc) => {
          const data = doc.data();
          data.timestamp = changeTimeFormat(data.timestamp);
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
    return () => {
      setOrdersHistory(false)
    }

  },[]);


  
  
 

  return(
    <main className="orderHistory footer__user-on">
      <h2>historial de Ordenes</h2>

      <ul className="orderHistoryContainer">
      {
        ordersHistory.map((order) => (
          <li
            className="cardOrder_item"
            key={order.orderId}
          >
            <div className="cardOrder_item-title">
              <h3>{order.timestamp}</h3>
              <div className="cardOrder_item-code">
                  <p>codigo de transaccion:</p>
                  <span>{order.orderId}</span>
              </div>
              <div className="cardOrder_item-status">
                <div className="cardOrder_item-statusDelivery">
                  <p>{!!order.countryState & !!order.address ? `${order.envio}:` : `${order.envio}`}</p>
                  <span>{!!order.countryState & !!order.address ? `${order.countryState}-${order.address}` : undefined}</span>
                </div>
                <div className="cardOrder_item-statusCheck">
                  <p>{order.status}</p>
                  {
                    order.status === 'entregado' 
                    ? <BsCheckCircleFill size={16} color={"#39c4a1"} />
                    : order.status === 'enviado'
                      ? <RiSendPlaneFill size={16} color={"#39c4a1"} />
                      : order.status === 'pago confirmado'
                        ? <BsFillCircleFill size={16} color={"#39c4a1"}/>
                        : order.status === 'revision'
                        ? <BsFillCircleFill size={16} color={"orange"} />
                        : <BsFillCircleFill size={16} color={'#FF7272'} />
                  }
                </div>
               
                   
                
               
              </div>
            </div>
            <div className="cardOrder_item-info">
              <ul>
                <li>
                  <p>nombre</p>
                  <span>{order.name}</span>
                </li>
                <li>
                  <p>email</p>
                  <span>{order.email}</span>
                </li>
                <li>
                  <p>metodo de pago:</p>
                  <span>{order.paidMethod}</span>
                </li>
              </ul>
            </div>
            <div className="cardOrder_shopCard">
              {
                order.shop.map((item) => (
                  <div 
                    className="cardOrder_shopCard-card"
                    key={`shop-${item.id}`}>
                        <img style={{maxWidth: '100px'}} src={item.img} alt={`foto producto-${item.name}`}/>
                    <ul className="orderHistory_shopCard-card">
                      <li>
                        <p>Articulo</p>
                        <span>{item.name}</span>
                      </li>
                      <li>
                        <p>precio</p>
                        <span>{item.price}</span>
                      </li>
                      <li>
                        <p>cantidad</p>
                        <span>{item.quantity}</span>
                      </li>
                    </ul>
                    <div className="orderHistory_shopCard-total">
                        <p>total:</p>
                        <span>${order.totalPrice}</span>
                    </div>
                    <div className="orderHistory_shopCard-buttons">
                      <button
                        className="segundaryButton"
                        disabled={ order.status !== 'entregado' && true}
                        >
                          <AiFillDelete  size={32}/>
                      </button>
                      <button 
                        className="primaryButton"
                      >
                        Volver a comprar
                      </button>
                    </div>
                     
                  </div>
                ))
              }
            </div>
        
          </li>
        ))
      }
      </ul>

    </main>
  )
}

export { OrderHistory };