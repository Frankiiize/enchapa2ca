import React, { useContext } from "react";
import '../styles/components/footer.css'
import creditCard from '../assets/images/tarjeta.svg';
import deliveryBox from '../assets/images/caja.svg'
import ubiactionPin from '../assets/images/pin.svg'
import { InfoCard } from "./InfoCard.jsx";
import { authContext } from "../context/AuthContext";
const Footer = () => {
  const { user } = useContext(authContext)
  return(
    <footer className={ user ? 'footer__user-on': undefined} >

        <InfoCard
          imagen={creditCard}
          title={'Elige como Pagar'}
          description={'eligue el metodo de pago que mas te convenga'}
        />
        <InfoCard
          imagen={deliveryBox}
          title={'¿Te lo enviamos?'}
          description={'Te enviamos tu compra ¡Donde te Encuentres!'}
        />
        <InfoCard
          imagen={ubiactionPin}
          title={'Ubicanos'}
          description={'Direccion: Valencia Norte - Av.Bolivar'}
        />

        <span className="frankiiize">Developed by Frankiize </span>

    
        

       
      </footer>
  )

}

export { Footer };