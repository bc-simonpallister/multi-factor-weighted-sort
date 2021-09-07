import getProductsByCategory from '../../../lib/getProductsByCategory'
export default async function getProducts(req, res) {

  const {method, query: {id}} = req

  if(method!='GET'){
    res.status(405).json({"status":"Method not allowed"})
    return
  }

  const products = await getProductsByCategory(id)

  res.status(200).json(products)

}
