import React from "react";
import { Link } from "react-router-dom";
import '../styles/components/infocard.css'

const InfoCard = ({imagen, title, description}) => {
  
  const deleteSpecialCharacteres = (/([A-Za-z])\w+/g)
  const url = title.match(deleteSpecialCharacteres).join("-").toLowerCase();
  return(
    <div className="footerInfoContainer__card">
      <Link to={`/${url}`}>
          <picture>
            <img src={imagen} alt="imagen tarjeta de credito"/>
          </picture>
          <h3>{title}</h3>
          <span>{description}</span>
      </Link>
    </div>
  )
}

export { InfoCard };