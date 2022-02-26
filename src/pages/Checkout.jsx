import React, { useContext, useState, useRef, useEffect } from "react";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig'
import { cartContex } from "../context/cartContext";
import { authContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { useApiCountries } from "../hooks/useApiCountries";
//ICONS
import { AiFillDelete } from "react-icons/ai";
import { ShopCartQuantityBtn } from "../components/ShopCartQuantityBtn.jsx";
import empyShopCart from '../assets/icons/empyShopCart.svg'
import homeIcon from '../assets/icons/HomeIcon.svg'
//----ICONS
//UTILS
import { sumTotal } from "../utils/SumarTotales";
//---UTILS
//Styles
import  '../styles/pages/checkout.css';
//---Styles
import { RegisterForm } from "../components/Forms.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Checkout = () => {
  const { handleIncrement, handleDecrement, cart } = useContext(cartContex);
  const { userState } = useContext(authContext);
  const { formValues, setFormValues, handleOnChange } = useForm();
  const [ localData ] = useState(JSON.parse(localStorage.getItem('userDb')));
  const { currentEstado, getVzlaCities, getVzlaStates,apiLoading, setCurrentEstado, apiError} = useApiCountries();
  const [ showDeliveryInfo, setShowDeliveryInfo ] = useState(true);
  const navigate = useNavigate();
  const form = useRef(null)
  const option = useRef(null)
  const [ deliveryOption, setDeliveryOption ] = useState({
    personal:false,
    delivery: {
      state:false,
      mrw: false,
      zoom:false,
    },
  })
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
      state: formData.get('estados'),
      shop: cart.cart,
      shipping: deliveryOption,
      timestamp: serverTimestamp(),
      userUID: userState.currentUser.uid,
    }
    console.log(data)
    const docRef = await addDoc(collection(db, "ventas"), data).then(() =>{
      console.log('compra exitosa');
      debugger
      //-----------TODO---------------
        //vaciar carrito de compras
        //hacer rutas anidadas
        //agregar validaciones para (metodo de entrega)
      //-----------TODO---------------
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
      <ul>
        <li>
            {!!cart.cart.length <= 0
              && 
              <div className="shopping-cart__empyShop">
                <h2><span>tu</span> cesta esta vacia</h2>
                <img src={empyShopCart} alt="cesta vacia" />
              </div>
            }
        </li>
        <li>
            <Link 
              className="footerContainer__links" to="/"
              >
                <img src={homeIcon} />
                <span>comprar!</span>
            </Link>
        </li>
      </ul>

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
            <li className="checkoutMain__listItems-Item" key={item.id}>
              <picture>
                <img style={{ maxWidth: "150px" }} src={item.img} />
              </picture>
              <div className="checkoutMain__listItems-details">
                <h4>{item.name}</h4>
                <div className="checkoutMain__listItems--price">
                  <span>precio</span>
                  <span>${item.price}</span>
                </div>
                <div className="checkoutMain__listItems--total">
                  <p>TOTAL</p>
                  <span>${sumTotal([item])}</span>
                </div>
              </div>
              <div className="checkoutMain__listItems-btns">
                <div>
                  <span>cantidad</span>
                  <ShopCartQuantityBtn
                    cart={cart}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    product={item}
                  />
                </div>
                <div className="checkoutMain__listItems-btns--delete">
                  <AiFillDelete 
                    size={24}
                    color={"gray"}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <section className="checkoutMain__resume" >
          <h3>Resumen de la compra</h3>
          <ul className="checkoutMain__resume-checkbox">
            <li>
              <input 
                ref={option}
                onChange={() => setDeliveryOption({
                  personal:true,
                  delivery:{
                    state: false,
                  },
                })}
                checked={deliveryOption.personal}
                type="radio" 
                id="entregaPersonal"
              />
              <label htmlFor="entregaPersonal">entrega personal</label>
            </li>
            {
              deliveryOption.personal &&
              <li
                className={ deliveryOption.personal && 'fade-in'}
              >
                <p>solo valencia</p>
              </li>
            }
            <li>
              <input 
                ref={option}
                onChange={() => setDeliveryOption({
                  personal:false,
                  delivery:{
                    state:true,
                    mrw:false,
                    zoom:false,
                  }
                })} 
                checked={deliveryOption.delivery.state}
                type="radio" 
                id="delivery"/>
              <label htmlFor="delivery">envio</label>
            </li>
            {
              deliveryOption.delivery.state && 
              <ul className={deliveryOption.delivery.state ?'fade-in' : 'checkoutMain__resume-DeliveryOptions'}>
                <li>
                  <input 
                    ref={option}
                    onChange={() => setDeliveryOption({
                      personal:false,
                      delivery:{
                        state:true,
                        mrw:true,
                        zoom:false,
                      }
                    })} 
                    checked={deliveryOption.delivery.mrw}
                    type="radio" 
                    id="mrw"/>
                  <label htmlFor="mrw">MRW</label>
                </li>
                <li>
                  <input 
                    ref={option}
                    onChange={() => setDeliveryOption({
                      personal:false,
                      delivery:{
                        state:true,
                        mrw:false,
                        zoom:true,
                      }
                    })} 
                    checked={deliveryOption.delivery.zoom}
                    type="radio" 
                    id="zoom"/>
                  <label htmlFor="zoom">ZOOM</label>
                </li>
              </ul>

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
                      className="checkoutMain__resume-buy-buyBtn"
                      >
                        comprar
                      </button>
                : 
                <>
                  <button 
                    className="checkoutMain__resume-buy-guest"  >comprar como invitado</button>
                  <Link
                    state={{from: {
                      pathname: "/checkout"
                    }}}
                    className="checkoutMain__resume-buy-buyBtn"  
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
