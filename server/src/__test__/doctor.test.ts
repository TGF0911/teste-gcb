/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import 'mocha'
import { expect } from 'chai'
import api from './services/api'

interface Doctor {
  name: string;
  crm: string;
  cep: string;
  phone: string;
  landline: string;
}

describe('Doctors Routes', async () => {
  it('should create a doctor', async () => {
    const doctor: Doctor = {
      name: 'Drauzio Varella',
      crm: '23.498.09',
      cep: '03474-050',
      phone: '119920706161',
      landline: '29654460'
    }
    const { data } = await api.post('/doctors', doctor)

    expect(data).to.be.an('object').to.have.property('crm').to.equal('23.498.09')
  }),

  it('should list all doctors', async () => {
    const { data } = await api.get('/doctors')
    const doctors: Doctor[] = data
    expect(doctors).to.be.an('array')
  }),
  it('should list a single doctor', async () => {
    const { data } = await api.get('/doctors/1')
    const doctor : Doctor = data
    expect(doctor).to.be.an('object').to.have.property('id').to.equal(1)
  })

  it('should return a error message', async () => {
    const doctor: Doctor = {
      name: 'Drauzio Varella',
      crm: '23.498.09',
      cep: '03474-050',
      phone: '119920706161',
      landline: '29654460'
    }
    const { data } = await api.post('/doctors', doctor)

    expect(data).to.have.property(status).to.equal(401)
  })
})
