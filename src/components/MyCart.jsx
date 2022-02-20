import React, { useState } from "react";
import '../styles/components/myCart.css'
import { MdKeyboardArrowLeft, MdClose } from "react-icons/md";

import { CartItem } from "./CartItem.jsx";
const MyCart = ({toggleCart,setToggleCart}) => {
  const [ quantity, setQuantity ] = useState(0);

  const handleQuantityItems = (increment) =>{
    if(increment){
      setQuantity(quantity + 1)
    }else {
      setQuantity(quantity - 1)
    }
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
       <CartItem 
        quantity={quantity}
        handleQuantityItems={handleQuantityItems}
       />
       
      </div>

      <div className="myCart-order">
        <p>
          <span>total</span>
        </p>
        <p>sumaTOTAL</p>
      </div>
      <button className="primaryBtn">checkOut</button>
    </aside>
  );
}

export { MyCart };