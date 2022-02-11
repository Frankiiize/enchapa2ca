import React, { useState } from "react";
import { MdFavorite, MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { FaUserAlt } from 'react-icons/fa'
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import "../styles/components/header.css";
import { SearchInput } from "./SearchInput.jsx";
const Header = () => {
  const [ fakeUser, setFakeUser ] = useState(true);
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
              <h1 >Enchapa2</h1>
            </Link>
          </div>
          {!!fakeUser
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
            : <FaUserAlt size={30} color={"white"} />
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