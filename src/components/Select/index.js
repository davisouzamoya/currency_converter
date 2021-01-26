import React from 'react'
import './style.css'

function Select(props){
   
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

      var sorted = City.sort(function(a, b){
      var aa = a.currencyName.toLowerCase();
      var bb = b.currencyName.toLowerCase(); 
        if(aa < bb) return -1;
        if(aa > bb) return 1;
        return 0;
      });

      sorted = sorted.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.currencyName === thing.currencyName
      ))
    )

  return(
    <select 
      name={props.name} 
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      >
      <option value="" disabled  hidden>Selecione uma opção</option>
      {sorted.map((data,index) =>(
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