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
  fileImput,
  error,
  setFormValues,
}) => {
  return (
    <form  ref={form} className={animation ? `${animation} login__form` : 'login__form'}>
      {
        name && 
        <>
          <label htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="nombre"
              value={!!formValues ? formValues.name : 'nombre'}
              onChange={handleOnChange}
              onClick={() => setFormValues({...formValues, name:''})}
            />
          </label>
          {
              !!error.name && 
              <span>{error.message}</span>
          }
        </>
          
      }
      {
        lastName &&
        <>
          <label htmlFor="lastName">
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="apellido"
              value={!!formValues ? formValues.lasName : 'apellido'}
              onChange={handleOnChange}
              onClick={() => setFormValues({...formValues, lastName:''})}
            />
          </label>
          {
              !!error.lastName && 
              <span>{error.message}</span>
          }
        </>
      }
      {
        phone && 
        <>
          <div className="phoneContiner">
            <label htmlFor="phoneCode">
              <select 
                id="phoneCode" 
                name="phoneCode"
                onChange={handleOnChange}
                value={!!formValues ? formValues.tlfCode : undefined}
                >
                  <option value={"0414"}>0414</option>
                  <option value={"0412"}>0412</option>
                  <option value={"0424"}>0424</option>
                  <option value={"0416"}>0416</option>
                  <option value={"0426"}>0426</option>
              </select>
            </label>
            <label htmlFor="tlf">
              <input
                type="tel"
                name="tlf"
                id="tlf"
                placeholder="telefono"
                autoComplete="tel"
                value={!!formValues ? formValues.tlf : 'telefono'}
                onChange={handleOnChange}
                onClick={() => setFormValues({...formValues, tlf:''})}
              />
            </label>

          </div>
          {
              !!error.phone && 
              <span>{error.message}</span>
          }
        </>
      }
      {
        cedula && 
        <>
          <label htmlFor="cedula">
              <input
                type="tel"
                name="cedula"
                id="cedula"
                placeholder="cedula de identidad"
                autoComplete="off"
                value={!!formValues ? formValues.cedula : 'cedula'}
                onChange={handleOnChange}
                onClick={() => setFormValues({...formValues, cedula:''})}
              />
          </label>
          {
              !!error.cedula && 
              <span>{error.message}</span>
          }
        </>
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
                onClick={() => setFormValues({...formValues, address:''})}
              />
                
            </label>
            {
                !!error.address && 
                <span>{error.message}</span>
            }
            <label value={currentEstado} className="option" htmlFor="estados">
              <span>estado</span>

              <select
                disabled={apiLoading ? true : false}
                onChange={handleOnChange}
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
            {
              !!error.countryState && 
              <span>{error.message}</span>
            }

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
        <>
          <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="email"
            value={!!formValues ? formValues.email : 'email'}
            onChange={handleOnChange}
            onClick={() => setFormValues({...formValues, email:''})}
          />
        </label>
        {
            !!error.email && 
            <span>{error.message}</span>
        }

        </>
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
              value={ formValues.password }
              onChange={handleOnChange}
            />
          </label>
          {
              !!error.password && 
              <span>{error.message}</span>
          }
          <label htmlFor="c_Password">
            <input
              id="c_Password"
              name="c_password"
              type="password"
              autoComplete="new_password"
              placeholder="confirma contraseña"
              value={ formValues.password }
              onChange={handleOnChange}
            />
          </label>
          {
              !!error.address && 
              <span>{error.message}</span>
          }
        </>
      }
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
