import React, { useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from "react-router-dom";

const Login = () => {
  const [ user, setUser ] = useState(null);
  const auth = getAuth();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user 
        ? (setUser(user.auth.currentUser)) 
        : (setUser(null), console.log('userlogOut'))
    })
    console.log(user)
  },[user])


  const singIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        setUser(user.auth.currentUser );

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({errorCode, errorMessage})
      })


  }

  const form = useRef(null)
  const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      username: formData.get('email'),
      password: formData.get('password')
    }
    if(regex.test(data.username) && data.password.length >1){
      console.log(data);
      singIn(data.username, data.password);
    }
    else{
      console.log('error invalid user or password')
    }

  }

  
  return(
    <>
      <h2>Bienvenido a <span>enchapados</span></h2>
      <p>ingresa a tu cuenta</p>
      <form ref={form}>
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
        <button onClick={handleSubmit} type="submit">entrar</button>
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