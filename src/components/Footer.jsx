import React from "react";
import '../styles/components/footer.css'
import creditCard from '../assets/images/tarjeta.svg';
import deliveryBox from '../assets/images/caja.svg'
import ubiactionPin from '../assets/images/pin.svg'
import { InfoCard } from "./InfoCard.jsx";
const Footer = () => {
  return(
    <footer >

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