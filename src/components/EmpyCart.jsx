import React from "react";
import empyShopCart from '../assets/icons/empyShopCart.svg'
import homeIcon from '../assets/icons/HomeIcon.svg'
import '../styles/components/empyCart.css'
import { Link } from "react-router-dom";
const EmpyCart = ({cart}) => {
  return(
    <ul>
        <li>
            {!!cart.cart.length <= 0
              && 
              <div className="shopping-cart__empyShop">
                <h2><span>tu</span> cesta esta vacia</h2>
                <img src={empyShopCart} alt="cesta vacia" />
              </div>
            }
        </li>
        <li>
            <Link 
              className="footerContainer__links" to="/"
              >
                <img src={homeIcon} />
                <span>comprar!</span>
            </Link>
        </li>
      </ul>
  )
}

export { EmpyCart } ;