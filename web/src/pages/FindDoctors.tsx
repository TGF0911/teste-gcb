import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { useHistory } from 'react-router-dom'
import { HiPencilAlt } from 'react-icons/hi'
import { FiTrash } from 'react-icons/fi'
import Select from '../components/Select'

interface Doctor {
  id: number;
  name: string;
  crm: string;
  cep: string;
  landline: string;
  phone: string;
  specialties: [
    {
      id: number;
      name: string;
    }
  ];
}

export default function FindDoctors() {

  const history = useHistory()

  const [text, setText] = useState('')
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selected, setSelected] = useState('')

  useEffect(() => {
    api.get('/doctors').then(({ data }) => setDoctors(data))
  })

  async function findDoctor() {
    

  }

  async function handleDeleteDoctor(id: number) {

  }

  return (
    <div id="find-container">
      <form>
        <fieldset>
          <legend>Encontre um médico</legend>

          <div className="input-block">
            <label htmlFor="text">Pesquisa:</label>
            <input type="text" id="text" value={text} onChange={e => setText(e.target.value)} />
          </div>

          <Select
              name="speciality"
              label="Especialidade"
              value={selected}
              onChange={(e) => {
                setSelected( e.target.value);
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
        </fieldset>
      </form>

      <ul>
        {doctors.map(doctor => {
          <li key={doctor.id}>
            <strong>Nome:</strong>
            <p>{doctor.name}</p>

            <strong>CRM:</strong>
            <p>{doctor.crm}</p>

            <strong>CEP:</strong>
            <p>{doctor.cep}</p>

            <strong>Telefone(Fixo):</strong>
            <p>{doctor.landline}</p>

            <strong>Telefone(Celular):</strong>
            <p>{doctor.phone}</p>

            {doctor.specialties.map((specialty) => {
              return (
                <div key={specialty.id}>
                  <strong>Especialidade:</strong>
                  <p>{specialty.name}</p>
                </div>
              )
            })}

            <button type="button" className="update"
              onClick={() => {
                history.push(`/update-doctor/${doctor.crm}`)
              }}
            >
              <HiPencilAlt size={24} color="#4C9C17" />
            </button>

            <button type="button" className="delete"
              onClick={() => handleDeleteDoctor(doctor.id)}
            >
              <FiTrash size={24} color="#E43335" />
            </button>

          </li>
        })}
      </ul>

    </div>
  )
}