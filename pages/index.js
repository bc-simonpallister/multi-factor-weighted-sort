import Head from 'next/head'
import { H1, Tabs } from '@bigcommerce/big-design'
import ProductListing from '../components/ProductListing'
import { useState, useEffect } from 'react'
import { config } from'../config/default.js'

export default function Home({data, categories}) {

  return (
    <div className="p-2">
      <Head>
        <title>Multi-Factor Weighted Sort</title>
      </Head>

      <H1>Multi-Factor Weighted Sort</H1>

      <ProductListing data={data} defaultConfig={config} categories={categories} />

    </div>
  )
}

export async function getServerSideProps(context){

  const category = 25
  const STORE_ID = process.env.STORE_ID

  const headers = {
    "X-Auth-Token": process.env.AUTH_TOKEN,
    "Accept": "application/json",
    "Content-type": "application/json"
    }

  const url = `https://api.bigcommerce.com/stores/${STORE_ID}/v3/catalog/products?include=primary_image&limit=250`

  const res = await fetch(url, {headers})
  const { data } = await res.json()

  const catUrl = `https://api.bigcommerce.com/stores/${STORE_ID}/v3/catalog/categories?include_fields=name,parent_id,custom_url`

  const catRes = await fetch(catUrl, {headers})
  const response = await catRes.json()

  console.log(response.data)

  return {
    props : {
      data,
      config,
      categories : response.data
    }
  }
}