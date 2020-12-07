import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { useHistory } from 'react-router-dom'
import { HiPencilAlt } from 'react-icons/hi'
import { FiTrash } from 'react-icons/fi'

import '../styles/find-doctors.css'

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

  if (!doctors) return <p>Loading</p>;


  async function handleDeleteDoctor(id: number) {
    try {
      await api.delete(`doctor/${id}`);
      setDoctors(doctors.filter(doctor => doctor.id !== id))

    } catch (error) {
      alert('Erro ao deletar, tente novamente!')
    }
  }

  return (
    <div id="find-container">
  
      <div className="container">

        <ul>
          {doctors.map((doctor) => {
            <li key={doctor.id} >
              <strong>Nome:</strong>
              <p>{doctor.name}</p>

              <strong>CRM:</strong>
              <p>{doctor.crm}</p>

              <strong>Telefone(Fixo):</strong>
              <p>{doctor.landline}</p>

              <strong>Telefone(Celular):</strong>
              <p>{doctor.phone}</p>

              <strong>CEP:</strong>
              <p>{doctor.cep}</p>

              
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

    </div>
  )
}