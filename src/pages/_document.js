import { Html, Head, Main, NextScript } from 'next/document'

export const background = {
  backgroundImage: 'url(/body.jpg)',
  backgroundRepeat: 'repeat',
  backgroundSize: 'cover',
  backdropFilter: 'blur(15px) saturate(20%)'
}

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>SACI</title>
        <meta name="description" content="Sistema Automatizado para Cultivos de Invernadero" />
        <link rel="icon" href="/saci.png" />
      </Head>
      <body style={background}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
