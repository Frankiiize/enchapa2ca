import React, { useEffect, useRef, useState } from "react";
import '../styles/pages/loginPage.css'
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/Forms.jsx";
import { useApiCountries } from "../hooks/useApiCountries";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig'
import { regexs } from "../utils/regexExpretions";

const CreateAccount = () => {
  const { currentEstado, setCurrentEstado, getVzlaCities, getVzlaStates, apiLoading, apiError } = useApiCountries();
  const auth = getAuth();
  let navigate = useNavigate();
  const form = useRef(null);
  const [ formValues , setFormValues ] = useState({
    name: 'nombre'
  })
  const handleOnChange = (ev) => {
    setFormValues({name: ev.target.value})
    console.log(ev.target.value)
  }

  const handleSubmit =  (ev) => {
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
    //VALIDATIONS__
    if( regexs.email.test(data.username) && 
        regexs.password.test(data.password) &&
        regexs.phone.test(data.phone) &&
        data.password === data.c_password ){
          createUserWithEmailAndPassword(auth, data.username, data.password)
            .then( async (userCredential) => {
              // Signed in
              try {
              const dataToDb = {...data}
              dataToDb.c_password = false;
              const user = userCredential.user;
              const docRef = await setDoc(doc(db, "users", user.uid), dataToDb);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
            navigate("/", { replace: true });
            // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log({errorCode, errorMessage})
              // ..
            });
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
  return (
    <section className="login">
    <h2 className="login__title">Registrate</h2>
     <RegisterForm 
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