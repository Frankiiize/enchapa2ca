import React from "react";
import "../styles/components/footer.css"
import homeIcon from '../assets/icons/HomeIcon.svg';
import OrderHistoryIcon from '../assets/icons/OrderHistoryIcon.svg';
import SearchIcon from '../assets/icons/Search5.svg';
import SmileUserINVER from '../assets/icons/smileINVER.svg'
import { Link } from "react-router-dom";
const FooterMenu = () => {
  return(
    <footer className="footerContainer">
      <nav className="footerNav">
        <ul>
          <li>
            <Link className="footerNav__links" to="/">
              <img src={homeIcon} />
              <span>home</span>
            </Link>
          </li>
          <li>
            <Link className="footerNav__links"  to="/historialCompras">
              <img src={OrderHistoryIcon} />
              <span>historial</span>
            </Link>
          </li>
          <li>
            <button className="footerNav__links" >
              <img src={SearchIcon} />
              <span>buscar</span>
            </button>
          </li>
          <li>
            <Link className="footerNav__links"  to="perfil">
              <img src={SmileUserINVER} />
              <span>perfil</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export { FooterMenu };