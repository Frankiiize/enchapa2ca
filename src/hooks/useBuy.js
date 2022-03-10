import React, { useState, useContext } from "react";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import {  getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import { db } from '../services/firebaseConfig'
import { cartContex } from "../context/cartContext";
import { authContext } from "../context/AuthContext";
import { useImgUploader } from "./useImgUploader";

 const deliveryOpInitialState = {
  personal:false,
  delivery: {
    state:false,
    mrw: false,
    zoom:false,
  },
  pay: {
    wireTrans: false,
    mobilPay: false
  },
}
const useBuy = () => {
  const storage = getStorage();
  const {  dispatchCart } = useContext(cartContex);
  const { userState } = useContext(authContext);
  const [ buyComplete, SetBuyComplete ] = useState(null);
  const [ loadingBuy, setLoadingBuy ] = useState(false);
  const { imgUpload, setImgUpload, imgUploadInitialState  }= useImgUploader();
  const [ deliveryOption, setDeliveryOption ] = useState(deliveryOpInitialState);
  
  const makeBuyWithDelivery = async (img,validData,navigateCB) =>{
    const typeOfUserOn = userState?.current?.email || validData.email;
    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = ref(storage, `paidPhotos/${typeOfUserOn}-${Date.now()}.jpg`);
    const uploadTask =  uploadBytesResumable(storageRef, imgUpload.file, metadata);
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      console.log(error);
      setBuyError({
        state: true,
        message: error,
      })

    },
    async () => {
      const getUrl=  await  getDownloadURL(uploadTask.snapshot.ref)
      const downloadURL =  getUrl
      validData.paidMethodURL= downloadURL;
      await makeBuy(validData,navigateCB);
      }
    );
  }
  const makeBuy = async (validData, navigateCB) => {
    validData.status = 'revision';
    validData.shop.map((property) => delete property.added )
    await addDoc(collection(db, "ventas"), validData).then((docRef) => {
      validData.docRefId = docRef.id;
      SetBuyComplete(validData)
      console.log('compra exitosa', docRef.id);
      dispatchCart({type: 'RESET', payload: {cart:[]}})
      setImgUpload(imgUploadInitialState);
      setDeliveryOption(deliveryOpInitialState);

      localStorage.removeItem('cart')
      setLoadingBuy(false);
      navigateCB();
      
    }).catch(error => {
      console.log(error)
      setBuyError({
        state:true,
        message:error
      })
    })
  }
 
  
  return {
    buyComplete,
    SetBuyComplete,
    makeBuyWithDelivery,
    makeBuy,
    imgUpload,
    setImgUpload,
    loadingBuy,
    setLoadingBuy,
    deliveryOption,
    setDeliveryOption,
    
  }
}

export { useBuy }