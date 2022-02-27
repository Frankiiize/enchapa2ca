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
      <button className="segundaryButton" onClick={handleSubmit} type="submit">
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
  btnTitle = 'crear',
  formValues,
  handleOnChange,
  name,
  lastName,
  phone,
  address,
  email,
  password,
  submitBtn,
  cedula,
  animation,
  submitBtnClass,
  fileImput
}) => {
  return (
    <form  ref={form} className={animation ? `${animation} login__form` : 'login__form'}>
      {
        name && 
          <label htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="nombre"
              value={!!formValues ? formValues.name : 'nombre'}
              onChange={handleOnChange}
            />
          </label>
      }
      {
        lastName &&
          <label htmlFor="lastName">
            <input
              id="lastName"
              name="lasName"
              type="text"
              autoComplete="family-name"
              placeholder="apellido"
              value={!!formValues ? formValues.lasName : 'apellido'}
              onChange={handleOnChange}
            />
          </label>
      }
      {
        phone && 
          <label htmlFor="tlf">
            <input
              type="tel"
              name="tlf"
              id="tlf"
              placeholder="telefono"
              autoComplete="tel"
              value={!!formValues ? formValues.tlf : 'telefono'}
              onChange={handleOnChange}
            />
          </label>
      }
      {
        cedula && 
        <label htmlFor="cedula">
            <input
              type="tel"
              name="cedula"
              id="cedula"
              placeholder="cedula de identidad"
              autoComplete="off"
              value={!!formValues ? formValues.cedula : 'cedula'}
              onChange={handleOnChange}
            />
          </label>
      }
      {
        address &&
        <>
            <label htmlFor="address">
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                placeholder="direcction"
                value={!!formValues ? formValues.address : 'direccion'}
                onChange={handleOnChange}
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

           {/*  <label className="option" htmlFor="cities">
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
            </label> */}
          </>
        }

      {
        email && 
          <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="email"
            value={!!formValues ? formValues.email : 'email'}
            onChange={handleOnChange}
          />
        </label>
      }
      {
        password &&
        <>
          <label htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new_password"
              placeholder="contraseña"
              value={!!formValues ? formValues.password : 'password'}
              onChange={handleOnChange}
            />
          </label>
          <label htmlFor="c_Password">
            <input
              id="c_Password"
              name="c_password"
              type="password"
              autoComplete="new_password"
              placeholder="confirma contraseña"
              onChange={handleOnChange}
            />
          </label>
        </>
      }
     {/*  {
        fileImput &&

          <label htmlFor="paidPhoto">
            <input
              name="paidPhoto"
              type="file" 
              />
            <p>sube tu comprobate de pago</p>
          </label>
      } */}
      {
        submitBtn &&
        <button className={submitBtnClass} onClick={handleSubmit}  type="submit">
          {btnTitle}
        </button>
      }
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
      <button className="segundaryButton" type="submit">enviar</button>
    </form>
  );
};

export { LoginForm, RegisterForm, RecoveryPasswordForm };
