import React from "react";

const useLocalStorage = (storageItem ,initialState) => {
    let parseItem; 
    try{
      const localStorageCart= localStorage.getItem(storageItem);
        if ( !localStorageCart){
          localStorage.setItem(storageItem,JSON.stringify(initialState));
          parseItem = initialState;
          console.log(parseItem);
        } else {
          console.log('si');
          parseItem= JSON.parse(localStorageCart);
        }

    }catch(error){
      console.log(error);
      parseItem = initialState;
    }

  return {
    parseItem
  }
}

export { useLocalStorage };