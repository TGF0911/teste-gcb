import React, {FormEvent, useState} from 'react'

export default function CreateDoctors(){

  const [name, setName] = useState('')
  const [crm, setCrm] = useState('')
  const [cep, setCep] = useState('')
  const [landline, setLandline] = useState('')
  const [phone, setPhone] = useState('')
  const [specialties, setSpecialties] = useState([])

  async function handleSubmit(e : FormEvent){
    
  }

  return(
    <div id="create-doctor-container">
      <form onSubmit={handleSubmit} >
        <fieldset>
          <legend>Dados do Médico</legend>
          <div className="input-block">
            <label htmlFor="name">Nome Completo:</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="crm">CRM:</label>
            <input type="text" id="crm" value={crm} onChange={e => setCrm(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="cep">CEP:</label>
            <input type="text" id="cep" value={cep} onChange={e => setCep(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="landline">Telefone(Fixo):</label>
            <input type="text" id="landline" value={landline} onChange={e => setLandline(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="phone">phone:</label>
            <input type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
          </div>
          
        </fieldset>

        <button>Cadastrar</button>
      </form>
    </div>
  )
}