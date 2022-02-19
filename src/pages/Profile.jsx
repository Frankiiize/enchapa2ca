import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
//ICONS
import OrderHistoryIcon from '../assets/icons/OrderHistoryIcon.svg';
import SmileUserINVER from '../assets/icons/smileINVER.svg';
import shoppingCart from '../assets/icons/shoppingCart.svg'
//---ICONS
import '../styles/pages/profile.css'
import { RegisterForm } from "../components/Forms.jsx";
import { useApiCountries } from "../hooks/useApiCountries";
const Profile = () => {
  const {  currentEstado, getVzlaCities, getVzlaStates, setCurrentEstado,apiLoading, apiError} = useApiCountries();
  const { userState, getUserData } = useContext(authContext);
  const [ showEdit, setShowEdit ] = useState(false);
  const { logOut } = useContext(authContext);

  const [ formValues , setFormValues ] = useState({
    name: 'frank'
  })
  console.log(formValues)
  const navigate = useNavigate()
  const handleOnChange = (ev) => {
    setFormValues({name: ev.target.value})
    console.log(ev.target.value)
  }
  const handleSubmit = (value) => {
    console.log(value)
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
            <>
              <RegisterForm 
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
              />
            </>
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