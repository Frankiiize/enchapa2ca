import React, { useContext, useRef } from "react";
import "../styles/pages/loginPage.css"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { LoginForm } from "../components/Forms.jsx";

const Login = () => {

  const { userState, singIn, setIsAuth, isAuth} = useContext(authContext);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const form = useRef(null)
  const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      username: formData.get('email'),
      password: formData.get('password')
    }
    if(regex.test(data.username) && data.password.length > 8){
      //debugger
      console.log(data);
      singIn(data.username, data.password);
      setIsAuth(true)
      navigate(from, { replace: true });
    }
    else{
      console.log('error invalid user or password')
    }

  }
  if(userState && isAuth){
    return <Navigate to={from} replace={true} />
  }
 
  
  return(
    <section className="login">
      <h2 className="login__title">Bienvenido a <span>enchapados</span></h2>
      <p>Ingresa a tu cuenta</p>

      <LoginForm handleSubmit={handleSubmit} form={form} />

      <div className="login__links">
        <Link to="/recuperarCuenta">
          ¿Olvidaste tu contraseña?
        </Link>
        <div>
        <span>¿no tienes cuenta?</span>
          <Link to="/createAccount">
            registrate
          </Link>
        </div>
      </div>
     

    </section>
  )

}

export { Login };