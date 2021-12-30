import React from "react"
import { useAppContext } from "../context/AppContext"
import { BiCookie } from "react-icons/bi"
import { Link } from "gatsby"
import { setCookie } from "../utils/cookies"

const ConsentForm = () => {
  const [siteData, dispatch] = useAppContext()
  const cookiesConsentForm = siteData.consent_form
  const handleConsent = () => {
    setCookie("cookies")
    dispatch({ type: "acceptConsentAll" })
  }

  return (
    <>
      {cookiesConsentForm && (
        <div className="fixed flex justify-center w-full bottom-0 p-4 z-50">
          <div className="flex flex-col md:flex-row rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white shadow-lg-flat p-4">
            <div className="md:pr-6 mb-4 md:mb-0">
              <div className="flex flex-row gap-1 items-center text-lg">
                <BiCookie />
                Cookies
              </div>
              <div>
                <p>
                  We use cookies to collect and access personal data (such as
                  browsing information) in order to personalize content and ads
                  and to analyze website traffic.
                  <Link to="/privacy-policy">
                    <span className="pl-1 underline hover:text-yellow-400 dark:hover:text-yellow-400">
                      Privacy Policy.
                    </span>
                  </Link>
                </p>
              </div>
            </div>
            <button
              className="rounded-md bg-black dark:bg-white text-white dark:text-black hover:text-black p-4 hover:bg-yellow-400 dark:hover:bg-yellow-400"
              onClick={() => handleConsent()}
            >
              Allow all cookies
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ConsentForm
