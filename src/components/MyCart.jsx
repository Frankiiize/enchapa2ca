import React, { useContext, useState } from "react";
//STYLES
import '../styles/components/myCart.css'
//-----STYLES
//ICONS
import { MdKeyboardArrowLeft, MdClose } from "react-icons/md";
import empyShopCart from '../assets/icons/empyShopCart.svg'
//-----ICONS
//--UTILS
import { sumTotal } from "../utils/SumarTotales";
//-----UTILS
import { CartItem } from "./CartItem.jsx";
import { cartContex } from "../context/cartContext";
import { Link, useLocation } from "react-router-dom";
const MyCart = ({toggleCart,setToggleCart}) => {
  const { cart, handleCart, handleIncrement, handleDecrement } = useContext(cartContex)
  const location = useLocation();
  console.log(cart)
 
  const handlShowCart = () =>{
    setToggleCart(!toggleCart) 
  }

  return(
    <aside className="myCart">
      <div className= "myCart__titleContainer">
        <MdKeyboardArrowLeft
          onClick={handlShowCart}
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
        <p>${sumTotal(cart.cart)}</p>
      </div>
      <Link
        onClick={() => setToggleCart(!toggleCart)}
        className="primaryButton" 
        to="/checkout"
        >checkout
      </Link>
    </aside>
  );
}

export { MyCart };