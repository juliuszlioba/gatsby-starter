import React from "react"
import { Helmet } from "react-helmet"

const Seo = ({
  title = false,
  description = "Website description.",
  noIndex = false,
}) => {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Website` : `Website`}</title>
        <meta name="description" content={description} />
        <meta
          name="robots"
          content={noIndex ? "noindex, nofollow" : "index, follow"}
        />
      </Helmet>
    </>
  )
}

export default Seo
