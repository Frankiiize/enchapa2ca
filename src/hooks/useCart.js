import react, { useReducer } from "react";

const initialState = {
  cart: []
}
const init = (initialState) => {
  return initialState;
}

const cartReducer = (state, action) => {
  switch(action.type){
    case 'ADD_TO_CART':
      const itemToAdd = {
        cart:[...state.cart, action.payload]
      }
      return {
        ...state,
        cart : itemToAdd.cart
      }
      case 'RESET': 
        return init(action.payload)
      default: 
        return state;
  }
}


const useCart = () => {
  const [ cartState, dispatchCart ] = useReducer(cartReducer, initialState, init)
  return{
    cartState,
    dispatchCart
  }
}

export { useCart };