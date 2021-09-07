const { norm, log10, re } = require('mathjs')
const mathjs = require('mathjs')
const { isArray } = require('util')

async function weightedSort(products, sortingParameters){

  // if a single object passed, turn into an array
  if (!Array.isArray(sortingParameters)){
    sortingParameters = [sortingParameters]
  }

  sortingParameters.forEach(sortingParameter => {
    
    // if (!sortingParameter.fn && products[0][sortingParameter.key] === undefined){
    //   throw new Error(`Key '${sortingParameter.key}' not found`)
    // }

    products = ExecuteFunction(products, sortingParameter)
    products = Calculate(products, sortingParameter)
    products = Normalise(products, sortingParameter)

  })

  // Calculate sort key
  products = SortProducts(products, sortingParameters)

  return products

}

const ExecuteFunction = (products, sortingParameter) => {

  let fn = new Function(sortingParameter.fn.args, sortingParameter.fn.body )
  products = products.map(product => {
    try {
      product[`_${sortingParameter.key}`] = fn(product)
    } catch {
      product[`_${sortingParameter.key}`] = 0
    }
    if (isNaN(product[`_${sortingParameter.key}`]))
      product[`_${sortingParameter.key}`] = 0
    return product
  })

  return products
}

const SortProducts = (products, sortingParameters) => {

  products.forEach(product => {
    const sortkey = sortingParameters.reduce((accumulator, item) => {
      return accumulator + product[`___${item.key}`]
    }, 0)
    product._sortkey = sortkey
  })

  products.sort((a,b)=>{
    return b._sortkey - a._sortkey
  })

  return products
}

const Calculate = (products, sortingParameter) => {

  const { key, factor, model } = sortingParameter

  switch(model.type.toLowerCase()){
    case 'linear' :
      products = products.map(product => {
        return ({...product, [`__${key}`]: product[`_${key}`] })
      })        
      break
    case 'logarithmic' :
      products = products.map(product => {
        return ({...product, [`__${key}`]: product[`_${key}`] <= 0 ? 0 : log10(product[`_${key}`]) })
      })        
      break
    case 'standardscore' :
        const average = mathjs.mean(products.map(product=>product[`_${key}`]))
        const stdDev = mathjs.std(products.map(product=>product[`_${key}`]))
        products = products.map(product => {
          return ({...product, [`__${key}`]: stdDev == 0 ? 0 : (product[`_${key}`] - average)/stdDev })
        })        
      break
    default :
  }

  return products


}

const Normalise = (products, sortingParameter) => {

  const { key, factor } = sortingParameter

  const min = Math.min.apply(Math, products.map(product=>product[`__${key}`]))
  const max = Math.max.apply(Math, products.map(product=>product[`__${key}`]))

  products = products.map(product => {
    // if(product[sortingParameter.key]===0 || standard_deviation === 0){
    //   product['_'+sortingParameter.key] = 0
    //   return product
    // }
    switch(sortingParameter.model.normalisation.toLowerCase()){
      case 'none' :
        product[`___${key}`] = product[`__${key}`] * factor
        break
      case 'minimum' :
        product[`___${key}`] = max === 0 ? 0 : (product[`__${key}`] / max) * factor
        break
      case 'zero' :
        product[`___${key}`] = max === 0 ? 0 : ((product[`__${key}`] - min) / (max - min)) * factor
        break
      default:
        console.log('no model')
    }
    return product
  })

  return products

}

exports.weightedSort = weightedSort 