import React from "react"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import { useAppContext } from "@/context/AppContext"

export default function Home() {
  const [siteData, dispatch] = useAppContext()
  const theme = siteData.theme

  const toggleTheme = () => {
    if (theme === "light") {
      dispatch({ type: "themeDark" })
      localStorage.theme = "dark"
      document.documentElement.classList.add("dark")
    } else {
      dispatch({ type: "themeLight" })
      localStorage.theme = "light"
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <Layout>
      <Seo title="Homepage" />
      <div className="container m-auto text-center">
        <div className="text-2xl">👋 Hello world!</div>
        <div>
          <button
            className="mt-2 py-2 px-3 rounded-md bg-gray-100 dark:bg-gray-800"
            onClick={() => {
              toggleTheme()
            }}
          >
            Switch to {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </Layout>
  )
}
