import React from "react";
import { ProductsList } from "../components/ProductsList.jsx";
import '../styles/components/ProductList.css'
import { Main } from "./Main.jsx";

const SectionProducts = ({ title, children, sectionClass, button}) => {
  return(
    <Main className={sectionClass}>
      <div className="Products__title">
        <h2>{title}</h2>
        {!!button && <button>ver todos</button> }
      </div>
      {children}
  </Main>
  )
}

export { SectionProducts };