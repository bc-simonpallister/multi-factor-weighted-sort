import { Input, Select, Button, Textarea } from '@bigcommerce/big-design'
import { useState} from 'react'

function ConfigItem({index, param, returnConfig}) {

  const [parameter, setParameter] = useState(param)


  function handleChange(event){
    const { field } = event.target.dataset
    console.log(parameter)
    parameter[field] = event.target.value
    console.log(field, event.target.value)
    console.log(parameter)
    setParameter({...parameter})
    returnConfig(index, parameter)
  }

  function handleFunctionChange(event){
    if (!parameter.fn){
      parameter.fn = {
        args:['product'],
        body:""
      }
    }
    parameter.fn.body = event.target.value
    setParameter({...parameter})
    returnConfig(index, parameter)
  }

  function handleModelChange(val){
    parameter.model.type = val
    setParameter({...parameter})
    returnConfig(index, parameter)
  }

  function handleNormalisationChange(val){
    parameter.model.normalisation = val
    setParameter({...parameter})
    returnConfig(index, parameter)
  }

  return (
    <div>
      <div className="flex p-3 my-2 border-0 rounded-md items-center border-gray-100 align-top">
        <div className="flex-none w-28 mr-2 align-top">
          <Input label="Name" Type="Input" required value={parameter.key} onChange={handleChange} data-field="key"/>
        </div>
        <div className="flex-none w-16 mr-2">
          <Input label="Weight" Type="Input" onChange={handleChange} required value={parameter.factor} data-field="factor"/>
        </div>
        <div className="flex-none w-40 mr-2">
          <Select 
            label="Model  "
            options={[
              { value:"Linear", content:"Linear", description:"Use for finite range"},
              { value:"Logarithmic", content:"Logarithmic", description:"Use for large ranges with unlimited values"},
              { value:"StandardScore", content:"StandardScore", description:"Use for ranges with semi-finite ranges. Use with Zero normalisation"},
            ]}
            required
            value={parameter.model.type}
            onOptionChange={handleModelChange}
          />
        </div>
        <div className="flex-none w-28 mr-2 ">
          <Select 
              label="Normalisation"
              options={[
                { value:"Zero", content:"Zero", description:"Normalise to zero, regardless of smallest number"},
                { value:"Minimum", content:"Minimum", description:"Normalise to the smallest number"},
                { value:"None", content:"None", description:"No normalisation (not recommended)"},
              ]}
              required
              value={parameter.model.normalisation}
              onOptionChange={handleNormalisationChange}
              />
        </div>
        <div className="flex-none w-96 mr-2">
          <Textarea label="Function" cols="20" placeholder="Javascript function representing a calculation. Not required for top level fields" required defaultValue={parameter?.fn?.body} onChange={handleFunctionChange} ></Textarea>
        </div>
        <div className="flex-none w-96 mr-2">
        <Button variant="subtle" onClick={()=>returnConfig(index, null)}>Delete</Button>
        </div>
      </div>
      <hr/>
    </div>
  );
}


export default ConfigItem;