import React, { useEffect, useState } from "react";
import products from '../utils/products.json'
const useGetProducts = () => {
  const [ newProducts, setNewProducts ] = useState(products.nuevosProductos)
  return {
    newProducts
  }
}

export { useGetProducts }; 