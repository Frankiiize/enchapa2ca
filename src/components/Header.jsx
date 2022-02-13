import React, { useContext, useState } from "react";
import { MdFavorite, MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { FaUserAlt } from 'react-icons/fa'
import { Link } from "react-router-dom";
import logo from "../assets/images/logoEnchapadoWHITE.png";
import smileBg from '../assets/images/enchapadoSmileBgWHITE.png'
import "../styles/components/header.css";
import { SearchInput } from "./SearchInput.jsx";
import { authContext } from "../context/AuthContext";
const Header = () => {
  const { user, sinIng } = useContext(authContext);
  const [ searchValue, setSearchValue ] = useState('');
  const handleSearch = (ev) => {
    setSearchValue(ev.target.value)
    console.log(searchValue)
  }
  return(
    <>
      <header className="headerContainer">
      <nav>
          <div className="headerContainer__logoWrapper">
            <Link to="/">
              <img src={logo} alt="logo enchapados" />
            </Link>
          </div>
          {!!user
            ? <ul className="headerContainer__links">
                <li>
                  <Link to="/favorites">
                    <MdFavorite size={32} color={"white"}/>
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                      <MdOutlineShoppingCart size={32} color={"white"}/>
                  </Link>
                </li>
              </ul>
            : 
            <div className="headerCointaner__user">
              <Link className="headerCointainer__user--login" to="/login">
                <span>entrar</span> 
                <img className="headerCointainer__user--userImg" src={smileBg} />
              </Link> 
            </div>
          }
      </nav>
      <SearchInput
        handleSearch={handleSearch}
      /> 
    </header>
    </>

  )

}

export { Header };