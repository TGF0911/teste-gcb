import React, { FormEvent, useState } from 'react'
import Select from '../components/Select'
import api from '../services/api'

import '../styles/create-doctor.css'

export default function CreateDoctors() {

  const [name, setName] = useState('')
  const [crm, setCrm] = useState('')
  const [cep, setCep] = useState('')
  const [landline, setLandline] = useState('')
  const [phone, setPhone] = useState('')
  const [specialties, setSpecialties] = useState<string[]>([])


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
              maxLength={120}
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="crm">CRM:</label>
            <input
              type="text"
              id="crm"
              value={crm}
              onChange={e => setCrm(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              maxLength={9}
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
            <label htmlFor="phone">phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          {specialties.map((specialty) => {

            <Select
              name="subject"
              label="Matéria"
              value={specialty}
              onChange={(e) => {
                setSpecialties([...specialties, e.target.value]);
              }}
              options={[
                { value: 1, label: 'Artes' },
                { value: 2, label: 'Biologia' },
                { value: 3, label: 'Ciências' },
                { value: 4, label: 'Física' },
                { value: 5, label: 'História' },
                { value: 6, label: 'Matemática' },
                { value: 7, label: 'Português' },
                { value: 8, label: 'Química' },
              ]}
            />
          })}

        </fieldset>

        <button>Cadastrar</button>
      </form>
    </div>
  )
}