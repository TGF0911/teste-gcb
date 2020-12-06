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

interface RouteParams {
  id: string;
}

export default function UpdateDoctor() {
  const history = useHistory()
  const params = useParams<RouteParams>();
 
  const [doctor, setDoctor] = useState<Doctor>()

  const [name, setName] = useState('')
  const [crm, setCrm] = useState('')
  const [cep, setCep] = useState('')
  const [landline, setLandline] = useState('')
  const [phone, setPhone] = useState('')
  const [specialties, setSpecialties] = useState<string[]>([])

  useEffect(() => {
    api.get(`doctor/${params.id}`).then((response) => {
      setDoctor(response.data);
    });
    console.log(params.id)
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

          {specialties.map((specialty) => {

            <Select
              name="subject"
              label="Matéria"
              value={specialty}
              onChange={(e) => {
                setSpecialties([...specialties, e.target.value]);
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
          })}
        </fieldset>
      </form>
    </div>
  )
}
