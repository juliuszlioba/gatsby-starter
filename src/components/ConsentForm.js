import React from "react"
import { useAppContext } from "../context/AppContext"
import { BiCookie } from "react-icons/bi"
import { Link } from "gatsby"
import { useForm } from "react-hook-form"
import { setCookie } from "../utils/cookies"
import { useState } from "react"
import { Helmet } from "react-helmet"

const ConsentForm = () => {
  const [siteData, dispatch] = useAppContext()
  const cookiesConsentForm = siteData.consent_form
  const cookiesPerformance = siteData.consent_performance
  const { register, handleSubmit } = useForm()

  const [cookiesSettingsOpen, setCookiesSettingsOpen] = useState(false)

  const handleConsentAll = () => {
    setCookie("cookies", true)
    setCookie("cookie-nessesary", true)
    setCookie("cookie-performance", true)
    dispatch({ type: "acceptConsentAll" })
  }

  const handleSettingsSave = data => {
    setCookie("cookies", true)
    setCookie("cookie-nessesary", true)
    dispatch({ type: "acceptConsentNecessary" })

    if (data.cookiePerformance) {
      setCookie("cookie-performance", true)
      dispatch({ type: "acceptConsentPerformance" })
    } else {
      setCookie("cookie-performance", false)
      dispatch({ type: "revokeConsentPerformance" })
    }

    return dispatch({ type: "closeConsentForm" })
  }

  return (
    <>
      {cookiesPerformance && (
        <Helmet>
          <script
            async
            src={
              cookiesPerformance
                ? `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`
                : ""
            }
          ></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');`}
          </script>
        </Helmet>
      )}
      {cookiesConsentForm && (
        <div className="fixed flex justify-center w-full bottom-0 p-4 z-50">
          <div className="flex flex-col rounded-md dark:bg-gray-100 bg-gray-800 dark:text-black text-white shadow-lg-flat p-4">
            <div className="flex flex-col md:flex-row">
              <div className="md:pr-6 mb-4 md:mb-0">
                <div className="flex flex-row gap-1 items-center text-lg">
                  <BiCookie />I use Cookies
                </div>
                <div>
                  <p>
                    I use cookies to collect and access personal data (such as
                    browsing information) in order to personalize content{" "}
                    {/* and ads */}
                    and to analyze website traffic. You can learn abaut what it
                    is tracked and why in
                    <Link to="/privacy-policy">
                      <span className="pl-1 underline hover:text-site-primary dark:hover:text-site-primary">
                        Privacy Policy
                      </span>
                    </Link>
                    . You also can individually allow cookies for different
                    purposes in
                    <button
                      onClick={() => {
                        setCookiesSettingsOpen(!cookiesSettingsOpen)
                      }}
                      className="pl-1 underline hover:text-site-primary dark:hover:text-site-primary"
                    >
                      cookies settings
                    </button>
                    .
                  </p>
                </div>
              </div>
              <button
                onClick={handleConsentAll}
                className="p-4 rounded-md dark:bg-black hover:dark:bg-site-primary dark:text-white hover:dark:text-white bg-white hover:bg-site-primary text-black hover:text-white"
              >
                Allow <span className="whitespace-nowrap">all cookies</span>
              </button>
            </div>

            {cookiesSettingsOpen && (
              <div className="mt-4">
                <form
                  onSubmit={handleSubmit(handleSettingsSave)}
                  className="flex flex-col md:flex-row justify-between"
                >
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-1 items-center text-lg">
                      <BiCookie />
                      Settings
                    </div>
                    <label>
                      <input
                        type="checkbox"
                        disabled={true}
                        checked={true}
                        className="rounded-md focus:ring-4 focus:ring-site-primary bg-gray-100 focus:ring-offset-0 border-transparent focus:border-transparent text-gray-400 mr-2 w-5 h-5"
                      />
                      <span>
                        Nessesary cookies{" "}
                        <i>(to remember what cookies you allowed to collect)</i>
                      </span>
                    </label>
                    <label className="mt-1">
                      <input
                        {...register("cookiePerformance")}
                        type="checkbox"
                        className="rounded-md focus:ring-4 focus:ring-site-primary bg-white focus:ring-offset-0 border focus:border-transparent text-site-primary dark:text-site-primary mr-2 w-5 h-5"
                      />
                      <span>
                        Performance cookies{" "}
                        <i>
                          (to allow gather Analytics data abaut website
                          performance)
                        </i>
                      </span>
                    </label>
                  </div>
                  <input
                    type="submit"
                    value="Save settings"
                    className="p-4 rounded-md dark:bg-black hover:dark:bg-site-primary dark:text-white hover:dark:text-white bg-white hover:bg-site-primary text-black hover:text-white mt-4 md:mt-0"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ConsentForm
