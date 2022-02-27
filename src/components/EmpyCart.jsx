import React from "react";
import empyShopCart from '../assets/icons/empyShopCart.svg'
import homeIcon from '../assets/icons/HomeIcon.svg'
import empyCartIcon from '../assets/icons/empuCartIcon.svg'

import '../styles/components/empyCart.css'
import { Link } from "react-router-dom";
const EmpyCart = ({cart}) => {
  return(
    <section className="empyCartContainer">
      <ul className="empyCartContainer-list">
          <li>
            <h2><span>tu</span> cesta esta vacia</h2>
          </li>
          <li>
              {!!cart.cart.length <= 0
                && 
                <div className="shopping-cart__empyShop">
                  <img src={empyCartIcon} alt="cesta vacia" />
                </div>
              }
          </li>
          <li>
              <Link 
              className="segundaryButton"
                to="/"
                >
                  comprar!
              </Link>
          </li>
        </ul>
    </section>
  )
}

export { EmpyCart } ;