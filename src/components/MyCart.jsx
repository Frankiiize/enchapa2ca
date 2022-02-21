import React, { useContext, useState } from "react";
//STYLES
import '../styles/components/myCart.css'
//-----STYLES
//ICONS
import { MdKeyboardArrowLeft, MdClose } from "react-icons/md";
import empyShopCart from '../assets/icons/empyShopCart.svg'
//-----ICONS
import { CartItem } from "./CartItem.jsx";
import { cartContex } from "../context/cartContext";
const MyCart = ({toggleCart,setToggleCart}) => {
  const { cart, dispatchCart, handleCart, handleIncrement, handleDecrement } = useContext(cartContex)
  console.log(cart)
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
      {!!cart.cart.length <= 0
        && 
        <div className="shopping-cart__empyShop">
          <h2><span>tu</span> cesta esta vacia</h2>
          <img src={empyShopCart} alt="cesta vacia" />
        </div>
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