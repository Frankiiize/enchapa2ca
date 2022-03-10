import React, { useEffect, useState } from "react";
//import products from '../utils/products.json'
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
const useGetProducts = () => {
  const [ newProducts, setNewProducts ] = useState([]);
  const [ productsLoading , setProductsLoading ] = useState(true);

  const getAvailableStock =() => {
    try{
      const getStock = async () => {
        //referencias a laas colecciones 
        const stockRef = query(collection(db,'stock'));
        const productRef = query(collection(db, 'products'));
        //espero que se resuelva las promesas a la llamada de la base de datos 
        const resolveProducts = Promise.resolve(await getDocs(productRef));
        const resolveStock = Promise.resolve( await getDocs(stockRef));
        //arrays para guardar las iteraciones del requeste de la BD
        let currentStock = [];
        let currentProducs = [];
        //iteraciones para obtener la data y pusharla a currentStock y currtentProducts
        resolveProducts.then((product) => {
          product.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id
            currentProducs.push(data)
          })
        })
        resolveStock.then((stock) => {
        stock.forEach((doc) => {
          
           currentStock.push(doc.data())
          })
        });
        //si las promesas se resuelven filtra los productos y le añade su stock correspondiente 
       Promise.resolve([currentStock,  currentProducs ]).then((items) => {
          const stock = items[0];
          const products = items[1];

          let productWithStock = []

          products.map((product) => {
           const e =  stock.filter((elemt) => elemt.productRef === product.id);
           product.available = e[0].available
           productWithStock.push(product)
          }) 
          //añadidos al state de los products 
          setNewProducts(productWithStock)
          setProductsLoading(false);
          console.log({stock})
          console.log({productWithStock})
        })
      }
      getStock();

    }catch(error){
      console.log(error);
    }
  }


 /*  const getAllProducts = () => {
    try{
      const getProducts = async() => {
        const search = query(collection(db, 'products'))
        
        const querySnapShot = await getDocs(search);
        let products = [];
        querySnapShot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id
          products.push(data)
        })
        setNewProducts(products)
      }
      getProducts();
    }
    catch(error){
      console.log(error);
    }
 }  */

  return {
    newProducts,
    getAvailableStock, 
    productsLoading,
  }
}

export { useGetProducts }; 