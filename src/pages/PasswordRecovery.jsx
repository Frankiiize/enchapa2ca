import React from "react";
import { RecoveryPasswordForm } from "../components/Forms.jsx";

const PasswordRecovery = () => {
  return(
    <section className="login ">
      <h2 className="login__title">Ingresa tu email</h2>
      <p>te enviaremos un link de recuperación</p>
      <RecoveryPasswordForm />

    </section>
  )
}

export { PasswordRecovery };