import React from "react";
import '../styles/components/infocard.css'

const InfoCard = ({imagen, title, description}) => {
  return(
    <div className="footerInfoContainer__card">
      <picture>
        <img src={imagen} alt="imagen tarjeta de credito"/>
      </picture>
      <h3>{title}</h3>
      <span>{description}</span>
      <div className="footerInfoContainer__card-divisor"></div>
    </div>
  )
}

export { InfoCard };