async function updateProduct(id, body) {


  const STORE_ID = process.env.STORE_ID

  const options = {
    method: "PUT",
    headers : {
      "X-Auth-Token": process.env.AUTH_TOKEN,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }

  console.log(id, JSON.stringify(body))

  const url = `https://api.bigcommerce.com/stores/${STORE_ID}/v3/catalog/products/${id}`

  const res = await fetch(url, options)
  const { data } = await res.json()


  return data
}

export default updateProduct