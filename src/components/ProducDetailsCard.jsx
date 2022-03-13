import React, {  useContext, useEffect, useRef, useState } from "react";
import ShoppingCart from "../assets/Icomponent/ShoppingCart.jsx";
import AddedShoppinCart from "../assets/Icomponent/AddedShoppinCart.jsx";
import { cartContex } from "../context/cartContext";
import { Link } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { favoritesContext } from "../context/favoritesContext.js";


const ProducDetailsCard = ({product}) => {
  console.log(product)
  const { handleCart, cart } = useContext(cartContex);
  const [ added, setAdded ] = useState(false);
  const { favorites, handleAddFav, favLoading } = useContext(favoritesContext);
  useEffect(() => {
    const itemAdded = cart.cart.some(item => item.id === product.id)
    setAdded(itemAdded)
  },[cart])
  
 


  return(
      <li className="productDetails__card">
        <Link
          className="productDetails__card-ImgContainer"
          onClick={() => {
            localStorage.setItem('detailsProduct',JSON.stringify(product))
          }}
          to={`/detalles/${product.id}`}>
          <img src={product.img} alt={`foto producto ${product.name}`}/>
        </Link>
        
        <div className="productDetails__card-description">
          <div className="productDetails__card-descriptionHeader" >
            <h3>{product.name}</h3>
          </div>

          <div className="productDetails__card-descriptionArticle" >
            <article>
              <p>{product.description}</p>
            </article>
            <div className="productDetails__card-descriptionArticle-category" >
              <h4>categoria</h4>
              <p>{product.category}</p>
            </div>
          </div>
          
        
        </div>
        <div className="productDetails__footer">
            <div className="productDetails__footer-price" >
              <span>${product.price}</span>
            </div>
            <button
              className="productDetails__footer-favBtn"
              onClick={() => handleAddFav(product)}
              >
              {
                favLoading 
                  ? <span>loading..</span>
                  : <MdFavorite 
                      size={32}
                      color={"#4F4F4F"}
                    />
              }
              
            </button>
            <button
                className="productDetails__footer-buyBtn"
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
        </div>
      </li>
  )

}

export { ProducDetailsCard }; 