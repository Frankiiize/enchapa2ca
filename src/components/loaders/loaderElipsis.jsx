import React from "react";
import { Link } from "react-router-dom";
import '../../styles/components/loaders/loaderElipsis.css'
const LoaderElipsis = () => {

  return(
    <section className="LoaderContainer">
      <div className="loader">
       
        <div></div><div></div><div></div><div></div>
      
       {/*  {
          !!buyError.state &&
          <>
            <span>Ups! houston tenemos un problema</span>
            <Link to="/" >Ve al Inicio</Link>
          </>
        } */}
      </div>
    </section>
  );
}

export { LoaderElipsis };