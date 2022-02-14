import React from "react";
import '../styles/pages/loginPage.css'
import { Link } from "react-router-dom";
import { RegisterForm } from "../components/Forms.jsx";


const CreateAccount = () => {
  
  return (
    <section className="login">
    <h2 className="login__title">Registrate</h2>
     <RegisterForm />
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