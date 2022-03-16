import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
//ICONS
import { MdFavorite, MdOutlineShoppingCart } from "react-icons/md";
import logo from "../assets/images/logoEnchapadoWHITE.png";
import smileBg from '../assets/images/enchapadoSmileBgWHITE.png';
import smileInv from '../assets/icons/smileINVER.svg';
import ShoppingCart from "../assets/Icomponent/ShoppingCart.jsx";

//-----ICONS
//SYLES
import "../styles/components/header.css";
//---SYLES
//COMPONENTS
import { SearchInput } from "./SearchInput.jsx";
import { authContext } from "../context/AuthContext";
import { Nav } from "./Nav.jsx";
import { MyCart } from "./MyCart.jsx";
import { cartContex } from "../context/cartContext";
import { AdminNav } from "./AdminNav.jsx";
import { productsContext } from "../context/productsContext";
import { GoThreeBars } from "react-icons/go";
//------COMPONENTS
const Header = () => {
  const { cart } = useContext(cartContex);
  const { userState } = useContext(authContext);
  const [ showUnderNav, setShowUnderNav ] = useState(true);
  const [ toggleCart, setToggleCart ] = useState(false);
 
  const location = useLocation();
  return(
    <>
      <header className="headerContainer">
      <nav>
        <div className="headerWrapper" >
          <div className="headerContainer__logoWrapper">
            <Link to="/">
              <img src={logo} alt="logo enchapados" />
            </Link>
          </div>
          <ul className="headerContainer__links">
            {userState.currentUser !== null
              ? <>
                  <li>
                    <button
                      onClick={() => setToggleCart(!toggleCart)}  
                      className="headerContainer__links-shoppingCart">
                        <ShoppingCart 
                          fill={"#f5f5f5"}
                          width={32}
                          height={32}
                        /> 
                    {!!cart.cart.length > 0
                      ? <span>{cart.cart.length}</span>
                      : <p></p>
                    }
                    </button>
                  </li>

                  <li className="headerContainer__links--userInfo">
                    <span>hola!,{userState.db.name}</span>
                    <img
                      className={userState.currentUser !== null ? 'headerCointainer__user--userImg online' : 'headerCointainer__user--userImg'} 
                      src={userState.db.photo ? `${userState.db.photo }` : smileInv } 
                      alt="user photo"/>
                  </li>
                  <li className="headerContainer__menu">
                    <button
                      className="headerContainer__menu-btn"
                      onClick={() => setShowUnderNav(!showUnderNav)}
                    >
                      <GoThreeBars size={32}/>
                    </button>
                  </li>

                  <Nav
                    showUnderNav={showUnderNav}
                    setShowUnderNav={setShowUnderNav}
                    toggleCart={toggleCart}
                  >
                    <AdminNav 
                      userState={userState}
                      showUnderNav={showUnderNav}
                      setShowUnderNav={setShowUnderNav}
                    />
                  </Nav>
                 
                  
                </>
              : //no user loging
              <div className="headerCointaner__user">
                <Link className="headerCointainer__user--login" to="/login">
                  <span>entrar</span> 
                  <img className="headerCointainer__user--userImg" src={smileInv} />
                </Link> 
              </div>
            }
          </ul>
        </div>
      
      { !!toggleCart && 
        <MyCart
          toggleCart={toggleCart}
          setToggleCart={setToggleCart}
          />
      }
      </nav>
    </header>
     
  
    </>

  )

}

export { Header };