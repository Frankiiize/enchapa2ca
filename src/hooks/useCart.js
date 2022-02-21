import react, { useReducer } from "react";
import { useLocalStorage } from "./useLocalStorage";
const initialState = {
  cart: []
}
const init = (initialState) => {
  return initialState;
}

const cartReducer = (state, action)=> {
  switch (action.type){
    case 'ADD_TO_CART':
      const cartAdd = {
        cart:[...state.cart, action.payload]
      }
      const storageCart = JSON.stringify(cartAdd)
      localStorage.setItem('cart', storageCart)
      return {
        ...state,
        cart:[...state.cart, action.payload]
      };
    case 'REMOVE_FROM_CART':
      const cartItemRemove = {
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
      const removedStorageCart = JSON.stringify(cartItemRemove);
      localStorage.setItem('cart', removedStorageCart )
      return { 
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
    case 'INCREMENT_QUANTITY': 
      const cartAddIncrement = {
        cart: action.payload
      }
      const cartIncrement = JSON.stringify(cartAddIncrement)
      localStorage.setItem('cart', cartIncrement)
      return {
        ...state,
        cart: action.payload
      }
    case 'DECREMENT_QUANTITY': 
      const cartAddDecrement = {
        cart: action.payload
      }
      const cartDecrement = JSON.stringify(cartAddDecrement)
      localStorage.setItem('cart', cartDecrement)
      return{
        ...state,
        cart: action.payload
      }

    case 'RESET': 
      return init(action.payload)
    default:
      return state;
  }
}


const useCart = () => {
  const { parseItem: parserCart } = useLocalStorage("cart", []);
  const [ cart, dispatchCart ] = useReducer(cartReducer, parserCart, init)
  const itemsAddedToCart = cart.cart.filter(item => item.added)
  
  const idItemsAdded = itemsAddedToCart.map((item) => item.id)
  
  const handleCart = (item) => {
    if(!item.added ){
      (idItemsAdded.includes(item.id))
      ? ( item.added = false,  dispatchCart({type: 'REMOVE_FROM_CART', payload: item}))
      : ( item.added = true, item.quantity = 1, dispatchCart({type:'ADD_TO_CART', payload: item }))
    } 
    else {
      item.added = false;
      dispatchCart({type: 'REMOVE_FROM_CART', payload: item});
    }
  }
  const handleIncrement = (item, product) => {
    const index = item.cart.findIndex(item => item.id === product.id);
    item.cart[index].quantity =  item.cart[index].quantity  + 1
    dispatchCart({type: 'INCREMENT_QUANTITY', payload:item.cart})
  }

  const handleDecrement = (item, product) =>{
    if(product.quantity === 1){
     alert('quieres eliminar el item') //TODO-//añadir confirmacion por parte del usuario//-
     handleCart(product);
     return
    }
    const index = item.cart.findIndex(item => item.id === product.id);
    item.cart[index].quantity =  item.cart[index].quantity  - 1
    dispatchCart({type: 'DECREMENT_QUANTITY', payload:item.cart})
  }

  return{
    cart,
    dispatchCart,
    handleCart,
    handleIncrement,
    handleDecrement
  }

  
}

export { useCart };