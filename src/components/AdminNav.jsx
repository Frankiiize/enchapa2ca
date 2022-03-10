import React, { useState, useEffect, useContext} from "react";
import { adminContext } from "../context/adminContext";
import { Link, useLocation } from "react-router-dom";
import star from '../assets/icons/icons8-estrella-relleno-48.png';

const AdminNav = ({userState}) => {
  const [ showAdminNav, setShowAdminNav ] = useState(false);
  const { showOrders, setShowOrders, setShowAddProducts, showAddProducts } = useContext(adminContext)
  const location = useLocation();
  useEffect(() => {
    setShowAdminNav(false);
  },[location])
  return(
    <>
      {(userState.currentUser !== null ) ? 
        userState.db.admin && 
        <>
          <div className="admin__links">
          {
            location.pathname === '/adminEnchapados' ?
            <button 
              onClick={() => setShowAdminNav(!showAdminNav)}
              className="admin__links-star" >
              <img  style={{maxWidth: '35px'}} src={star} />
              <span>admin</span>
            </button> 
            :
            <Link className="admin__links-star" to="/adminEnchapados">
              <img  style={{maxWidth: '35px'}} src={star} />
              <span>admin</span>
            </Link> 
          }
          {
            showAdminNav && 
            <ul className="admin__links-nav">
              {
                location.pathname === '/adminEnchapados' &&
                <>
                  <li>
                    <button
                      onClick={() => {
                        console.log('click');
                        setShowOrders(!showOrders)
                      }}
                    >
                      ordenes
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowAddProducts(!showAddProducts)}
                    >
                      productos
                    </button>
                  </li>
                </>
              }
            </ul>
          }
          </div>
          
         
        </>
          : undefined
      }
    </>
  )
}

export { AdminNav };