import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import DoneCheck from "../assets/Icomponent/DoneCheck.jsx";
import "../styles/pages/paySucess.css";
import { MdContactPhone } from 'react-icons/md'
import { buyContext } from "../context/buyContext.js";
import { useNavigate } from "react-router-dom";
const PaySucess = () => {
  const { buyComplete } = useContext(buyContext); 
  console.log(buyComplete);

  
  
  if(buyComplete === null ){
    return(
      <Navigate to="/" replace={true} />
    )
  }
  return (
    <main className="paySucessMain footer__user-on">
      <div className="paySucessMain__titleWrapper">
        <DoneCheck width="80px" />
        <h3> tu compra se realizo con exito </h3>
      </div>
      <section className="invoiceContainer">
        <div>
          <p>tipo de pago</p>
          <span>{buyComplete.paidMethod}</span>
        </div>
        <div>
          <p>entrega</p>
          <span>{buyComplete.shipping ? `${buyComplete.shipping}` : `${buyComplete.envio} `}</span>
        </div>
        <div>
          <p>email</p>
          <span>{buyComplete.email}</span>
        </div>
        <div>
          <p>telefono</p>
          <span>{buyComplete.phone}</span>
        </div>
        <div>
          <p>codigo de transaccion</p>
          <span>{buyComplete.docRefId}</span>
        </div>
        <div>
          <p>fecha</p>
          <span>{Date.now()}</span>
        </div>
        <div className="invoiceContainer__shop">
          <p>articulos</p>
          <ul>
            {
              buyComplete.shop.map((e) => (
                <li key={`SuccesBuyItems-${e.id}`}>
                  <p>{e.name}</p>
                  <span>${e.price}</span>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="invoiceContainer__total">
          <p>monto total</p>
          <span>${buyComplete.totalPrice}</span>
        </div>
      </section>
      <section className="contactContainer">
        <div className="contactContainer__title"> 
          <MdContactPhone 
            size={32}
            color={"gray"}
          />
          <h4>contactanos</h4>
        </div>
        <span>
          cualquier duda o consulta puedes escribirnos al siguiente numero
          <strong>964409213</strong>
          nos pondremos en contacto contigo para coordinar la entrega en un plazo
          maximo de 24 horas
        </span>
      </section>
    </main>
  );
};

export { PaySucess };
