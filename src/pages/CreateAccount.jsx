import React, { useEffect, useRef, useState } from "react";
import '../styles/pages/loginPage.css'
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/Forms.jsx";
import { useApiCountries } from "../hooks/useApiCountries";




const CreateAccount = () => {
  const { currentEstado, setCurrentEstado, getVzlaCities, getVzlaStates, apiLoading, apiError } = useApiCountries();
  
  const form = useRef(null);
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lasName'),
      username: formData.get('email'),
      password: formData.get('password'),
      c_password: formData.get('c_password'),
      phone: formData.get('tlf'),
      city: formData.get('cities'),
      state: formData.get('estados'),
      address: formData.get('address')
    }
    console.log(data)
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
  console.log(currentEstado)
  return (
    <section className="login">
    <h2 className="login__title">Registrate</h2>
     <RegisterForm 
      form={form}
      getVzlaStates={getVzlaStates} 
      getVzlaCities={getVzlaCities}
      vzlaStates={currentEstado.estadoData}
      vzlaCities={currentEstado.ciudadesData}
      handleSubmit={handleSubmit}
      handleOption={handleOption}
      currentEstado={currentEstado.estado}
      apiLoading={apiLoading}
      />
    
      
    <div className="login__links">
      <span>¿tienes una cuenta?</span>
      <Link to="/login">
        Entrar
      </Link>
    </div>
    </section>
  );
};
export { CreateAccount };