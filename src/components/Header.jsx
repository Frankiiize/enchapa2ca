import React, { useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
//ICONS
import { MdFavorite, MdOutlineShoppingCart } from "react-icons/md";
import logo from "../assets/images/logoEnchapadoWHITE.png";
import smileBg from '../assets/images/enchapadoSmileBgWHITE.png';
import smileInv from '../assets/icons/smileINVER.svg';

//-----ICONS
//SYLES
import "../styles/components/header.css";
//---SYLES
//COMPONENTS
import { SearchInput } from "./SearchInput.jsx";
import { authContext } from "../context/AuthContext";
import { Nav } from "./Nav.jsx";
import { MyCart } from "./MyCart.jsx";
//------COMPONENTS
const Header = () => {
  const { userState } = useContext(authContext);
  const [ searchValue, setSearchValue ] = useState('');
  const [ showUnderNav, setShowUnderNav ] = useState(false);
  const [ toggleCart, setToggleCart ] = useState(true);
  const handleSearch = (ev) => {
    setSearchValue(ev.target.value)
    console.log(searchValue)
  }
  const location = useLocation();
  const sectionTitle = location.pathname.split(/^[/]/i)[1];
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
          {userState.currentUser !== null
            ? <ul className="headerContainer__links">
                <li className="headerContainer__links--userInfo">
                  <span>hola!,</span>
                  <span>{userState.db.name}</span> 
                  <picture>
                    <img
                      className={userState.currentUser !== null ? 'headerCointainer__user--userImg online' : 'headerCointainer__user--userImg'} 
                      src={userState.db.photo ? `${userState.db.photo }` : smileInv } 
                      alt="user photo"/>
                  </picture>
                </li>
                <li>
                  <Link to="/favoritos">
                    <MdFavorite size={28} color={"white"}/>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setToggleCart(!toggleCart)}  
                    className="headerContainer__links-shoppingCart">
                      <MdOutlineShoppingCart 
                        size={28} 
                        color={"white"}
                        />
                  </button>
                </li>
              </ul>
            : 
            <div className="headerCointaner__user">
              <Link className="headerCointainer__user--login" to="/login">
                <span>entrar</span> 
                <img className="headerCointainer__user--userImg" src={smileInv} />
              </Link> 
            </div>
          }
        </div>
      {(location.pathname === '/') 
        ? <SearchInput  handleSearch={handleSearch} /> 
        : <h2>{sectionTitle}</h2> }
      </nav>
      <div>
        
      </div>
      <Nav userState={userState}
          showUnderNav={showUnderNav}
          setShowUnderNav={setShowUnderNav}
          />
          
    
      
    </header>
      { !!toggleCart && 
        <MyCart
          toggleCart={toggleCart}
          setToggleCart={setToggleCart}
          />
      }
  
    </>

  )

}

export { Header };