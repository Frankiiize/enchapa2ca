import React, { useContext, useRef, useState } from "react";
import '../styles/pages/loginPage.css'
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/Forms.jsx";
import { useApiCountries } from "../hooks/useApiCountries";
import { authContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { LoaderElipsis } from "../components/loaders/loaderElipsis.jsx";

const CreateAccount = () => {
  const { currentEstado, setCurrentEstado, getVzlaCities, getVzlaStates, apiLoading, apiError } = useApiCountries();
  const { registerUser } = useContext(authContext)
  const { formValues, handleOnChange, error, dispatchError, schemaRegister } = useForm();
  const [ registerLoading, setRegisterLoading ] = useState(false);
  let navigate = useNavigate();
  
  const form = useRef(null);

  const handleSubmit = async  (ev) => {
    ev.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lastName'),
      phone: `${formData.get('phoneCode')}${formData.get('phone')}`,
      email: formData.get('email'),
      cedula: formData.get('cedula'),
      password: formData.get('password'),
      c_password: formData.get('c_password'),
      countryState: formData.get('estados'),
      address: formData.get('address')
    }
    //VALIDATIONS__
    try{

      if( data.password === data.c_password){
        const validateRegister = schemaRegister.validate(data);
        const isvalid = await validateRegister;
        console.log(isvalid)
        setRegisterLoading(true);
        await registerUser(data).then(() => {
          setRegisterLoading(false)
          navigate("/", { replace: true });
        })
      }else {
        console.log('password no coninciden');
        dispatchError({type:'VALIDATIONERROR', payload: {path:'password', message: 'contraseñas no coinciden'}})
      }
    }catch(error) {
      console.log(error)
      dispatchError({type: error.name.toUpperCase(), payload: {path:error.path, message: error.message}})
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
  return (
    <section className="login">
    <h2 className="login__title">Registrate</h2>
    {
      registerLoading &&
      <LoaderElipsis />
    }
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