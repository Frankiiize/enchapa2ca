import React, { useState } from "react";

const useBuy = () => {
  const [ buyComplete, SetBuyComplete ] = useState(null);

  return {
    buyComplete,
    SetBuyComplete
  }
}

export { useBuy }