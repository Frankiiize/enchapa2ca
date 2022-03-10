import React from "react";

const ShopCartQuantityBtn = ({handleIncrement, handleDecrement, product, cart}) => {
  return (
    <div className="shopping-cart__quantityBtn">
      <button
        disabled={product.quantity <= 0 ? true : false}
        onClick={() => handleDecrement(cart, product)} 
        className="primaryBtn"
        >
          -
      </button>
        <span>{ product.quantity}</span>
      <button
        disabled={product.quantity >= product.available ? true : false}
        onClick={() => handleIncrement(cart, product)} 
        className="primaryBtn"
        >
          +
      </button>
    </div>
  );
}

export { ShopCartQuantityBtn };