import React from "react";
import '../../styles/components/loaders/loaderElipsis.css'
const LoaderElipsis = () => {
  return(
    <section className="LoaderContainer">
      <div className="loader"><div></div><div></div><div></div><div></div></div>
    </section>
  );
}

export { LoaderElipsis };