import { Layout } from '@/components/Layout'
import 'semantic-ui-css/semantic.min.css'
import '@/styles/globals.css'
import "react-datepicker/dist/react-datepicker.css";
import Context from '@/context/context';
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Context>
        <Component {...pageProps} />
      </Context>
    </Layout>
  )
}
