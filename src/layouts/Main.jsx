import React from "react";

const Main = ({ children, sectionClass }) => {
  return(
    <main className={sectionClass}>
      {children}
  </main>
  )
}

export { Main };