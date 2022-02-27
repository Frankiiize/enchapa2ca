import React, { useContext, useState, useRef, useEffect } from "react";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig'
import { getStorage, ref, uploadBytes } from "firebase/storage";
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
//--------------------------------------imports--------------------------------------//

const Checkout = () => {
  const storage = getStorage();
  const { handleIncrement, handleDecrement, cart, dispatchCart } = useContext(cartContex);
  const { userState } = useContext(authContext);
  const { formValues, setFormValues, handleOnChange } = useForm();
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
        lasName: localData.db.lastName,
        email: localData.db.email,
        tlf: localData.db.phone,
        cedula:localData.db.cedula,
        address: localData.db.address,
      })
    } else {
      setFormValues({
        name: "nombre",
        lasName: "apellido",
        email: "email",
        tlf: "telefono",
        cedula:"cedula de Identidad",
        address: "direccion",
      })
    }
  },[])

  const handleSubmit = async  (ev) => {
    ev.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lasName'),
      phone: formData.get('tlf'),
      address: formData.get('address'),
      email: formData.get('email'),
      cedula: formData.get('cedula'),
      countryState: formData.get('estados'),
      shop: cart.cart,
      shipping: deliveryOption.delivery,
      paidMethod: deliveryOption.pay,
      userUID: userState.currentUser.uid,
      timestamp: serverTimestamp(),
    }
    console.log(data)
    //lamar luego que se registre la compra
   
    const docRef = await addDoc(collection(db, "ventas"), data)
    .then((docRef) =>{
      debugger
      console.log('compra exitosa', docRef.id);
      const storageRef = ref(storage, `paidPhotos/${userState.currentUser.email}-${docRef.id}.jpg`);
      uploadBytes(storageRef, imgUpload.file )
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log(snapshot)
      });
      //-----------TODO---------------
        //vaciar carrito de compras
        //hacer rutas anidadas
        //agregar validaciones para (metodo de entrega)
      //-----------TODO---------------
      dispatchCart({type: 'RESET', payload: {cart: []}})
      localStorage.removeItem('cart')
      navigate('checkoutSucess', {replace:true});
    }).catch(error => console.log(error))
   
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
              //valuesPayMethod &&
              true &&   
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
