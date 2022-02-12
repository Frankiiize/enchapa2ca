import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return(
    <>
      <h2>Bienvenido a <span>enchapados</span></h2>
      <p>ingresa a tu cuenta</p>
      <form>
        <label htmlFor="email">
          <input 
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="email"
          />
        </label>
        <label htmlFor="password">
          <input 
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="contraseña"
          />
        </label>
        <button type="submit">entrar</button>
      </form>
      <div>
        <Link to="/recuperarCuenta">
        ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <div>
        <span>¿no tienes cuenta?</span>
        <Link to="/recuperarCuenta">
          registrate
        </Link>
      </div>

    </>
  )

}

export { Login };