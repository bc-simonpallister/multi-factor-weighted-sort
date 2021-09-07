import { Select, Panel } from '@bigcommerce/big-design'
import { useState, useEffect } from 'react'

function Categories({categories, selected}) {


  const [categoryData, setCategoryData] = useState(categories)
  const [selectedCategory, setSelectedCategory] = useState(0)

  useEffect(() => {
    selected(selectedCategory)
  }, [selectedCategory])

  const cats = categoryData.map(cat=>{
    return { value: cat.id, content:cat.name, description:cat.custom_url.url}
  })

  cats.unshift({ value: 0, content:'All Categories'})
 
  return (
    <div className="my-3">
    <Panel>
      <div className="w-40">
        <Select label="Category" options={cats} required value={selectedCategory} onOptionChange={(val) => setSelectedCategory(val)} />
      </div>
    </Panel>
  </div>
  );
}

export default Categories;