import React, {useState} from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useImgUploader } from "./useImgUploader";
import { db } from "../services/firebaseConfig";

const formValuesInitialState = {
  producName: '',
  producPrice: '',
  description: '',
  stockAvalible: '',
  custom: false,
  categoryId:'1',
  itemsQuantity:'',
}


const useAdmin = () => {
  const storage = getStorage();
  
  const [ showOrders, setShowOrders ] = useState(false);
  const [ showAddProducts , setShowAddProducts ] = useState(true);
  const { imgUpload, setImgUpload, imgUploadInitialState  } = useImgUploader();
  const [ orderStatus, setOrderStatus ] = useState({
    status: 'revision',
  })
  const [ formValues , setFormValues ] = useState(formValuesInitialState);
  const [ formLoading, setFormLoading ] = useState(false);

  const onChangeProductsForm = (ev) => {
    setFormValues({
      ...formValues,
      [ev.target.name] : ev.target.value
    })
  }
 

  const handleOrderStatus = (ev) => {
    setOrderStatus({
      ...orderStatus,
      [ev.target.name]: ev.target.value
    })
  }

  const writeNewProduct = async (validData) => {
    setFormLoading(true);
    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = ref(storage, `products/${validData.name}`);
    const uploadTask = uploadBytesResumable(storageRef,imgUpload.file,metadata);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is' + progress + '% done');
      },
      (error) => {
        console.log(error)
      },
      async () => {
        const getUrl = await getDownloadURL(uploadTask.snapshot.ref)
        const downloadURL = getUrl;
        validData.img = downloadURL;
        await setNewProduct(validData).then(() => {
          setFormValues(formValuesInitialState);
          setImgUpload(imgUploadInitialState);
        });
      }
    );
  }
  
  const setNewProduct = async (validData) =>{
    const {stockAvalible, ...validDataToDb } = validData
    await addDoc(collection(db, 'products'), validDataToDb).then(async (docRef) => {
      console.log('producto nuevo!!' + docRef.id);
      const stockData = {
        available: parseInt(validData.stockAvalible),
        productRef: docRef.id
      }
      await addDoc(collection(db, 'stock'), stockData)
        .then(async (docRef) => {
          console.log('stock', docRef);
          setFormLoading(false);
        })
    })
    .catch(error => {
      console.log(error);
    })

  } 
 


  return {
    showOrders,
    setShowOrders,
    handleOrderStatus,
    orderStatus,
    showAddProducts,
    setShowAddProducts,
    imgUpload,
    setImgUpload,
    writeNewProduct,
    formValuesInitialState,
    formValues,
    setFormValues,
    onChangeProductsForm,
    formLoading
  }
}

export { useAdmin }; 