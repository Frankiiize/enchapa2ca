import React, { useContext, useRef, useEffect }  from "react";
//import "../styles/components/nav.css"
import "../styles/components/newNav.css"
import { MdFavorite, MdHomeFilled, MdArticle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import EnchapadoIcon from "../assets/Icomponent/EnchapadoIcon.jsx";


const Nav = ({children, showUnderNav, setShowUnderNav,toggleCart }) => {
  const { userState } = useContext(authContext);
  const link = useRef();
  const location = useLocation();
  useEffect(() => {
    setShowUnderNav(false);
  },[location.pathname, toggleCart]);

  if(userState.currentUser === null) {
    return <span></span>
  };

  return(
   <>
    { !!showUnderNav 
      && <ul className="menu">
            <li>
              <Link ref={link} className="menu__links" to="/">
                <MdHomeFilled size={28} color={"#4F4F4F"} />
                <span>home</span>
              </Link>
            </li>
            <li>
              <Link className="menu__links"  to="perfil">
                <EnchapadoIcon className="menu__links-perfil"  />
                <span>perfil</span>
              </Link>
            </li>
            <li>
              <Link className="menu__links"  to="/perfil/historialOrdenes">
                <MdArticle size={28} color={"#4F4F4F"}/>
                <span>ordenes</span>
              </Link>
            </li>
            {/* <li>
              <button className="menu__links" >
                <img src={SearchIcon} alt="busqueda icon"/>
                <span>buscar</span>
              </button>
            </li> */}
            <li>
              <Link className="menu__links" to="/favoritos" alt="link a favoritos">
                <MdFavorite size={28} color={"#4F4F4F"}/>
                <span>favoritos</span>
              </Link>
            </li>
            <li >
            {
              !!userState.db.admin &&
              <>
                {children}
              </>
            }
            </li>
          </ul>
    }
   </>
      
   
  )
}

export { Nav };