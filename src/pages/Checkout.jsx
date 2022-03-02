import React, { useContext, useState, useRef, useEffect, isValidElement } from "react";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig'
import {  getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import * as yup from 'yup'
import { cartContex } from "../context/cartContext";
import { authContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { useApiCountries } from "../hooks/useApiCountries";
//ICONS
//----ICONS
//UTILS
import { sumTotal } from "../utils/SumarTotales";
//---UTILS
//Styles
import  '../styles/pages/checkout.css';
//---Styles
import { RegisterForm } from "../components/Forms.jsx";
import { Link, useNavigate } from "react-router-dom";
import { CheckOutCardItems } from "../components/CheckOutCardItems.jsx";
import { EmpyCart } from "../components/EmpyCart.jsx";
import { CheckRadios } from "../components/CheckRadios.jsx";
import { FileUploader } from "../components/FileUploader.jsx";
import { buyContext } from "../context/buyContext";
import { Portals } from "../components/modals/Portals.jsx";
import { LoaderElipsis } from "../components/loaders/loaderElipsis.jsx";
//--------------------------------------imports--------------------------------------//

const Checkout = () => {
  const storage = getStorage();
  const navigate = useNavigate();
  const form = useRef(null);
  const option = useRef(null);
  const [ loadingBuy, setLoadingBuy ] = useState(false)
  const { handleIncrement, handleDecrement, cart, dispatchCart } = useContext(cartContex);
  const { userState } = useContext(authContext);
  const { SetBuyComplete } = useContext(buyContext);
  const { formValues, setFormValues, handleOnChange, error, dispatchError, schemaPersonal, schemaDelivery } = useForm();
  const { currentEstado, getVzlaCities, getVzlaStates,apiLoading, setCurrentEstado, apiError} = useApiCountries();
  const [ showDeliveryInfo, setShowDeliveryInfo ] = useState(true);
  const [ imgUpload, setImgUpload ] = useState({
   result: null,
   file:null,
  })
  const [ deliveryOption, setDeliveryOption ] = useState({
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
    paidPhoto: '',
  })

  const makeBuyWithDelivery = async (img,validData) =>{
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
    },
    async () => {
      const getUrl=  await  getDownloadURL(uploadTask.snapshot.ref)
      const downloadURL =  getUrl
      validData.paidMethodURL= downloadURL;
      await makeBuy(validData);
      }
    );
  }
  const makeBuy = async (validData) => {
    await addDoc(collection(db, "ventas"), validData).then((docRef) => {
      validData.docRefId = docRef.id;
      SetBuyComplete(validData)
      console.log('compra exitosa', docRef.id);
      dispatchCart({type: 'RESET', payload: {cart:[]}})
      localStorage.removeItem('cart')
      setLoadingBuy(false);
      navigate('checkoutSucess', {replace:true});
    }).catch(error => console.log(error))
  }
 
  const handleSubmit = async  (ev) => {
    ev.preventDefault();
    dispatchError({type:'RESET_ERROR'})
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lastName'),
      phone: `${formData.get('phoneCode')}${formData.get('phone')}`,
      address: formData.get('address'),
      email: formData.get('email'),
      cedula: formData.get('cedula'),
      countryState: formData.get('estados'),
      shop: cart.cart,
      envio: deliveryOption?.personal && 'entrega-personal' || deliveryOption.delivery?.state && 'delivery' ,
      shipping: deliveryOption?.delivery?.mrw && 'mrw' || 
                deliveryOption?.delivery?.zoom && 'zoom' || 
                (deliveryOption.delivery?.mrw === false && deliveryOption.delivery?.zoom === false) && false,

      paidMethod: deliveryOption.pay?.mobilPay && 'pago-mobil' || 
                  deliveryOption.pay?.wireTrans && 'transferencia-bancaria' || 
                  (deliveryOption.pay?.wireTrans === false && deliveryOption.pay?.mobilPay === false) && 'acordar-pago' ,

      userUID: userState.currentUser ? userState.currentUser.uid : 'invitado',
      timestamp: serverTimestamp(),
      totalPrice: sumTotal(cart.cart),
    }
    console.log(data)
    try{
      if(deliveryOption.personal) {
        const validateFormPersonal = schemaPersonal.validate(data);
        const isvalid = await validateFormPersonal;
        console.log(isvalid);
        setLoadingBuy(true)
        await makeBuy(isvalid);
        
      }else if(deliveryOption.delivery.state){
        const validateFormDelivery = schemaDelivery.validate(data);
        const isvalid = await validateFormDelivery;
        if(imgUpload.file !== null){
          console.log(isvalid)
          setLoadingBuy(true)
          //go upload img
          debugger
          await makeBuyWithDelivery(imgUpload.file, isvalid)
        }
        else {
          console.log('sube tu comprobante de pago')
          throw new Error('SUBE_COMPROBANTE')
        }
      }
      else {
        throw new Error('SELECCIONA_UNA_OPCION')
      }
    }catch(error){
      dispatchError({type: error.name.toUpperCase(), payload: {path:error.path, message: error.message}})
      console.log({error})
    }
   
  }
  const handleOption = () => {
    const formData = new FormData(form.current)
    const option = {
      estado: formData.get('estados'),
      ciudad: formData.get('cities')
    }
    setCurrentEstado({
      ...currentEstado,
      estado: option.estado,
      ciudad: option.ciudad
    })
    
  }
  if(!!cart.cart.length <= 0){
    return (
      <EmpyCart
        cart={cart}
      />
    )
  }
  return (
    <main className={userState.currentUser ?  'checkoutMain footer__user-on' : 'checkoutMain'}>
     {
      !!loadingBuy && 
      <Portals>
        <LoaderElipsis />
      </Portals>
    }
      <div className="checkoutMain__title">
        <h3>envios a toda Venezuela</h3>
      </div>
      <section className="checkoutMainWrapper">
        <ul className="checkoutMain__listItems">
          {cart.cart.map((item) => (
           <CheckOutCardItems
              key={item.id} 
              item={item}
              cart={cart}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
           />
          ))}
        </ul>

        <section className="checkoutMain__resume" >
          <h3>Resumen de la compra</h3>
          <ul className="checkoutMain__resume-checkbox">
            <CheckRadios
              dispatchError={dispatchError}
              error={error}
              dispatchError={dispatchError}
              refOption={option}
              deliveryOption={deliveryOption}
              setDeliveryOption={setDeliveryOption}
              serverTimestamp={serverTimestamp}
            >
             { 
              deliveryOption.delivery.state  &&
              //true &&   
                <FileUploader  
                  setImgUpload={setImgUpload}
                  imgUpload={imgUpload}
                  errorForm={error}
                  dispatchError={dispatchError}
                />
             }

            </CheckRadios>
            {
              !!imgUpload.result &&
              <picture>
                  <img src={imgUpload.result} alt='foto comprobante de pago' />
              </picture>
            }
          </ul>
        
          <div className="checkoutMain__resume-deliveryInfo"> 
           
            <button
              className="checkoutMain__resume--deliveryInfoBtn"
              onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}
              >
              Informacion de contacto
            </button>
            {
              !!showDeliveryInfo &&
                <RegisterForm
                  error={error}
                  dispatchError={dispatchError}
                  form={form}
                  setFormValues={setFormValues}
                  formValues={formValues}
                  animation={'fade-in'}
                  handleOnChange={handleOnChange}
                  handleOption={handleOption}
                  handleSubmit={handleSubmit}
                  getVzlaStates={getVzlaStates} 
                  getVzlaCities={getVzlaCities}
                  vzlaStates={currentEstado.estadoData}
                  vzlaCities={currentEstado.ciudadesData}
                  currentEstado={currentEstado.estado}
                  apiLoading={apiLoading}
                  formValues={formValues}
                  name={true}
                  lastName={true}
                  address={deliveryOption.delivery.state ? true : false}
                  email={true}
                  cedula={true}
                  phone={true}
                />
            }
          </div>

          <div className="checkoutMain__resume-total">
              <span>total</span>
              <span>${sumTotal(cart.cart)}</span>
          </div>
          <div className="checkoutMain__resume-buy">
            <div className="checkoutMain__resume-buyWrapper">
              {
                userState.currentUser 
                ?  <button
                      disabled={cart.cart.length <= 0 ? true : false}
                      onClick={handleSubmit}
                      className="primaryButton"
                      >
                        comprar
                      </button>
                : 
                <>
                  <button
                    onClick={handleSubmit} 
                    className="segundaryButton"  >comprar como invitado</button>
                  <Link
                    state={{from: {
                      pathname: "/checkout"
                    }}}
                    className="primaryButton"  
                    to='/login'
                    >
                      comprar/ingresar
                    </Link> 
                </>

              }
            </div>
          </div>
        </section>
      </section>

    </main>
  );
};

export { Checkout };
