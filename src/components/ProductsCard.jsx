import React, {  useContext, useEffect, useRef, useState } from "react";
import ShoppingCart from "../assets/Icomponent/ShoppingCart.jsx";
import AddedShoppinCart from "../assets/Icomponent/AddedShoppinCart.jsx";
import { cartContex } from "../context/cartContext";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

import '../styles/components/productCard.css';


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
          onClick={() => {
            localStorage.setItem('detailsProduct',JSON.stringify(product))
          }}
          to={`/detalles/${product.id}`}>
          <img loading="lazy" src={product.img} alt={`foto producto ${product.name}`}/>
        </Link>
        {
          !!product.custom &&
          <div className="Product__item-customContainer" >
            <span>{product.custom ? 'personalizable' : undefined}</span>
          </div>

        }
        <div
          onClick={(e) => {
            console.log(e.target.className)
            if(e.target.className !== "Products__item-cart" && window.innerWidth < 700){
              setOverlay(!overlay)
            }
          }} 
          onMouseLeave={(e) =>{
            if(e.target.className !== "Products__item-cart" && window.innerWidth > 700){
              setOverlay(!overlay)
            }
          }}
          onMouseEnter={(e) =>{
            if(e.target.className !== "Products__item-cart" && window.innerWidth > 700){
              setOverlay(!overlay)
            }
          }}
          className={overlay ? "Products__item-description showOverlay" :" Products__item-description "}>
          <div className="Products__item-description-header">
            <h3>{product.name}</h3>
     
            <div className="Products__item-price">
              <span>${product.price}</span>
            
            </div>
            {
              !overlay 
              ? <MdKeyboardArrowUp 
              size={32}
              color={'gray'} 
              />
              : <MdKeyboardArrowDown 
                size={32}
                color={'gray'}
              />
            }
            
          </div>
          <div className="Products__item-descriptionDetails">
            <article>
              <p>{product.description}</p>
            </article>
            <div>
              <Link
                to={`/detalles/${product.id}`}
                className="Products__item-descriptionDetails-link primaryButton">
                <span>ver</span>
              </Link>
            </div>
          </div>
        </div>

          <button className="Products__item-btnShop"
            onClick={(e) => {
              handleCart({...product});
              setAdded(!added);
            }}>
            {
              !added 
              ? <ShoppingCart 
                fill={"#4F4F4F"}
                width={32}
                height={32}
              /> 
              : <AddedShoppinCart 
                  fill={"#437DBC"}
                  width={32}
                  height={32}
              />
            }
        </button> 
        
       
      </li>
  )

}

export { ProductsCard }; 

