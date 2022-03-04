import React, { useContext, useEffect, useRef, useState } from "react";
import '../styles/pages/loginPage.css'
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/Forms.jsx";
import { useApiCountries } from "../hooks/useApiCountries";
import { regexs } from "../utils/regexExpretions";
import { authContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";

const CreateAccount = () => {
  const { currentEstado, setCurrentEstado, getVzlaCities, getVzlaStates, apiLoading, apiError } = useApiCountries();
  const { registerUser } = useContext(authContext)
  const { formValues, handleOnChange, error } = useForm()
  let navigate = useNavigate();
  
  const form = useRef(null);
  const handleSubmit =  (ev) => {
    ev.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      c_password: formData.get('c_password'),
      cedula: formData.get('cedula'),
      phone: formData.get('phone'),
      phoneCode: formData.get('phoneCode'),
      countryState: formData.get('estados'),
      address: formData.get('address')
    }
    //VALIDATIONS__
      console.log(data)
      registerUser(data).then(() => {
        navigate("/", { replace: true });
      })
   
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
  return (
    <section className="login">
    <h2 className="login__title">Registrate</h2>
     <RegisterForm 
      error={error}
      form={form}
      handleOption={handleOption}
      handleSubmit={handleSubmit}
      getVzlaStates={getVzlaStates} 
      getVzlaCities={getVzlaCities}
      vzlaStates={currentEstado.estadoData}
      vzlaCities={currentEstado.ciudadesData}
      currentEstado={currentEstado.estado}
      apiLoading={apiLoading}
      handleOnChange={handleOnChange}
      formValues={formValues}
      name={true}
      lastName={true}
      email={true}
      password={true}
      phone={true}
      address={true}
      cedula={true}
      submitBtn={true}
      submitBtnClass={'segundaryButton'}
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