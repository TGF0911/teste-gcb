import React, {useState, useEffect} from 'react';
import api from '../services/api'

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

export default function Pagina() {
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    api.get('/doctors').then(({ data }) => setDoctors(data))   
  }, [])
  
  return(
    <div>
      {doctors.map((d) =>{
        {console.log(d)}
        <h1 key={d.id}> Meu nome é {d.name}</h1>

      })}
    </div>
  )
}