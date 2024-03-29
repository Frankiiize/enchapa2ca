import React from "react";
import reactDom from "react-dom";
import { App } from "./routes/App.jsx";
import "./styles/normalize.css"
import './styles/global.css'
import './styles/animations/globalAnimations.css'
reactDom.render(
  <App />,
  document.getElementById('root')
)