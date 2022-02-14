import React from "react";
import shoppingCart from '../assets/icons/shoppingCart.svg'

const ProductsList = ({newProducts}) => {
  return(
      <ul className="Products__list">
          {newProducts.map((product) => (
            <li className="Products__item" key={product.id}>
              <img className="Products__item-img" src={product.img}/>
              <h3>{product.name}</h3>
              <div className="Products__item-description">
                <span>precio</span>
                <span><span>$</span>{product.price}</span>
              </div> 
              <img className="Products__item-cart" src={shoppingCart} alt="shopping cart"/>
            </li>
          ))}
      </ul>
  )
}

export { ProductsList };