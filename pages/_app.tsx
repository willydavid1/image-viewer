import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import 'react-notifications-component/dist/theme.css'

import type { AppProps } from 'next/app'

import ReactNotification from 'react-notifications-component'
import Layout from 'components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ReactNotification />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
  
}
export default MyApp
