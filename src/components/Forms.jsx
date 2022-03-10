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
  dispatchError,
  setFormValues,
}) => {
  return (
    <form  ref={form} className={animation ? `${animation} login__form` : 'login__form'}>
      {
        name && 
        <>
          <label 
            htmlFor="name"
            className={!!error.name ? 'error-color' : '' }
            >
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={!!error.name ? '' : 'name' }
              value={!!formValues ? formValues.name : 'nombre'}
              onChange={handleOnChange}
            />
             {
              !!error.name && 
                <div className="errorContainer"> 
                  <span>{error.message}</span>
                </div>
              }
          </label>
        </>
          
      }
      {
        lastName &&
        <>
          <label 
          htmlFor="lastName"
          className={!!error.lastName ? 'error-color' : '' }
          >
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder={!!error.lastName ? '' : 'apellido' }
              value={!!formValues ? formValues.lasName : 'apellido'}
              onChange={handleOnChange}
            />
            {
              !!error.lastName && 
              <div className="errorContainer"> 
                <span>{error.message}</span>
              </div>
            }
          </label>
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
            <label 
            htmlFor="phone"
            className={!!error.phone ? 'error-color' : '' }
            >
              <input
                type="phone"
                name="phone"
                id="phone"
                placeholder={!!error.phone ? '' : 'telefono' }
                autoComplete="tel"
                onChange={handleOnChange}
              />
              {
                !!error.phone && 
                <div className="errorContainer"> 
                  <span>{error.message}</span>
                </div>
              }
            </label>
          </div>
        </>
      }
      {
        cedula && 
        <>
          <label 
            htmlFor="cedula"
            className={!!error.cedula ? 'error-color' : '' }
            >
              <input
                type="tel"
                name="cedula"
                id="cedula"
                placeholder={!!error.cedula ? '' : 'cedula' }
                autoComplete="off"
                value={!!formValues ? formValues.cedula : 'cedula'}
                onChange={handleOnChange}
              />
              {
                  !!error.cedula && 
                  <div className="errorContainer"> 
                    <span>{error.message}</span>
                  </div>
              }
          </label>
        </>
      }
      {
        address &&
        <>
            <label 
              htmlFor="address"
              className={!!error.address ? 'error-color' : '' }
              >
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                placeholder={!!error.address ? '' : 'dirección' }
                value={!!formValues ? formValues.address : 'direccion'}
                onChange={handleOnChange}
              />
                {
                  !!error.address && 
                  <div className="errorContainer"> 
                    <span>{error.message}</span>
                  </div>
                }
                
            </label>
            <label 
            value={currentEstado} 
            htmlFor="estados"
            className={!!error.countryState ? 'error-color login__form-country' : 'login__form-country' }
            >
              <span>estado</span>

              <select
                onChange={handleOnChange}
                name="estados"
                id="estados"
                onClick={() => getVzlaStates("states/venezuela")}
              >
              {
                apiLoading && 
                <option
                  value="loading..."
                >
                  loading...
                </option>
              }
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
        <>
          <label 
          htmlFor="email"
          className={!!error.email ? 'error-color' : '' }
          >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={!!error.email ? '' : '@email' }
            value={!!formValues ? formValues.email : 'email'}
            onChange={handleOnChange}
          />
           {
              !!error.email && 
              <div className="errorContainer"> 
                <span>{error.message}</span>
              </div>
            }
        </label>

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
              placeholder="confirma contraseña"
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

const ProductsForm = ({children, submitNewProducts, form, animation, formValues, setFormValues, onChangeProductsForm}) => {
  return( 
    <div className='products__form'>
      <form  ref={form} className={animation ? `${animation} products__form` : 'products__form'}>
        <label htmlFor="producName">
          <span>titulo del producto</span>
          <input
            id="producName"
            name="producName"
            type="text"
            autoComplete="off"
            value={formValues.producName}
            onChange={onChangeProductsForm}
          />
        </label>
        <label htmlFor="producPrice">
        <span>precio</span>
          <input
            id="producPrice"
            name="producPrice"
            type="number"
            autoComplete="off"
            value={formValues.producPrice}
            onChange={onChangeProductsForm}
          />
        </label>
        <label htmlFor="stockAvalible">
        <span>stock</span>
          <input
            id="stockAvalible"
            name="stockAvalible"
            type="number"
            autoComplete="off"
            value={formValues.stockAvalible}
            onChange={onChangeProductsForm}
          />
        </label>
        <label htmlFor="customProduct">
          <span>Personalizable</span>
          <input 
            id="customProduct"
            name="customProduct"
            type="checkbox" 
            checked={formValues.custom}
            onChange={() => setFormValues({... formValues, custom: true})}
          />
        </label>
      
        <label htmlFor="description">
          <span>descripcion</span>
          <textarea 
            name="description" 
            rows="10" 
            cols="50"
            value={formValues.description}
            onChange={onChangeProductsForm}
            >
          </textarea>
        </label>
        {children}
        <button onClick={submitNewProducts}  type="submit">
          enviar
        </button>
      
       
      </form>
    </div>
  )
}

export { LoginForm, RegisterForm, RecoveryPasswordForm, ProductsForm };
