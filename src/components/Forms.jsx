import React from "react";
import "../styles/components/loginForm.css";

const LoginForm = ({ handleSubmit, form }) => {
  return (
    <form className="login__form" ref={form}>
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
      <button onClick={handleSubmit} type="submit">
        entrar
      </button>
    </form>
  );
};

const RegisterForm = ({
  getVzlaStates,
  getVzlaCities,
  vzlaStates,
  vzlaCities,
  handleSubmit,
  form,
  handleOption,
  currentEstado,
  apiLoading,
}) => {
  return (
    <form  ref={form} className="login__form">
      <label htmlFor="name">
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="nombre"
          required
        />
      </label>
      <label htmlFor="lastName">
        <input
          id="lastName"
          name="lasName"
          type="text"
          autoComplete="family-name"
          placeholder="apellido"
          required
        />
      </label>
      <label htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="email"
          required
        />
      </label>
      <label htmlFor="password">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new_password"
          placeholder="contraseña"
          required
        />
      </label>
      <label htmlFor="c_Password">
        <input
          id="c_Password"
          name="c_password"
          type="password"
          autoComplete="new_password"
          placeholder="confirma contraseña"
          required
        />
      </label>
      <label htmlFor="tlf">
        <input
          type="tel"
          name="tlf"
          id="tlf"
          placeholder="telefono"
          autoComplete="tel"
          required
        />
      </label>

      <label value={currentEstado} className="option" htmlFor="estados">
        <span>estado</span>

        <select
          disabled={apiLoading ? true : false}
          onChange={handleOption}
          name="estados"
          id="estados"
          onClick={() => getVzlaStates("states/venezuela")}
        >
          {!!vzlaStates &&
            vzlaStates.map((e, i) => (
              <option
                
                name="estados"
                value={e.state_name}
                key={`state-${e.state_name}`}
              >
                {e.state_name}
              </option>
            ))}
        </select>
      </label>

      <label className="option" htmlFor="cities">
        <span>ciudad</span>

        <select
         
          onChange={handleOption}
          name="cities"
          id="cities"
          onClick={() => getVzlaCities(`cities/${currentEstado}`)}
        >
          {!!vzlaCities &&
            vzlaCities.map((e, i) => (
              <option
                disabled={apiLoading ? true : false}
                name="cities"
                value={e.city_name}
                key={`state-${e.city_name}`}
              >
                {e.city_name}
              </option>
            ))}
        </select>
      </label>

      <label htmlFor="address">
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          placeholder="direcction"
          required
        />
      </label>

      <button onClick={handleSubmit}  type="submit">
        Crear
      </button>
    </form>
  );
};

const RecoveryPasswordForm = () => {
  return (
    <form className="login__form">
      <label htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="email"
        />
      </label>
      <button type="submit">enviar</button>
    </form>
  );
};

export { LoginForm, RegisterForm, RecoveryPasswordForm };
