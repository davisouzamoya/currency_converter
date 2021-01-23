import React, { useState } from 'react'
import './style.css'

function Select(props){
  const [optionvalues,setOtionvalues] = useState('')
  
   
      var aVal = JSON.stringify(props.option.results)
      aVal = aVal.split('},"')
      var auxilixar
      var City = []
      for(var i = 0; i < aVal.length;i++){
        auxilixar = aVal[i].split('":{')[1].replace('""','"')
        
        if(auxilixar.indexOf("}}") > -1){
          auxilixar = auxilixar.split("}}")[0]
          auxilixar = '{'+auxilixar+'}'
        }else{
          auxilixar = '{'+auxilixar+'}'
        }
          City.push(JSON.parse(auxilixar))
      }
   
  return(
    <select 
      name={props.name} 
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      >
      <option value="" disabled  hidden>Selecione uma opção</option>
      {City.map((data,index) =>(
        <option 
          key={data.id} 
          value={data.currencyId}
        >
          {data.currencyName} ({data.currencyId})
        </option>
      ))}
    </select>
  )
}

export default Select