import '../styles/globals.css'
import React from 'react'
import Layout from '../layout/layout'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} data-theme="mytheme" />
    </Layout>
  )
}
