export const config = {
  category: 25,
  params: [
    {
      key: 'Views',
      factor: 1, 
      model: {
        type: 'Logarithmic',
        normalisation: 'Minimum'
      },
      fn: {
        args:['product'],
        body:"return product.view_count"
      },
    },
    {
      key: 'Margin',
      fn: {
        args:['product'],
        body:"return product.cost_price === 0 ? 0 : (product.calculated_price - product.cost_price)/product.cost_price"
      },
      model: {
        type: 'Logarithmic',
        normalisation: 'Zero'
      },
      factor: 1
    },
    {
      key: 'Age',
      fn: {
        args:['product'],
        body:"return (Date.now() - new Date(product.date_created).getTime()) / (3600 * 24 * 1000)"
      },
      model: {
        type: 'Logarithmic',
        normalisation: 'Zero'
      },
      factor: -1
    },
    {
      key: 'Conversion',
      fn: {
        args:['product'],
        body:"return product.view_count == 0 ? 0 : product.total_sold / product.view_count"
      },
      model: {
        type: 'Logarithmic',
        normalisation: 'Zero'
      },
      factor: 1
    },
    {
      key: 'Featured',
      fn: {
        args:['product'],
        body:"return product.is_featured ? 1 : 0"
      },
      model: {
        type: 'Linear',
        normalisation: 'Zero'
      },
      factor: 0.75
    },
    {
      key: 'Sales Discount',
      fn: {
        args:['product'],
        body:"return product.sale_price / (product.price - product.sale_price)"
      },
      model: {
        type: 'Logarithmic',
        normalisation: 'Zero'
      },
      factor: 1.4
    },
  ]
}