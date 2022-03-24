import React, {  useContext, useEffect, useRef, useState } from "react";
import ShoppingCart from "../assets/Icomponent/ShoppingCart.jsx";
import AddedShoppinCart from "../assets/Icomponent/AddedShoppinCart.jsx";
import { cartContex } from "../context/cartContext";
import { favoritesContext } from "../context/favoritesContext.js";
import { authContext } from "../context/AuthContext.js";

import { Link } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import star from '../assets/icons/icons8-estrella-relleno-48.png';
import { LoaderElipsis } from "./loaders/loaderElipsis.jsx";
import '../styles/pages/productDetails.css'




const ProducDetailsCard = ({product}) => {
  const { userState } = useContext(authContext);
  const { handleCart, cart } = useContext(cartContex);
  const [ added, setAdded ] = useState(false);
  const { favorites, favLoading, getFavorites, addFavorites, removeFavorites } = useContext(favoritesContext);
  const [ tooltip, setTooltip ] = useState(false);
  useEffect(() => {
    const itemAdded = cart.cart.some(item => item.id === product.id)
    setAdded(itemAdded)
  },[cart])
  useEffect(() => {
    getFavorites()
  },[product])
  
  const isFavorite = favorites.some((fav) => fav.id === product.id)
  

  const handleAddFav = (product) => {
   ( favorites.some((fav) => fav.id === product.id) )
    ? removeFavorites(product)
    : addFavorites(product)
  }

  console.log(product.name.split(" ")[0])

  return(
    <>

      <section className="productDetails__card">
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
          </div>
          <div className="productDetails__caracteristics" >
            <div className="productDetails__caracteristics-Category">
              <h4>categoria</h4>
              <p>{product.category}</p>
            </div>

            <ul className="productDetails__caracteristics-options">
              <li>
                <h4>personalizable</h4>
                <p>{product.custom ? 'si' : 'no'}</p>
              </li>
              {
                product.itemsQuantity && 
                  <li>
                    <h4>cantidad</h4>
                    <p>{product.itemsQuantity} {product.name.split(" ")[0]}</p>
                  </li>
              }
              {
                product.available &&
                <li>
                  <h4>stock</h4>
                  <p>{product.available} disponibles</p>
                </li>
              }
           
            </ul>
             
          </div>
        </div>
        <div className="productDetails__footer">
            <div className="productDetails__footer-price" >
              <span>${product.price}</span>
            </div>
            <button
              className="productDetails__footer-favBtn"
              onClick={() => handleAddFav(product)}
              disabled={ favLoading  ? true : false}
              >
              {
                 isFavorite 
                  ? <MdFavorite 
                    size={32}
                    color={"#ffca28"}
                  />
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
                }}
                onMouseEnter={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
                >
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
                {
                  tooltip && 
                    <div className="tooltip">
                      <span>agregar</span>
                    </div>
                }
            </button>
        </div>
      </section>
      <section>
        {
          true && 
            <ul>
              <li>
                <div>
                  <span>nombre usuario</span>
                  <img src={userState?.db?.photo} style={{width:"32px"}} />
                </div>
                <div>
                  <article>
                    <p>me ha parecido un exelente articulo, los recomiendo al 100%</p>
                  </article>
                </div>
                <div>
                  <img src={star} style={{width:"24px"}}  />
                  <img src={star} style={{width:"24px"}}  />
                  <img src={star} style={{width:"24px"}}  />
                  <img src={star} style={{width:"24px"}}  />
                  <img src={star} style={{width:"24px"}}  />
                </div>
              </li>
            </ul>
        }
      </section>
    </>
  )

}

export { ProducDetailsCard }; 