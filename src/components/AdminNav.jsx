import React, { useState, useEffect, useContext} from "react";
import { adminContext } from "../context/adminContext";
import { Link, useLocation } from "react-router-dom";
import star from '../assets/icons/icons8-estrella-relleno-48.png';

const AdminNav = ({userState, showUnderNav,setShowUnderNav}) => {
  const [ showAdminNav, setShowAdminNav ] = useState(false);
  const { showOrders, setShowOrders, setShowAddProducts, showAddProducts } = useContext(adminContext)
  const location = useLocation();

  return(
    <>
      {(userState.currentUser !== null ) ? 
        userState.db.admin && 
        <>
      
          {
            location.pathname === '/adminEnchapados' ?
            <button 
              className="menu__links"
              onClick={() => setShowAdminNav(!showAdminNav)}
              >
              <img className="menu__links-star" src={star}  alt="star"/>
              <span>admin</span>
            </button> 
            :
            <Link  className="menu__links" to="/adminEnchapados" alt="star icon">
              <img className="menu__links-star"  src={star} alt="star"/>
              <span>admin</span>
            </Link> 
          }
          {
            showAdminNav && (
            <ul className="admin__links-nav">
              {
                location.pathname === '/adminEnchapados' &&
                <>
                  <li>
                    <button
                      className="menu__links"
                      onClick={() => {
                        console.log('click');
                        setShowOrders(!showOrders)
                        setShowUnderNav(false)
                      }}
                    >
                      ver ordenes
                    </button>
                  </li>
                  <li>
                    <button
                      className="menu__links"
                      onClick={() =>{
                         setShowAddProducts(!showAddProducts);
                         setShowUnderNav(false)
                         }}
                    >
                      ver productos
                    </button>
                  </li>
                </>
              }
            </ul>)
          }
          
         
        </>
          : undefined
      }
    </>
  )
}

export { AdminNav };