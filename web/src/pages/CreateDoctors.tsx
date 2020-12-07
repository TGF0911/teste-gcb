import React, { FormEvent, useState, useEffect } from 'react'
import api from '../services/api'

import '../styles/create-doctor.css'
import { HiPencilAlt } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'

interface Specialty {
  id: number;
  name: string;
}

export default function CreateDoctors() {

  const history  = useHistory()
  
  const [specialty, setSpecialty] = useState<Specialty[]>([])

  const [name, setName] = useState('')
  const [crm, setCrm] = useState('')
  const [cep, setCep] = useState('')
  const [landline, setLandline] = useState('')
  const [phone, setPhone] = useState('')
  const [specialties, setSpecialties] = useState<string[]>([])


  useEffect(() => {
    api.get('/specialty').then(({ data }) => setSpecialty(data))
  })


  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const data = new FormData()

    data.append('name', name)
    data.append('crm', crm)
    data.append('cep', cep)
    data.append('landline', landline)
    data.append('phone', phone)

    await api.post('/doctors', data)

    return (
      <ul>
      
        <li >
          <strong>Nome:</strong>
          <p>{name}</p>

          <strong>CRM:</strong>
          <p>{crm}</p>

          <strong>CEP:</strong>
          <p>{cep}</p>

          <strong>Telefone(Fixo):</strong>
          <p>{landline}</p>

          <strong>Telefone(Celular):</strong>
          <p>{phone}</p>

          {specialties.map((specialty) => {
            return (
              <div>
                <strong>Especialidade:</strong>
                <p>{specialty}</p>
              </div>
            )
          })}

          <button type="button" className="update"
            onClick={() => {
              history.push(`/update-doctor/${crm}`)
            }}
          >
            <HiPencilAlt size={24} color="#4C9C17" />
          </button>
          </li >
    </ul>
      )
    
  }

  return (
    <div id="create-doctor-container">
      <form onSubmit={handleSubmit} >
        <fieldset>
          <legend>Dados do Médico</legend>
          <div className="input-block">
            <label htmlFor="name">Nome Completo:</label>
            <input
              type="text"
              maxLength={120}
              id="name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="crm">CRM(00.000.00):</label>
            <input
              type="text"
              id="crm"
              required
              value={crm}
              onChange={e => setCrm(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="cep">CEP (00000-000):</label>
            <input
              type="text"
              maxLength={9}
              minLength={9}
              id="cep"
              required
              value={cep}
              onChange={e => setCep(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="landline">Telefone(Fixo):</label>
            <input
              type="text"
              id="landline"
              value={landline}
              required
              onChange={e => setLandline(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="phone">Telefone(Celular):</label>
            <input
              type="text"
              id="phone"
              value={phone}
              required
              onChange={e => setPhone(e.target.value)}
            />
          </div>

              <label>Especialidades (Selecina no minimo 2)</label>
          {specialty.map((specialty) => {
            return (
              <div className="checkbox-block" key={specialty.id}>
                <label htmlFor={specialty.name}>{specialty.name}</label>
                <input
                  type='checkbox'
                  id={specialty.name}
                  value={specialty.id}
                  onChange={e => setSpecialties([...specialties, e.target.value])}
                />
              </div>

            )
          })}

        </fieldset>

        <button>Cadastrar</button>
      </form>
    </div>
  )
}