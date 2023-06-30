import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>SACI</title>
        <meta name="description" content="Sistema Automatizado para Cultivos de Invernadero" />
        <link rel="icon" href="/saci.png" />
      </Head>
      <body >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
