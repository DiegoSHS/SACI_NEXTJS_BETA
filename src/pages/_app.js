import { Layout } from '@/components/Layout'
import 'semantic-ui-css/semantic.min.css'
import '@/styles/globals.css'
import "react-datepicker/dist/react-datepicker.css";
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
