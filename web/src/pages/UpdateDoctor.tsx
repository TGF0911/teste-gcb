import React, { useState, useEffect } from 'react'
import { FormEvent } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Select from '../components/Select'
import api from '../services/api'

interface Doctor{
  id: number;
  name : string
  crm: string
  cep: string
  landline: string
  specialties: [
    {
      id: number;
      name: string;
    }
  ];
}

interface Specialty {
  id: number;
  name: string;
}

interface RouteParams {
  id: string;
}

export default function UpdateDoctor() {
  const history = useHistory()
  const params = useParams<RouteParams>();
 
  const [doctor, setDoctor] = useState<Doctor>()
  const [specialty, setSpecialty] = useState<Specialty[]>([])


  const [name, setName] = useState('')
  const [crm, setCrm] = useState('')
  const [cep, setCep] = useState('')
  const [landline, setLandline] = useState('')
  const [phone, setPhone] = useState('')
  const [specialties, setSpecialties] = useState<string[]>([])

  useEffect(() => {
    api.get(`doctors/${params.id}`).then((response) => {
      setDoctor(response.data);
    });
    api.get('/specialty').then(({ data }) => setSpecialty(data))
  }, [params.id]);

  async function UpdateDoctor(e : FormEvent){
    e.preventDefault()
    await api.put(`/doctor/${params.id}`, {
      ...doctor,
      name,
      crm,
      cep,
      landline,
      specialties
    });
    history.push('/doctors')
  }

  return (
    <div id="update-container">
      <form onSubmit={UpdateDoctor} >
        <fieldset>
          <legend>Dados do Médico</legend>

          <div className="input-block">
            <label htmlFor="name">Nome Completo:</label>
            <input type="text" maxLength={120} id="name" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="crm">CRM:</label>
            <input type="text" id="crm" value={crm} onChange={e => setCrm(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="cep">CEP:</label>
            <input type="text" maxLength={9} id="cep" value={cep} onChange={e => setCep(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="landline">Telefone(Fixo):</label>
            <input type="text" id="landline" value={landline} onChange={e => setLandline(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="phone">phone:</label>
            <input type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

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
      </form>
    </div>
  )
}
