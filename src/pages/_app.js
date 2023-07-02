import { Layout } from '@/components/Layout'
import { Context } from '@/context/context'
import { SessionProvider } from 'next-auth/react'
import 'semantic-ui-css/semantic.min.css'
import '@/styles/globals.css'
import "react-datepicker/dist/react-datepicker.css"

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Context>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Context>
    </SessionProvider>
  )
}
