import { useRef, useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import "./styles.css"

import api from "./services/api"


function App() {
    const [input, setInput] = useState([])
    const [cep, setCep] = useState({})
    
  async function AddCep(){
    if(input === ''){
      alert("Preencha algum CEP!")
      return
    }
    try{
       const response = await api.get(`${input}/json`)  
       setCep(response.data)     
       setInput("")                                                                 
    }catch{
      alert("Ops erro ao buscar!")
      setInput("")
    }
  }
    

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="container-input"> 
        <input value={input} onChange={(event)=> setInput(event.target.value) } type="text" placeholder="Digite seu CEP..."/>
        <button onClick={AddCep} type="search"><AiOutlineFileSearch size={25} color="#fff" /></button>
      </div>
        {Object.keys(cep).length > 0 && (
         <main className="main">
         <h2>{cep.cep}</h2>
         <span>{cep.logradouro}</span>
         <span>Complemento: {cep.complemento}</span>
         <span>{cep.bairro}</span>
         <span>{cep.localidade} - {cep.uf}</span>
       </main>
       )
        }
       
    </div>
  )
}

export default App
