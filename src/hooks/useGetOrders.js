import React,{ useState, useContext, useEffect, useReducer} from "react";
import { authContext } from "../context/AuthContext";
import { changeTimeFormat } from "../utils/changeTimeFormat";
import { collection, query, where, getDocs, orderBy, doc, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { async } from "@firebase/util";

const initialstate = [];

const orderReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_ORDERS' :
      return action.payload;
    case 'ADD_ALL_ORDERS':
      return action.payload;
    case 'ADD_REAL_CHANGE':
      return action.payload;
    default: return state;
  }
}



const useGetOrders = () => {
  const { userState } = useContext(authContext);
  const [ ordersHistory, dispathOrdersHistory ] = useReducer(orderReducer, initialstate)
  const [ loadingUpdate, setLoadingUpdate ] = useState(false);
 const getOrderUserID = () => {
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
         dispathOrdersHistory({type: 'ADD_ORDERS' , payload: orders})
       }
       getOrders();
     }
     catch(error){
       console.log(error);
     }
    
 }

 const getAllOrders = () => {
    try{
      const getOrders = async() => {
        const search = query(collection(db, 'ventas'), orderBy('timestamp', 'desc'))
        
        const querySnapShot = await getDocs(search);
        let orders = [];
        querySnapShot.forEach((doc) => {
          const data = doc.data();
          data.timestamp = changeTimeFormat(data.timestamp);
          data.orderId = doc.id
          orders.push(data)
        })
        dispathOrdersHistory({type: 'ADD_ALL_ORDERS' , payload: orders})
      }
      getOrders();
    }
    catch(error){
      console.log(error);
    }
 }

 /* const getRealTimeOrders = async (docRef) => {

  const unsub =  onSnapshot(doc(db, "ventas", docRef), (doc) => {
    const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    const data = doc.data();
    data.orderId = docRef
    data.timestamp =changeTimeFormat(data.timestamp);
    const stateToUpdate = [...ordersHistory]
    const Index = stateToUpdate.findIndex(item => item.orderId === data.orderId)
    const removed = stateToUpdate.splice(Index, 1 , data);
    dispathOrdersHistory({type: 'ADD_REAL_CHANGE', payload:stateToUpdate})
  });

 } */

 const updateStatus = async (docRef, newStatus) => {
   const orderRef = doc(db, 'ventas', docRef)
   setLoadingUpdate(true)
   await updateDoc(orderRef, {
     status: newStatus,
    }).then(() => {
       getAllOrders()
    }).then(() => {
      setLoadingUpdate(false)
    })
 }

 const deleteOrder = async (docRef) => {
   setLoadingUpdate(true)
   await deleteDoc(doc(db, "ventas", docRef)).then(() => {
     console.log(`${docRef} eliminado`)
     getAllOrders();
     setLoadingUpdate(false)
   }).catch(error => console.log(error))
 }

 

  return {
    ordersHistory,
    dispathOrdersHistory,
    getAllOrders,
    getOrderUserID,
    updateStatus,
    loadingUpdate,
    deleteOrder
  }
}

export { useGetOrders };