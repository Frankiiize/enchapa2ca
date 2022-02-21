import React from "react";

const useLocalStorage = (storageItem,initialState) => {
  const localStorageCart= localStorage.getItem(storageItem);
  let parseItem; 

  if ( !localStorageCart){
    console.log('no')
    localStorage.setItem(storageItem,JSON.stringify(initialState))
    parseItem= []
  } else {
    console.log('si')
    parseItem= JSON.parse(localStorageCart)
  }
  return {
    parseItem
  }
}

export { useLocalStorage };