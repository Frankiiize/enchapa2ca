import React from "react";
import { ProductsList } from "../components/ProductsList.jsx";
import '../styles/components/ProductList.css'

const SectionProducts = ({ title, children, sectionClass, button}) => {
  return(
    <section className={sectionClass}>
      <div className="Products__title">
        <h2>{title}</h2>
        {!!button && <button>ver todos</button> }
      </div>
      {children}
  </section>
  )
}

export { SectionProducts };