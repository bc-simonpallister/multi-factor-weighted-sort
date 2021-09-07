import { stringify } from 'postcss'
import { getConfigByCategory, putConfigByCategory } from '../../../lib/ConfigByCategory'
export default async function getConfig(req, res) {

  const {method, body, query: {id, meta_id} } = req

  console.log(id, meta_id)

  switch (method){
    case "GET" :
      const getData = await getConfigByCategory(id)
      res.status(200).json(getData)
      break
    case "PUT" :
      const putData = await putConfigByCategory(id, JSON.stringify(body), meta_id)
      res.status(200).json(putData)
      break
    default:
      res.status(405).json({"status":"Method not allowed"})
  }

}
