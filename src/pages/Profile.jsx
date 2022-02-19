import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
//UTILS
import '../styles/pages/profile.css'
import { regexs } from "../utils/regexExpretions";
//----UTILS
//ICONS
import OrderHistoryIcon from '../assets/icons/OrderHistoryIcon.svg';
import SmileUserINVER from '../assets/icons/smileINVER.svg';
import shoppingCart from '../assets/icons/shoppingCart.svg'
//---ICONS
//APIS
import { RegisterForm } from "../components/Forms.jsx";
import { useApiCountries } from "../hooks/useApiCountries";
//----APIS
const Profile = () => {
  const {  currentEstado, getVzlaCities, getVzlaStates, setCurrentEstado,apiLoading, apiError} = useApiCountries();
  const { userState, updateUserData, logOut } = useContext(authContext);
  const [ showEdit, setShowEdit ] = useState(false);
  const { formValues, setFormValues, handleOnChange } = useForm();
  const navigate = useNavigate();
  const [ localData, setLocalData ] = useState(JSON.parse(localStorage.getItem('userDb')))
  const form = useRef(null)
  useEffect(() => {
    setFormValues({
      name: localData.db.name,
      lasName: localData.db.lastName,
      email: localData.db.email,
      password: '',
      c_password: '',
      tlf: localData.db.phone,
      address: localData.db.address,
    })
  },[])
  

  const handleSubmit =  (ev) => {
    ev.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lasName'),
      phone: formData.get('tlf'),
      address: formData.get('address')
    }
    console.log(data)
    if( data.name.length > 1 && 
      data.lastName.length > 1 && 
      data.address.length > 1 &&
      regexs.phone.test(data.phone)){
        console.log(data)
        debugger
        updateUserData(data).then(()=> {
          console.log('update con exito')
        })
    } else {
      console.log('datos invalidos')
    }
  }
  //LOGOUTH REMOVER BOTTON
  const handleLogOut = () => {
    logOut();
    navigate('/')
  }
  //LOGOUTH REMOVER BOTTON
  return(
    <main className="main">
      <section className="profileHero">
        <div className="profileHero__wrapper">
          <picture className="profileHero__userPhoto">
            <img  src={userState.db.photo ? userState.db.photo : SmileUserINVER} alt={`foto de `}/>
          </picture>
          <div className="profileHero__userInfo">
            <p>
              <span>
                {userState.db.name}
              </span>
              <span>
                {userState.db.lastName}
              </span>
            </p>
            <span>{userState.db.phone}</span>
            <span>{userState.db.email}</span>
          </div>
        </div>
      </section>
      <nav className="profileNav">
        <h3>mi cuenta</h3>
        <ul>
          <li>
            <button onClick={() => setShowEdit(!showEdit)}>
              <img src={SmileUserINVER} alt='user icon'/>
              <p>
                <span>Editar perfil</span>
                <span>Puedes editar tus datos personales</span>
              </p>
            </button>
          </li>
          {
            showEdit && 
            <div className="profileNav__form">
              <RegisterForm 
                form={form}
                handleOnChange={handleOnChange}
                handleSubmit={handleSubmit}
                getVzlaStates={getVzlaStates} 
                getVzlaCities={getVzlaCities}
                vzlaStates={currentEstado.estadoData}
                vzlaCities={currentEstado.ciudadesData}
                currentEstado={currentEstado.estado}
                apiLoading={apiLoading}
                btnTitle={'actualizar'}
                formValues={formValues}
                registerBasic={true}
              />
            </div>
          }
          <li>
            <Link to="./historialOrdenes">
              <img src={OrderHistoryIcon} alt='user icon'/>
              <p>Ordenes</p>
            </Link>
          </li>
          <li>
            <Link to="/carrito">
              <img src={shoppingCart} alt='user icon'/>
              <p>Carrito</p>
            </Link>
          </li>
        </ul>
      </nav>
      <section className="profileFooter footer__user-on">
        <button onClick={handleLogOut} className="primaryBtn">salir</button>
      </section>
    </main>
  )
}

export { Profile } ;