import React from "react";
import { Link } from "react-router-dom";


const CreateAccount = () => {

  
  return (
    <>
      <form >
        <label htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="nombre"
          />
        </label>
        <label htmlFor="lastName">
          <input
            id="lastName"
            name="lasName"
            type="text"
            autoComplete="family-name"
            placeholder="apellido"
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="email"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new_password"
            placeholder="contraseña"
          />
        </label>
        <label htmlFor="c_Password">
          <input
            id="c_Password"
            name="c_password"
            type="password"
            autoComplete="new_password"
            placeholder="confirma contraseña"
          />
        </label>
        <label htmlFor="address">
          <input 
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder="direcction"
            />
        </label>
        <button type="submit">Crear</button>
      </form>
      <span>¿tienes una cuenta?</span>
      <Link to="/login">
        Entrar
      </Link>
    </>
  );
};
export { CreateAccount };