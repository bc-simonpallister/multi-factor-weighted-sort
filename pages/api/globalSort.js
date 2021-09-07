import getAllProducts from "../../lib/getAllProducts"
import updateProduct from "../../lib/updateProduct"
import sort from "../../lib/weightedSort"
export default async function ApplyGlobalSort(req, res) {

  const { method } = req

  if(method!='PUT'){
    res.status(405).json({"status":"Method not allowed"})
    return
  }

  const config = req.body

  const products = await getAllProducts()

  const sortedProducts = await sort.weightedSort(products, config).then(products=>{

    products.forEach( async (product,index)=>{
     const updated = await updateProduct(product.id, {sort_order: index})
    })

    async () => {
      const products = await getAllProducts()
    }
    
  })

  res.status(200).json({"status":"ok"})

}
