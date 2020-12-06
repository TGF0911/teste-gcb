import React, {useState, useEffect} from 'react'
import api from '../services/api'

export default function UpdateDoctor() {

  const [name, setName] = useState('')
  const [crm, setCrm] = useState('')
  const [cep, setCep] = useState('')
  const [landline, setLandline] = useState('')
  const [phone, setPhone] = useState('')
  const [specialties, setSpecialties] = useState([])

  return(
    <div id="update-container">
      <form>
        <fieldset>
          <legend>Dados do Médico</legend>

          <div className="input-block">
            <label htmlFor="name">Nome Completo:</label>
            <input type="text" maxLength={120} id="name" value={name} onChange={e => setName(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="crm">CRM:</label>
            <input type="text"   id="crm" value={crm} onChange={e => setCrm(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="cep">CEP:</label>
            <input type="text" maxLength={9} id="cep" value={cep} onChange={e => setCep(e.target.value)}/>
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
      </form>
    </div>
  )
}
