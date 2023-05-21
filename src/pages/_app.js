import { Layout } from '@/components/Layout'
import { Context } from '@/context/context'
import 'semantic-ui-css/semantic.min.css'
import '@/styles/globals.css'
import "react-datepicker/dist/react-datepicker.css"

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Context>
        <Component {...pageProps} />
      </Context>
    </Layout>
  )
}
