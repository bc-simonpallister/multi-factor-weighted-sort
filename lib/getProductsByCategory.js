async function getProductsByCategory(id) {

  const STORE_ID = process.env.STORE_ID

  const headers = {
    "X-Auth-Token": process.env.AUTH_TOKEN,
    "Accept": "application/json",
    "Content-type": "application/json"
    }

  const url = `https://api.bigcommerce.com/stores/${STORE_ID}/v3/catalog/products?categories:in=${id}&include=primary_image&limit=250`

  const res = await fetch(url, {headers})
  const { data } = await res.json()

  return data
}

export default getProductsByCategory