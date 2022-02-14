import React from "react";
import '../styles/components/footer.css'
import creditCard from '../assets/images/tarjeta.png';
import deliveryBox from '../assets/images/caja.png'
import ubiactionPin from '../assets/images/ubication.png'
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

        {/* <div className="footerInfoContainer__delivery">
          <h3>¿Te lo enviamos?</h3>
          <img src={deliveryBox} alt="imagen caja de envio" />
        </div>

        <div className="footerInfoContainer__ubication">
          <h3>Ubicanos</h3>
          <img src={ubiactionPin} alt="imagen caja de envio" />
        </div> */}
        

       
      </footer>
  )

}

export { Footer };