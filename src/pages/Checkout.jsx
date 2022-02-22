import React,{ useContext } from "react";
import { cartContex } from "../context/cartContext";
import { authContext } from "../context/AuthContext";
//ICONS
import { AiFillDelete } from "react-icons/ai";
import { ShopCartQuantityBtn } from "../components/ShopCartQuantityBtn.jsx";
//----ICONS
//UTILS
import { sumTotal } from "../utils/SumarTotales";
//---UTILS
const Checkout = () => {
  const { handleIncrement, handleDecrement, product, cart  } = useContext(cartContex);
  const { userState } = useContext(authContext);
  /* const sumTotal = (item) => {
    const reducer= (previusValue, currentValue) => previusValue + currentValue.price * currentValue.quantity;
    const sum = item.reduce(reducer,0);
    return sum;
  } */

  return(
    <ul>
      {cart.cart.map((item) => (
          <li
            key={item.id}
          >
            <img style={{maxWidth: "150px"}} src={item.img} />

            <div>
              <h4>{item.name}</h4>
              <p>
                <span>precio</span>
                <span>{item.price}</span>
              </p>
              <div>
                <span>cantidad</span>
                <ShopCartQuantityBtn 
                  cart={cart}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  product={item}
                />
              </div>
              <span>{sumTotal([item])}</span>
            </div>


            <div>
              <AiFillDelete />
            </div>
          </li>
  
      ))}
    </ul>
  )
}

export { Checkout };