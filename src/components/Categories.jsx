import React from "react";
import '../styles/components/categories.css'
const Categories = ({categories}) => {
  return(
    <ul className="categoriesContainer">
        {categories.map((item) => (
            <li className="categoriesContainer__item" key={item.id}>
              <img className="categoriesContainer__item-img" src={item.img} />
              <h3 className="categoriesContainer__item-name">{item.name}</h3>
            </li>
        ))}
    </ul>
  )
}

export { Categories };