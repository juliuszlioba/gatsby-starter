import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Seo title="Privacy Policy" noIndex={true} />
      <div className="container m-auto text-center">
        <div>Privacy Policy</div>
      </div>
    </Layout>
  )
}
