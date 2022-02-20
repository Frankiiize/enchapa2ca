import React from "react";
import '../styles/components/cartItem.css'
import productFAKE from '../assets/images/produtcFAKE.jpg';
import { MdClose } from "react-icons/md";
const CartItem = ({img = productFAKE, title, price}) => {
  return(
    <div className="shopping-cart">
      <figure>
        <img src={img} alt='foto producto' />
      </figure>
      <p>produc.title</p>
      <p>produc.price</p>
      <MdClose 
        size={32}
        color={'gray'}
      />
    </div>
  )
}

export { CartItem }; 