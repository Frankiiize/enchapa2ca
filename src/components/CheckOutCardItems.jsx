import React from "react";
import { sumTotal } from "../utils/SumarTotales";
import { ShopCartQuantityBtn } from "../components/ShopCartQuantityBtn.jsx";
import { AiFillDelete } from "react-icons/ai";
import '../styles/components/checkOutCardItems.css'
const CheckOutCardItems = ({item, cart, handleIncrement, handleDecrement}) => {
  return (
    <li className="checkoutMain__listItems-Item" >
      <picture>
        <img style={{ maxWidth: "150px" }} src={item.img} />
      </picture>
      <div className="checkoutMain__listItems-details">
        <h4>{item.name}</h4>
        <div className="checkoutMain__listItems--price">
          <span>precio</span>
          <span>${item.price}</span>
        </div>
        <div className="checkoutMain__listItems--total">
          <p>TOTAL</p>
          <span>${sumTotal([item])}</span>
        </div>
      </div>
      <div className="checkoutMain__listItems-btns">
        <div>
          <span>cantidad</span>
          <ShopCartQuantityBtn
            cart={cart}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            product={item}
          />
        </div>
        <div className="checkoutMain__listItems-btns--delete">
          <AiFillDelete 
            size={24}
            color={"gray"}
          />
        </div>
      </div>
    </li>
  )
}
export { CheckOutCardItems }