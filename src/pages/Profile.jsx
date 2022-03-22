import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
//UTILS
import '../styles/pages/profile.css'
//----UTILS
//ICONS
import OrderHistoryIcon from '../assets/Icomponent/OrderHistoryIcon.jsx';
import { MdArticle } from 'react-icons/md'
import EnchapadoIcon from "../assets/Icomponent/EnchapadoIcon.jsx";
import ShoppingCart from "../assets/Icomponent/ShoppingCart.jsx";
//---ICONS
//APIS
import { RegisterForm } from "../components/Forms.jsx";
import { useApiCountries } from "../hooks/useApiCountries";
//----APIS
const Profile = () => {
  const {  currentEstado, getVzlaCities, getVzlaStates, setCurrentEstado,apiLoading, apiError} = useApiCountries();
  const { userState, updateUserData, logOut } = useContext(authContext);
  const [ showEdit, setShowEdit ] = useState(false);
  const { formValues, setFormValues, handleOnChange, error, dispatchError, schemaPersonal, schemaDelivery } = useForm();
  const navigate = useNavigate();
  const [ localData, setLocalData ] = useState(JSON.parse(localStorage.getItem('userDb')))
  const form = useRef(null)
  useEffect(() => {
    setFormValues({
      name: localData.db.name,
      lasName: localData.db.lastName,
      email: localData.db.email,
      phone: localData.db.phone,
      address: localData.db.address,
    })
  },[])
  

  const handleSubmit =  (ev) => {
    ev.preventDefault();
    debugger
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      phoneCode: formData.get('phoneCode'),
      address: formData.get('address'),
      estado: formData.get('estados'),
    }
    console.log(data)
    if( data.name.length > 1 && //TO-DO = compronar que no son los mismos datos ya guardados
      data.lastName.length > 1 && 
      data.address.length > 1 ){
        console.log(data)
        debugger
        updateUserData(data).then(()=> {
          console.log('update con exito')
        })
    } else {
      console.log('datos invalidos')
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
          {
            userState.db.photo 
             ? <img src={userState.db.photo } alt="user photo" />
             : <EnchapadoIcon />
          }
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
              <EnchapadoIcon className="menu__links-perfil"  />
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
                error={error}
                handleOnChange={handleOnChange}
                handleSubmit={handleSubmit}
                handleOption={handleOption}
                getVzlaStates={getVzlaStates} 
                getVzlaCities={getVzlaCities}
                vzlaStates={currentEstado.estadoData}
                vzlaCities={currentEstado.ciudadesData}
                currentEstado={currentEstado.estado}
                apiLoading={apiLoading}
                btnTitle={'actualizar'}
                formValues={formValues}
                name={true}
                lastName={true}
                address={true}
                phone={true}
                submitBtn={true}
              />
            </div>
          }
          <li>
            <Link to="./historialOrdenes">
            <MdArticle size={28} color={"#4F4F4F"}/>
              <p>Ordenes</p>
            </Link>
          </li>
          <li>
            <Link to="/carrito">
              <ShoppingCart 
                fill={"#4F4F4F"}
                width={32}
                height={32}
              /> 
              <p>Carrito</p>
            </Link>
          </li>
        </ul>
      </nav>
      <section className="profileFooter footer__user-on">
        <button onClick={handleLogOut} className="segundaryButton">salir</button>
      </section>
    </main>
  )
}

export { Profile } ;