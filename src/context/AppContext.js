import React, { useEffect, useContext, useReducer, useMemo } from "react"
import { AppReducer, initialState } from "./AppReducer"
import { checkCookie } from "../utils/cookies"

//Create Context
export const AppContext = React.createContext()

export const ContextDataLayer = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const contextValue = useMemo(() => {
    return [state, dispatch]
  }, [state, dispatch])

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("state"))) {
      //checking if there already is a state in localstorage
      //if yes, update the current state with the stored one
      dispatch({
        type: "init_stored",
        value: JSON.parse(localStorage.getItem("state")),
      })
    }
  }, [])
  useEffect(() => {
    if (state !== initialState) {
      //create and/or set a new localstorage variable called "state"
      localStorage.setItem("state", JSON.stringify(state))
    }
  }, [state])

  // Check if to show consent form
  useEffect(() => {
    const cookiesConsentFormDismiss = checkCookie("cookies")
    if (!cookiesConsentFormDismiss) dispatch({ type: "openConsentForm" })
  }, [])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

//Export Context to be used by other components
export const useAppContext = () => useContext(AppContext)
