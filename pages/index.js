import Head from 'next/head'
import { H0 } from '@bigcommerce/big-design'


export default function Home() {
  return (
    <div className="p-2">
      <Head>
        <title>Multi-Factor Weighted Sort</title>
      </Head>

      <H0>Multi-Factor Weighted Sort</H0>

    </div>
  )
}

export async function getServerSideProps(context){
  return {
    props : {
      
    }
  }
}