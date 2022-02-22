import React, {  useContext, useEffect, useRef, useState } from "react";
import '../styles/components/productCard.css';
import shoppingCart from '../assets/icons/shoppingCart.svg';
import addedshopCart from '../assets/icons/shoppingCartAddedr.svg';
import { cartContex } from "../context/cartContext";
import { Link } from "react-router-dom";


const ProductsCard = ({product}) => {
  const { handleCart, cart } = useContext(cartContex);
  const [ added, setAdded ] = useState(false);
  const [ overlay, setOverlay ] = useState(false);
  useEffect(() => {
    const itemAdded = cart.cart.some(item => item.id === product.id)
    setAdded(itemAdded)
  },[cart])
  

  return(
      <li className="Product__item" >
     
        <Link className="Product__item-Img"
          to={`/detalles/${product.id}`}>
          <img src={product.img} alt={`foto producto ${product.name}`}/>
        </Link>
        <div
          onClick={(e) => {
            console.log(e.target.className)
            if(e.target.className !== "Products__item-cart"){
              setOverlay(!overlay)
            }
          }} 
          className={overlay ? "Products__item-description showOverlay" :" Products__item-description "}>
          <div className="Products__item-description-header">
            <h3>{product.name}</h3>
     
            <div className="Products__item-btn">
              <span>${product.price}</span>
              <button className="Products__item-btnShop"
                onClick={(e) => {
                  handleCart({...product});
                  setAdded(!added);
                  
                }}>
                <img className="Products__item-cart" src={!added ? shoppingCart : addedshopCart} alt="shopping cart"/>
              </button> 
            </div>
          </div>
          <div className="Products__item-descriptionDetails">
            <article>
              <p>{product.description}</p>
            </article>
            <div>
              <Link
                to={`/detalles/${product.id}`}
                className="Products__item-descriptionDetails-link primaryBtn">
                <span>ver</span>
              </Link>
            </div>
          </div>
        </div>
        
       
      </li>
  )

}

export { ProductsCard }; 