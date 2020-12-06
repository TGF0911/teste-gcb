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
  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')

  useEffect(() => {
    api.get('/doctors').then(({ data }) => setDoctors(data))
  })

  async function findDoctor() {
    if (selected === 'crm') {
      await api.get(`/doctors/${selected}`, {
        params: {
         uf,
         cidade: city,
         logradouro: street
        }
      })
    }else {
      await api.get(`/doctors/${selected}`, {
        params: {
          selected: text
        }
      })
    }

    

  }

  async function handleDeleteDoctor(id: number) {
    try {
      await api.delete(`doctor/${id}`);
      setDoctors(doctors.filter(doctor => doctor.id !== id))

    } catch (error) {
      alert('Erro ao deletar caso, tente novamente!')
    }
  }

  return (
    <div id="find-container">
      <form onSubmit={findDoctor} >
        <fieldset>

          <legend>Encontre um médico</legend>

          <Select
            name="speciality"
            label="Especialidade"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
            
            options={[
              { value: 1, label: 'ALERGOLOGIA' },
              { value: 2, label: 'ANGIOLOGIA' },
              { value: 3, label: 'BUCO MAXILO' },
              { value: 4, label: 'CARDIOLOGIA CLÍNICA' },
              { value: 5, label: 'CARDIOLOGIA INFANTIL' },
              { value: 6, label: 'CIRURGIA CABEÇA E PESCOÇO' },
              { value: 7, label: 'CIRURGIA CARDÍACA' },
              { value: 8, label: 'CIRURGIA DE TÓRAX' },
            ]}
          />

          {selected === 'endereco' ? (
            <><div className="input-block">
              <label htmlFor="uf">UF:</label>
              <input type="text" id="uf" value={uf} onChange={e => setUf(e.target.value)} />
            </div>
              <div className="input-block">
                <label htmlFor="city">city:</label>
                <input type="text" id="city" value={city} onChange={e => setCity(e.target.value)} />
              </div>
              <div className="input-block">
                <label htmlFor="street">street:</label>
                <input type="text" id="street" value={street} onChange={e => setStreet(e.target.value)} />
              </div></>

          ) : (
              <div className="input-block">
                <label htmlFor="text">Pesquisa:</label>
                <input type="text" id="text" value={text} onChange={e => setText(e.target.value)} />
              </div>

            )

          }
        </fieldset>
        <button type="submit">Buscar</button>
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