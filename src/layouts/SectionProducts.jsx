import React,{ useEffect, useState }  from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ProductsList } from "../components/ProductsList.jsx";
import '../styles/components/ProductList.css'

const SectionProducts = ({ title, children, sectionClass, button, arrowControls = false}) => {
  
  useEffect(() => {
    const ulElement = document.querySelector('.Products__list');
    const rigth = document.querySelector('.Products__controls-rigth');
    const left = document.querySelector('.Products__controls-left');
  
    const handleScrollRigth = () =>{
      ulElement.scrollLeft += 250;
    }
    const handleScrollLeft = () => {
      ulElement.scrollLeft -= 250;
    }
    rigth.addEventListener('click', handleScrollRigth)
    left.addEventListener('click', handleScrollLeft)
  },[])

  return(
    <section className={sectionClass}>
      <div className="Products__title">
        <h2>{title}</h2>
        {!!button && <button>ver todos</button> }
      </div>
      {children}
      {
       arrowControls  && 
        <div className="Products__controls">
          <button className="Products__controls-left">
            <MdKeyboardArrowLeft  
              size={40} 
              color={"#4F4F4F"}
              />
          </button>
          <button  className="Products__controls-rigth">
            <MdKeyboardArrowRight  
              size={40} 
              color={"#4F4F4F"}
              />
          </button>
        </div>
      }
  </section>
  )
}

export { SectionProducts };