import React, { useContext, useState, useRef, useEffect, isValidElement } from "react";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig'
import { getStorage, ref, uploadBytes } from "firebase/storage";
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
//--------------------------------------imports--------------------------------------//

const Checkout = () => {
  const storage = getStorage();
  const { handleIncrement, handleDecrement, cart, dispatchCart } = useContext(cartContex);
  const { userState } = useContext(authContext);
  const { SetBuyComplete } = useContext(buyContext);
  const { formValues, setFormValues, handleOnChange, error, dispatchError } = useForm();
  const [ localData ] = useState(JSON.parse(localStorage.getItem('userDb')));
  const { currentEstado, getVzlaCities, getVzlaStates,apiLoading, setCurrentEstado, apiError} = useApiCountries();
  const [ showDeliveryInfo, setShowDeliveryInfo ] = useState(true);
 //---------------UPLOADPHOTO STATES----------------------//
 const [ imgUpload, setImgUpload ] = useState({
   result: null,
   file:null
  })
/*   const [ userID, setUserID ] = useState('');
  useEffect(() => {
    setUserID(userState.currentUser?.uid)
  },[userState])
  const storageRef = ref(storage, `paidPhotos/${userID}.jpg`); */
  //---------------UPLOADPHOTO STATES----------------------//
  
  const navigate = useNavigate();
  const form = useRef(null);
  const option = useRef(null);
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
    paidPhoto: ''
  })
  //comprobacion para mostrar metodos de pago//
  const deliveryCheck = Object.values(deliveryOption.delivery).includes(true) ; 
  const valuesPayMethod = (deliveryCheck && deliveryOption.delivery.mrw || deliveryOption.delivery.zoom ) ? true : false;
  //comprobacion para mostrar metodos de pago//
 
  useEffect(() => {
    if(localData !== null){
      setFormValues({
        name: localData.db.name,
        lastName: localData.db.lastName,
        email: localData.db.email,
        tlf: localData.db.phone.slice(4),
        cedula:localData.db.cedula,
        address: localData.db.address,
      })
    } else {
      setFormValues({
        name: "nombre",
        lastName: "apellido",
        email: "email",
        tlf: "telefono",
        tlfCode:"0424",
        cedula:"cedula de Identidad",
        address: "direccion",
      })
    }
  },[])

  let schemaPersonal = yup.object().shape({
    name: yup.string().matches(/\w{2,}/g,{message: 'ingresa tu nombre'}).required('nombre requerido'),
    lastName: yup.string().matches(/\w{2,}/g,{message: 'ingresa tu apellido'}).required('apellido requerido'),
    phone: yup.string().matches(/^(0414|0424|0412|0416|0426)[0-9]{7}$/gm, {message: "Ingrese un número válido."}).required('telefono requerido'),
    email: yup.string().email('ingresa un email valido').required('email requerido'),
    cedula: yup.string().matches(/[0-9]{1,8}/,{message: 'ingresa un numero de cedula valido'}).required('cedula requerida'),
    envio: yup.string().matches(/^(entrega-personal|delivery)$/g,{message:'selecciona un metodo de envio'}).required('selecciona un metodo de envio'),
  })
  let schemaDelivery = yup.object().shape({
    name: yup.string().matches(/\w{2,}/g,{message: 'ingresa tu nombre'}).required('nombre requerido'),
    lastName: yup.string().matches(/\w{2,}/g,{message: 'ingresa tu apellido'}).required('apellido requerido'),
    phone: yup.string().matches(/^(0414|0424|0412|0416|0426)[0-9]{7}$/gm, {message: "Ingrese un número válido."}).required('telefono requerido'),
    email: yup.string().email('ingresa un email valido').required('email requerido'),
    cedula: yup.string().matches(/[0-9]{8}/,{message: 'ingresa un numero de cedula valido'}).required('cedula requerida'),
    envio: yup.string().matches(/^(entrega-personal|delivery)$/g,{message:'selecciona un metodo de envio'}).required('selecciona un metodo de envio'),
    countryState: yup.string().required('selecciona tu estado'),
    address: yup.string().matches(/\w{2,}/g,{message: 'ingresa tu direccion'}).required('direccion requerida'),
    shipping: yup.string().matches(/^(mrw|zoom)$/g,{message:'selecciona un currier'}).required('selecciona un currier'),
    paidMethod: yup.string().matches(/^(pago-mobil|transferencia-bancaria)$/g,{message: 'selecciona un metodo de pago'}).required('metodo de pago requerido'),
    userUID: yup.string(),
    totalPrice: yup.number().integer().required('sin articulos')
  })
 
  

  const handleSubmit = async  (ev) => {
    ev.preventDefault();
    dispatchError({type:'RESET_ERROR'})
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lastName'),
      phone: `${formData.get('phoneCode')}${formData.get('tlf')}`,
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
        const validateFormPersonal = schemaPersonal.validate(data)
        const isvalid = await validateFormPersonal
        console.log(isvalid)
      }else if(deliveryOption.delivery.state){
          const validateFormDelivery = schemaDelivery.validate(data);
        const isValid = await validateFormDelivery
        console.log(isValid)
      }
      else {
        throw new Error('SELECCIONA_UNA_OPCION')
      }
    }catch(error){
      dispatchError({type: error.name.toUpperCase(), payload: {path:error.path, message: error.message}})
      console.log({error})
 
    }
    /* await schema.validate(data).then((validateForm) => {
        console.log('datos validos',validateForm)

    }).catch(error =>{ 
      console.log(error.name)
      console.log(error.path)
      console.log(error.errors)
      console.log(error.inner)
    }) */
    
    //lamar luego que se registre la compra
   
   /*  const docRef = await addDoc(collection(db, "ventas"), data)
    .then((docRef) =>{
      debugger
      data.docRefId = docRef.id;
      SetBuyComplete(data)
      console.log('compra exitosa', docRef.id);

      const storageRef = ref(storage, `paidPhotos/${userState.currentUser.email}-${docRef.id}.jpg`);
      uploadBytes(storageRef, imgUpload.file )
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log(snapshot)
      });
      //-----------TODO---------------
        //vaciar carrito de compras--listo
        //hacer rutas anidadas
        //agregar validaciones para (metodo de entrega)
        // redireccionar paginas de succes (entrega personal, delivey)
        //validar tipo de archivos 
      //-----------TODO---------------
      dispatchCart({type: 'RESET', payload: {cart: []}})
      localStorage.removeItem('cart')
    }).catch(error => console.log(error)) */
    //navigate('checkoutSucess', {replace:true});
   
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
              refOption={option}
              deliveryOption={deliveryOption}
              setDeliveryOption={setDeliveryOption}
              valuesPayMethod={valuesPayMethod}
              
              serverTimestamp={serverTimestamp}
            >
             { 
              deliveryOption.delivery.state  &&
              //true &&   
                <FileUploader  
                  setImgUpload={setImgUpload}
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
                  animation={'fade-in'}
                  form={form}
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
