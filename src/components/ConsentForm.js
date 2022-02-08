import React from "react"
import { useAppContext } from "@/context/AppContext"
import { BiCookie } from "react-icons/bi"
import { Link } from "gatsby"
import { useForm } from "react-hook-form"
import { setCookie } from "@/utils/cookies"
import { useState } from "react"
import { Helmet } from "react-helmet"

const ConsentForm = () => {
  const [siteData, dispatch] = useAppContext()
  const cookiesConsentForm = siteData.consent_form
  const cookiesPerformance = siteData.consent_performance
  const { register, handleSubmit } = useForm()

  const [cookiesSettingsOpen, setCookiesSettingsOpen] = useState(false)

  const handleConsentAll = () => {
    // window[`ga-disable-${process.env.GOOGLE_ANALYTICS_ID}`] = false
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
      // window[`ga-disable-${process.env.GOOGLE_ANALYTICS_ID}`] = false
      dispatch({ type: "acceptConsentPerformance" })
    } else {
      setCookie("cookie-performance", false)
      // window[`ga-disable-${process.env.GOOGLE_ANALYTICS_ID}`] = true
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
        <div className="fixed bottom-0 z-50 flex w-full justify-center p-4">
          <div className="flex flex-col rounded-md bg-gray-800 p-4 text-white shadow-lg-flat dark:bg-gray-100 dark:text-black">
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 md:mb-0 md:pr-6">
                <div className="flex flex-row items-center gap-1 text-lg">
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
                className="rounded-md bg-white p-4 text-black hover:bg-site-primary hover:text-white dark:bg-black dark:text-white hover:dark:bg-site-primary hover:dark:text-white"
              >
                Allow <span className="whitespace-nowrap">all cookies</span>
              </button>
            </div>

            {cookiesSettingsOpen && (
              <div className="mt-4">
                <form
                  onSubmit={handleSubmit(handleSettingsSave)}
                  className="flex flex-col justify-between md:flex-row"
                >
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-1 text-lg">
                      <BiCookie />
                      Settings
                    </div>
                    <label>
                      <input
                        type="checkbox"
                        disabled={true}
                        checked={true}
                        className="mr-2 h-5 w-5 rounded-md border-transparent bg-gray-100 text-gray-400 focus:border-transparent focus:ring-4 focus:ring-site-primary focus:ring-offset-0"
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
                        className="mr-2 h-5 w-5 rounded-md border bg-white text-site-primary focus:border-transparent focus:ring-4 focus:ring-site-primary focus:ring-offset-0 dark:text-site-primary"
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
                    className="mt-4 rounded-md bg-white p-4 text-black hover:bg-site-primary hover:text-white dark:bg-black dark:text-white hover:dark:bg-site-primary hover:dark:text-white md:mt-0"
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
