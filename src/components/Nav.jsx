import React, { useContext, useState}  from "react";
import "../styles/components/nav.css"
import homeIcon from '../assets/icons/HomeIcon.svg';
import OrderHistoryIcon from '../assets/icons/OrderHistoryIcon.svg';
import SearchIcon from '../assets/icons/Search5.svg';
import SmileUserINVER from '../assets/icons/smileINVER.svg';
import { GoThreeBars } from "react-icons/go";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const Nav = ({children, showUnderNav, setShowUnderNav }) => {
  const { userState } = useContext(authContext);

  if(userState.currentUser === null) {
    return <span></span>
  }
  return(
    <div className="footerContainer">
      { !!showUnderNav 
        ? <ul>
            <li>
              <Link className="footerContainer__links" to="/">
                <img src={homeIcon} />
                <span>home</span>
              </Link>
            </li>
            <li>
              <Link className="footerContainer__links"  to="/perfil/historialOrdenes">
                <img src={OrderHistoryIcon} />
                <span>ordenes</span>
              </Link>
            </li>
            <li>
              <button className="footerContainer__links" >
                <img src={SearchIcon} />
                <span>buscar</span>
              </button>
            </li>
            <li>
              <Link className="footerContainer__links"  to="perfil">
                <img src={SmileUserINVER} />
                <span>perfil</span>
              </Link>
            </li>
            <li>
              <div className="footerContainer__links">
                <div className="footerContainer__links-hammburger">
                  <GoThreeBars 
                    size={32}
                    color={'white'}
                    onClick={ () => setShowUnderNav(!showUnderNav)}
                  />
                </div>
              </div>
            </li>
            <li style={!userState.db.admin ? {display:'none'} : {display:'flex'}}>
              {children}
            </li>
           
          </ul>
          : 
          <ul className="hamburger">
            <li >
                <div className="footerContainer__links" >
                  <div className="footerContainer__links-hammburger" >
                    <GoThreeBars
                        size={32}
                        color={'white'}
                        onClick={ () => setShowUnderNav(!showUnderNav)}
                    />
                    </div>
                  </div>
              </li>
          </ul>
      }
      
    </div>
  )
}

export { Nav };