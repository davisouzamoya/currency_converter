import React,{useEffect,useState} from 'react'
import api from '../../service/api'
import Select from '../../components/Select'
import Header from '../../components/header'
import { BiTransfer } from 'react-icons/bi';
import NumberFormat from 'react-currency-format';

import '../../assets/styles/global.css'
import './style.css'

function App(){
 const [firstValue,setFirstValue] = useState('')
 const [secondValue,setSecondValue] = useState('')
 const [selectfirst,setSelectfirst] = useState('')
 const [selectsecond,setselectsecond] = useState('')
 const [displayValue,setdisplayValue] = useState('')

 const [dispayto,setDispayto] = useState('')
 const [dispayfor,setDispayfor] = useState('')
 const [value,setValue] = useState('')
 const key = '32826f3a596ab82e3d51'

  useEffect(() =>{ 
    async function getCountries(){
      try{
        let response = await api.get(`/api/v7/countries?apiKey=${key}`)
        setValue(response.data)
      }catch(error){
        console.log('Ocorreu um erro')
      }
    }
      getCountries();
    },[])

  async function actionConvert(){ 
      if(selectfirst && firstValue && selectsecond){
        const response = await api.get(`/api/v7/convert?q=${selectfirst}_${selectsecond}&compact=ultra&apiKey=${key}`);
        var valorConversao = JSON.stringify(response.data)
        valorConversao = valorConversao.split(':')[1].replace('}','')
        let result = parseFloat(firstValue) * parseFloat(valorConversao)
        result = ((Math.round(result*100))/100);
        setSecondValue(result)
        setdisplayValue(firstValue)
        setDispayto(selectfirst)
        setDispayfor(selectsecond)

      }else{
        alert('Informar valores')
      } 
    }
  
  function changeCoin(){
    if(selectfirst && selectsecond){
      setselectsecond(selectfirst)
      setSelectfirst(selectsecond)

      if(selectfirst && firstValue && selectsecond)  actionConvert()
      
    }else{
      alert('Informar a moeda para conversao')
    }
  }

  return(
    <>
      <Header/>
        <fieldset>
          <div className='content'>
              <NumberFormat 
                thousandSeparator={true} 
                className="some" 
                inputmode="numeric" 
                thousandSpacing='2'
                id='valorDe'
                value={firstValue}
                onChange={(e) => {setFirstValue(e.target.value)}}
              />
              {value && <Select 
                  name="valueDe" 
                  id="valueDe" 
                  option={value}
                  value={selectfirst}
                  onChange={(e) => {setSelectfirst(e.target.value)}}
                />}
              
                <button onClick={() => changeCoin()}>
                  <BiTransfer size={30} />
                </button>     
              
              {value && <Select 
                  name="valuePara" 
                  id="valuePara"
                  option={value}
                  value={selectsecond}
                  onChange={(e) => {setselectsecond(e.target.value)}}
                />}
              <button 
                onClick={() =>actionConvert()}
              >
                CONVERTER
              </button>
            </div>
            <div className="footer">  
                {secondValue &&
                  <h2>{displayValue} {dispayto} = {secondValue} {dispayfor}</h2>
                }
              </div>
          </fieldset>
    </>
  )
}

export default App


