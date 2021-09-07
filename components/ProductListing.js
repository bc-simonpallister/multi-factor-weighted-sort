import { Button, Panel, Collapse, Tooltip, Text, Message } from '@bigcommerce/big-design'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import ConfigItem from './ConfigItem'
import sort from '../lib/weightedSort'
import Categories from './Categories'

function ProductListing({data, defaultConfig, categories}) {
  
  const titles = ['Show Configuration', 'Hide Configuration']
  const blankMessage = { title: "", messages : [{ text: ""  }]}

  const [productData, setProductData] = useState(data)
  const [config, setConfig] = useState(defaultConfig)
  const [initialData, setInitialData] = useState(JSON.parse(JSON.stringify(data)))
  const [showConfig, setShowConfig] = useState(0)
  const [message, setMessage] = useState(blankMessage)
  const [productTitle, setProductTitle] = useState("All Categories")
  const [productURL, setProductURL] = useState("")
  const [categoryId, setCategoryId] = useState(0)

  const emptyConfig = {
    key: "",
    fn: {
      args:['product'],
      body:""
    },
    model: {
      type: 'Linear',
      normalisation: 'Zero'
    },
    factor: 1
  }


  async function applyGlobalSort(){
    const options = {
      method:"PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(config.params)
    }
    const res = await fetch('/api/globalSort', options)
    const resp = await res.json()

    setMessage(
      {title:"Success",
      messages:[
        {text:"Successfully updates sort orders"}
      ]})
  }


  async function handleReturnConfig(index, param){
    if (param === null){
      config.params.splice(index, 1)
    } else {
      config.params[index] = param
    }
    setConfig({...config})

    // const { meta_id } = config

    // const options = {
    //   method:"PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(config.params)
    // }
    // const res = await fetch(`/api/config/${categoryId}?meta_id=${meta_id}`, options)
    // const data = await res.json()

    // config.meta_id = data.id
    // setConfig({...config})

  }

  function renderScores(product){
    let scores = []
    scores.push(<div key="0">Sort Order: {product.sort_order}</div>)
    for (const key in product){
      if(key.startsWith('_')){
        scores.push(
          <div key={key}>
            {key}: {product[key].toFixed(4)}
          </div>
        )
      }
    }
    return <div>{scores}</div>
  }

  async function categorySelected(id) {
    const cat = categories.find(c=>c.id==id)
    setProductTitle(cat?.name)
    setProductURL(cat?.custom_url.url)

    if (id > 0) {
      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
      console.log(id)
      const res = await fetch(`/api/products/${id}`, options)
      const data = await res.json()

      setCategoryId(id)
      setProductData(data)
      setInitialData(JSON.parse(JSON.stringify(data)))
    }

  }

  return (
    <div>
      
      <Categories categories={categories} selected={categorySelected}/>

      <div className="my-3">
        <Panel header="Configuration" action={{variant:"secondary", text:"Test", onClick:async ()=>{
          const productCopy = JSON.parse(JSON.stringify(initialData))
          await sort.weightedSort(productCopy, config.params).then(sortedProducts=>{
            setProductData([])
            setProductData(sortedProducts)
          })
        }}}>
          {message.title!=="" && 
          <Message
            header={message?.title}
            messages={message.messages}
            onClose={() => setMessage(blankMessage)}
          />}
          <div>
          <Collapse initiallyOpen={false} title={titles[showConfig]} onCollapseChange={()=>setShowConfig(showConfig === 1 ? 0 : 1)} >
            <div className="border-2 rounded-md p-3">
              {config?.params?.map((item,index)=>(
                <ConfigItem key={index} index={index} param={item} returnConfig={handleReturnConfig} />
              ))}
              <div className="my-3">
                <Button variant="secondary" onClick={()=>{
                  config.params.push(emptyConfig)
                  setConfig({...config})
                }}>Add</Button>
              </div>
            </div>
          </Collapse>
          </div>
          <div className="mt-3">
            <Button onClick={applyGlobalSort}>Apply</Button>
          </div>
        </Panel>
      </div>

      <Panel header={productTitle} action={{variant:"secondary", text:"Reset", onClick:()=>setProductData([...initialData])}}>
        <Text>{productURL}</Text>
        <div className="flex flex-row flex-wrap w-full items-center">
          {productData.map(product=>{
            return (
            <div className="flex-none p-5 m-3 w-40 h-60 border-2 rounded-md content-center text-center" key={product.id}>
              <Image src={product.primary_image.url_thumbnail} width="100" height="100" />
              <div className="text-sm">
                {product.name}
              </div>
              <div className="text-sm">
                ${product.calculated_price.toFixed(2)}
              </div>
              <Tooltip trigger={
                <div className="text-s p-1 my-2 w-28 bg-indigo-100 text-gray-600">
                <div>
                  Score: {product?._sortkey?.toFixed(2)}
                </div>
                </div>
              }>
                <div className="text-white">
                  {renderScores(product)}
                </div>
              </Tooltip>
            </div>
            )
          })}
        </div>
      </Panel>

    </div>
  );
}

export default ProductListing;