import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

export default function Error404() {
  return (
    <Layout>
      <Seo title="404" noIndex={true} />
      <div className="container m-auto text-center">
        <div>404</div>
      </div>
    </Layout>
  )
}
