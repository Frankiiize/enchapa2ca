import React from "react";
import reactDom from "react-dom";
import { App } from "./components/App.jsx";
import "./styles/normalize.css"
import './styles/global.scss'

reactDom.render(
  <App />,
  document.getElementById('root')
)