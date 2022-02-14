import React from "react";
import "../styles/components/nav.css"
import homeIcon from '../assets/icons/HomeIcon.svg';
import OrderHistoryIcon from '../assets/icons/OrderHistoryIcon.svg';
import SearchIcon from '../assets/icons/Search5.svg';
import SmileUserINVER from '../assets/icons/smileINVER.svg'
import { Link } from "react-router-dom";
const Nav = () => {
  return(
    <div className="footerContainer">
     
        <ul>
          <li>
            <Link className="footerContainer__links" to="/">
              <img src={homeIcon} />
              <span>home</span>
            </Link>
          </li>
          <li>
            <Link className="footerContainer__links"  to="/historialCompras">
              <img src={OrderHistoryIcon} />
              <span>historial</span>
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
        </ul>
     
    </div>
  )
}

export { Nav };