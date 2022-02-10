import React from "react";
import { MdFavorite, MdOutlineShoppingCart } from "react-icons/md";
import logo from "../assets/images/logo.jpg";
const Header = () => {
  return(
    <>
      <header className="headerContainer">
      <nav>
        <div className="headerContainer__logoWrapper">
          <a href="/">
            <img src={logo} style={{width:"80px"}} alt="logo enchapado2" />
          </a>
        </div>
        <ul className="className__links">
          <li>
            <a href="/favorites">
              <MdFavorite size={32} color={"black"}/>
            </a>
          
          </li>
          <li>
            <a href="/cart">
                <MdOutlineShoppingCart size={32} color={"black"}/>
            </a>
          </li>
        </ul>
        <div className="headerContainer__search">
          <input type="text" />
        </div>
      </nav>
    </header>
    </>

  )

}

export { Header };