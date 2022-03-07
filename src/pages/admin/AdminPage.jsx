import React, { useEffect,useState, useContext } from 'react'
import { useGetOrders } from '../../hooks/useGetOrders';
import { OrdersList } from '../../components/OrdersList.jsx'
import {  doc, onSnapshot } from "firebase/firestore";
import { db } from '../../services/firebaseConfig';
import '../../styles/pages/admin/admin.css'
import { authContext } from '../../context/AuthContext';
import { SearchInput } from '../../components/SearchInput.jsx';
const Adminpage = () =>{
  const { userState } = useContext(authContext)
  const { ordersHistory, getAllOrders, dispathOrdersHistory, updateStatus, loadingUpdate, deleteOrder } = useGetOrders();
  const [ showOrders, setShowOrders ] = useState(true);
  const [ statusOption, setStatusOption ] = useState({
    status: 'revision',
  })
  useEffect(() => {
    getAllOrders()
  },[])
  console.log(ordersHistory);

  const handleOrderStatus = (ev) => {
    setStatusOption({
      ...statusOption,
      [ev.target.name]: ev.target.value
    })
   
  }

  const changeStatus = (docRef) => {
    updateStatus(docRef, statusOption.status);
  /*   const unsub = onSnapshot(doc(db, "ventas", docRef), (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      console.log(source, " data: ", doc.data());
    });
    unsub(); */
  }

  return(
    <main className='admin footer__user-on"'>
      <h3>ADMIN PAGE</h3>
        <nav className='adminButtons'>

          <ul>
            <li>
              <button 
                className='primaryButton'
                onClick={() => setShowOrders(!showOrders)}
                >
                  ordenes
                </button>
            </li>
            <li>
              <button 
                className='primaryButton'
                >
                  productos
                </button>
            </li>
           
          </ul>
          <SearchInput 
            placeholder={"buscar"}
          /> 
        </nav>

      <section className='orders'>
        <div className='orders_admin-ordersContainer'>
            {
              showOrders && 
                <ul className="orderHistoryContainer">
                  {
                    ordersHistory.map((order) => (
                    <OrdersList 
                      order={order}
                      key={order.orderId}
                      buttoms={'admin'}
                      dispathOrdersHistory={dispathOrdersHistory}
                      handleOrderStatus={handleOrderStatus}
                      changeStatus={changeStatus}
                      userState={userState}
                      statusOption={statusOption}
                      loadingUpdate={loadingUpdate}
                      deleteOrder={deleteOrder}
                    />
                    ))
                  }
                  </ul>
            }
        </div>

      </section>

      
    </main>
  );
}

export { Adminpage };