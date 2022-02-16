import React, { useState } from "react";
import '../styles/components/categories.css'
const Categories = ({categories}) => {
  
  const [ showCategories, setShowCategories ] = useState(false);

  const handleCategoieSelected = (id) => {
    //console.log(id)
  }

  return(
    <div className="filters">
      <button onClick={() => setShowCategories(!showCategories)} className="categorieContainer">
        <span>Categorias</span>
          {!!showCategories &&
            <ul className="categorieContainer__list">
            <div className="categorieContainer__list-triangle"></div>
              {categories.map((categorie) => (
                  <li 
                    className="categorieContainer__list-item"
                    onClick={() => handleCategoieSelected(categorie.id)}
                    key={categorie.id}
                    >
                    <span>{categorie.name}</span>
                  </li>
                ))}
            </ul>
          }
      </button>
    </div>
  )
}

export { Categories };