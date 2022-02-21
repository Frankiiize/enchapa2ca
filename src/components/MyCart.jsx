import React, { useContext, useState } from "react";
import '../styles/components/myCart.css'
import { MdKeyboardArrowLeft, MdClose } from "react-icons/md";

import { CartItem } from "./CartItem.jsx";
import { cartContex } from "../context/cartContext";
const MyCart = ({toggleCart,setToggleCart}) => {
  const { cart, dispatchCart, handleCart, handleIncrement, handleDecrement } = useContext(cartContex)
  
  const sumTotal = () => {
    const reducer= (previusValue, currentValue) => previusValue + currentValue.price * currentValue.quantity;
    const sum = cart.cart.reduce(reducer,0);
    return sum;
  }

  return(
    <aside className="myCart">
      <div className= "myCart__titleContainer">
        <MdKeyboardArrowLeft
          onClick={() =>  setToggleCart(!toggleCart)  }
          size={32}
          color={'gray'}
        />
        <h3 className="myCart__titleContainer-title" >mi carrito</h3>
      </div>

      <div className="myCart__content">
      {cart.cart.map((product) => (
       <CartItem
        key={`product-${product.id}`}
        handleCart={handleCart}
        product={{...product}}
        cart={{...cart}}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
       />
      ))
      }
       
      </div>

      <div className="myCart-order">
        <p>
          <span>total</span>
        </p>
        <p>${sumTotal()}</p>
      </div>
      <button className="primaryBtn">checkOut</button>
    </aside>
  );
}

export { MyCart };