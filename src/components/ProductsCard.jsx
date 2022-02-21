import React, { useCallback, useContext, useState } from "react";
import '../styles/components/productCard.css'
import shoppingCart from '../assets/icons/shoppingCart.svg'
import addedshopCart from '../assets/icons/shoppingCartAddedr.svg'
import { cartContex } from "../context/cartContext";
import { Link } from "react-router-dom";
import { productsContext } from "../context/productsContext";


const ProductsCard = ({product}) => {
  const { handleCart } = useContext(cartContex);
  const [ added, setAdded ] = useState(false)

  return(
      <li className="Products__item" >
        <Link className="Product__item-LINK"
        to={`/detalles/${product.id}`}>
          <picture className="Products__item-img" >
            <img src={product.img} alt={`foto producto ${product.name}`}/>
          </picture>
          <div className="Products__item-title" >
            <h3>{product.name}</h3>
          </div>
          <div className="Products__item-description">
            <div className="Products__item-descriptionDetails">
              <span>precio</span>
              <span>${product.price}</span>
            </div>
            <article>
              <p>{product.description}</p>
            </article>
          </div>
        </Link>
        <div className="Products__item-btn">
          <button onClick={() => {
            handleCart({...product});
            setAdded(!added);
            }}>
            <img className="Products__item-cart" src={!added ? shoppingCart : addedshopCart} alt="shopping cart"/>
          </button> 
        </div>
      </li>
  )

}

export { ProductsCard }; 