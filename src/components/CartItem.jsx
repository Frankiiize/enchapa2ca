import React from "react";
import '../styles/components/cartItem.css'
import productFAKE from '../assets/images/produtcFAKE.jpg';
import { MdClose } from "react-icons/md";
const CartItem = ({img = productFAKE, title, price,quantity = 0, handleQuantityItems}) => {
  return(
    <div className="shopping-cart">
      <figure>
        <img src={img} alt='foto producto' />
      </figure>
      <div 
        className="shopping-cart__closeIcon"
        onClick={() => console.log('click')}
        >
        <MdClose 
          size={32}
          color={'gray'}
        />
      </div>

      <div className="shopping-cart__details">
        <p>Cartuchera</p>
        <p>x<span>{quantity}</span></p>
        <p>$35</p>
      </div>
      
      <div className="shopping-cart__quantityBtn">
        <button
          disabled={quantity === 0 ? true : false}
          onClick={() => handleQuantityItems(false)} 
          className="primaryBtn"
          >
            -
        </button>
          <span>{quantity}</span>
        <button 
          disabled={quantity === 10 ? true : false}
          onClick={() => handleQuantityItems(true)} 
          className="primaryBtn"
          >
            +
        </button>
      </div>
    </div>
  )
}

export { CartItem }; 