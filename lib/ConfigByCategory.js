export async function getConfigByCategory(id) {

  const STORE_ID = process.env.STORE_ID

  const headers = {
    "X-Auth-Token": process.env.AUTH_TOKEN,
    "Accept": "application/json",
    "Content-type": "application/json"
    }

  const url = `https://api.bigcommerce.com/stores/${STORE_ID}/v3/catalog/categories/${id}/metafields`

  const res = await fetch(url, {headers})
  const { data } = await res.json()

  return data
}

export async function putConfigByCategory(id, config, meta_id) {

  const STORE_ID = process.env.STORE_ID

  const meta_field = {
    "permission_set": "app_only",
    "namespace": "MFWS",
    "key": "config",
    "value": config
  }

  const options = {
    headers : {
      "X-Auth-Token": process.env.AUTH_TOKEN,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(meta_field)
  }

  if (meta_id){
    options.method="PUT"
    console.log('put')
    const url = `https://api.bigcommerce.com/stores/${STORE_ID}/v3/catalog/categories/${id}/metafields/${meta_id}`
    console.log(url)
    const res = await fetch(url, options)
    const data = await res.json()
    console.log(data)
    return data
  } else {
    console.log('post')
    options.method="POST"
    const url = `https://api.bigcommerce.com/stores/${STORE_ID}/v3/catalog/categories/${id}/metafields`
    console.log(url,options)
    const res = await fetch(url, options)
    const data = await res.json()
    console.log(data)
    return data.data

  }

}
