import React from "react";

const ProductsList = ({newProducts}) => {
  return(
      <ul className="Products__list">
          {newProducts.map((product) => (
            <li className="Products__item" key={product.id}>
              <img className="Products__item-img" src={product.img}/>
              <h3>{product.name}</h3>
              <div className="Products__item-description">
                <span>precio</span>
                <span><span>$</span>{product.price}</span>
              </div> 
            </li>
          ))}
      </ul>
  )
}

export { ProductsList };