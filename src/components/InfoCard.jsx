import React from "react";
import { Link } from "react-router-dom";
import '../styles/components/infocard.css'

const InfoCard = ({imagen, title, description}) => {
  
  const deleteSpecialCharacteres = (/([A-Za-z])\w+/g)
  const url = title.match(deleteSpecialCharacteres).join("-").toLowerCase();
  return(
    <div className="footerInfoContainer__card">
      <picture>
      <Link to={`/${url}`}>
        <img src={imagen} alt="imagen tarjeta de credito"/>
      </Link>
      </picture>
      <h3>{title}</h3>
      <span>{description}</span>
    </div>
  )
}

export { InfoCard };