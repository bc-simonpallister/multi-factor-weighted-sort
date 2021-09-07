import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { GlobalStyles } from '@bigcommerce/big-design'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet" />
      </Head>
      <div className="m-5">
        <GlobalStyles />
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
