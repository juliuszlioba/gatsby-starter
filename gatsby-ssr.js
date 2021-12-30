import "./src/styles/global.css"

import React from "react"
import { ContextDataLayer } from "./src/context/AppContext"

export const wrapRootElement = ({ element }) => (
  <ContextDataLayer>{element}</ContextDataLayer>
)
