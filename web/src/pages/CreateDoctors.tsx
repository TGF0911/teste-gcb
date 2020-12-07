import React, { FormEvent, useState, useEffect } from 'react'
import Select from '../components/Select'
import api from '../services/api'
import { useForm } from 'react-hook-form'

import '../styles/create-doctor.css'

interface Specialty {
  id: number;
  name: string;
}

export default function CreateDoctors() {

  const { register, } = useForm()

  const [specialty, setSpecialty] = useState<Specialty[]>([])

  const [name, setName] = useState('')
  const [crm, setCrm] = useState('')
  const [cep, setCep] = useState('')
  const [landline, setLandline] = useState('')
  const [phone, setPhone] = useState('')
  const [specialties, setSpecialties] = useState<string[]>([])

  useEffect(() => {
    api.get('/specialties').then(({ data }) => setSpecialty(data))
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

    //return ul com dados do Médico cadastrado

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
              ref={register({
                required: true,
                maxLength: 120,
                pattern: /^[A-Za-z]+$/i
              })}
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="crm">CRM(00.000.00):</label>
            <input
              type="text"
              id="crm"
              ref={register({
                required: true,
                maxLength: 120,
                pattern: /[0-9]{2}.[\d]{3}.[/d]{2}/g
              })}
              value={crm}
              onChange={e => setCrm(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="cep">CEP (00000-000):</label>
            <input
              type="text"
              ref={register({
                required: true,
                pattern: /[0-9]{5}-[\d]{3}/g
              })}
              id="cep"
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
              onChange={e => setLandline(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="phone">Telefone(Celular):</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          
          {specialty.map((specialty) => {
            return (
              <div className="checkbox-block" key={specialty.id}>
                <label htmlFor={specialty.name}>specialty.name</label>
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