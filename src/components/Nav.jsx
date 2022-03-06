import React, { useContext}  from "react";
import "../styles/components/nav.css"
import homeIcon from '../assets/icons/HomeIcon.svg';
import OrderHistoryIcon from '../assets/icons/OrderHistoryIcon.svg';
import SearchIcon from '../assets/icons/Search5.svg';
import SmileUserINVER from '../assets/icons/smileINVER.svg';
import star from '../assets/icons/icons8-estrella-relleno-48.png';
import { GoThreeBars } from "react-icons/go";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const Nav = ({showUnderNav, setShowUnderNav }) => {
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
         
          
            {(userState.currentUser !== null ) ? 
              userState.db.admin && 
              <li>
                <Link className="footerContainer__links" to="/adminEnchapados">
                  <img  style={{maxWidth: '35px'}} src={star} />
                  <span>admin</span>
                </Link> 
              </li>
                : undefined
            }
              <li>
                <div className="footerContainer__links">
                  <div className="footerContainer__links-hammburger">
                    <GoThreeBars 
                      size={32}
                      color={'gray'}
                      onClick={ () => setShowUnderNav(!showUnderNav)}
                    />
                  </div>
                </div>
              </li>
          </ul>
          : 
          <ul className="hamburger">
            <li >
                <div className="footerContainer__links" >
                  <div className="footerContainer__links-hammburger" >
                    <GoThreeBars
                        size={32}
                        color={'black'}
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