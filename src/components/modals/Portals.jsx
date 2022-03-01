import React from "react";
import ReactDom from "react-dom";

const Portals = ({children}) => {
  return ReactDom.createPortal(
    <div className="portalContainer">
      {children}
    </div>,
    document.getElementById('portals')
  );
}

export { Portals }; 

