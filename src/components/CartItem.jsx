import React, { useState } from "react";
import '../styles/components/cartItem.css'
import productFAKE from '../assets/images/produtcFAKE.jpg';
import { MdClose } from "react-icons/md";
const CartItem = ({handleCart, product, handleIncrement, cart, handleDecrement }) => {
  

  return(
    <div className="shopping-cart">
      <figure>
        <img src={product.img} alt='foto producto' />
      </figure>
      <div 
        className="shopping-cart__closeIcon"
        onClick={() => handleCart(product)}
        >
        <MdClose
          size={32}
          color={'gray'}
        />
      </div>

      <div className="shopping-cart__details">
        <p>{product.name}</p>
        <p>x<span>{ product.quantity}</span></p>
        <p>${product.price}</p>
      </div>
      
      <div className="shopping-cart__quantityBtn">
        <button
          disabled={product.quantity <= 0 ? true : false}
          onClick={() => handleDecrement(cart, product)} 
          className="primaryBtn"
          >
            -
        </button>
          <span>{ product.quantity}</span>
        <button
          disabled={product.quantity >= 10 ? true : false}
          onClick={() => handleIncrement(cart, product)} 
          className="primaryBtn"
          >
            +
        </button>
      </div>
    </div>
  )
}

export { CartItem }; 