import React, { useEffect, useCallback } from "react"
import { useAppContext } from "@/context/AppContext"
import ConsentForm from "@/components/ConsentForm"

const Layout = ({ children }) => {
  const [siteData, dispatch] = useAppContext()
  const mobileState = siteData.mobileState

  const onScreenWidthChange = useCallback(() => {
    if (window.innerWidth < 1024) {
      siteData.navState === true && dispatch({ type: "closeNavigation" })
      siteData.mobileState === false && dispatch({ type: "sizeMobile" })
      return
    } else {
      if (mobileState === true) {
        siteData.navState === false && dispatch({ type: "openNavigation" })
        siteData.mobileState === true && dispatch({ type: "sizeDesktop" })
        return
      }
    }
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileState, dispatch])

  useEffect(() => {
    // check width of browser and show/hide aside navigation
    onScreenWidthChange() // init
    window.addEventListener("resize", onScreenWidthChange) // add Event listener
  }, [onScreenWidthChange])

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      !("theme" in localStorage) /* &&
        window.matchMedia("(prefers-color-scheme: dark)").matches */
    ) {
      dispatch({ type: "themeDark" })
      document.documentElement.classList.add("dark")
    } else {
      dispatch({ type: "themeLight" })
      document.documentElement.classList.remove("dark")
    }
  }, [dispatch])

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-white text-black dark:bg-black dark:text-white">
      {children}
      <ConsentForm />
    </main>
  )
}
export default Layout
